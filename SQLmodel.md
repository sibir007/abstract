Установка и настройка
Базовая установка

pip install sqlmodel

Установка с дополнительными зависимостями

Для работы с PostgreSQL:

pip install sqlmodel[postgresql]

Для асинхронной работы:

pip install sqlmodel[async]

Полная установка со всеми зависимостями:

pip install "sqlmodel[postgresql,async]"

Подключение к базе данных

from sqlmodel import SQLModel, create_engine

# SQLite (для разработки)
engine = create_engine("sqlite:///database.db")

# PostgreSQL
engine = create_engine("postgresql://user:password@localhost/dbname")

# MySQL
engine = create_engine("mysql+pymysql://user:password@localhost/dbname")

Основы работы с SQLModel
Создание базовой модели

from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str = Field(unique=True)
    age: int = Field(ge=0, le=150)
    is_active: bool = Field(default=True)

Параметры Field

SQLModel использует расширенный Field от Pydantic с дополнительными возможностями:

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, index=True)
    price: float = Field(gt=0, description="Цена товара")
    category_id: int = Field(foreign_key="category.id")
    created_at: datetime = Field(default_factory=datetime.now)

Создание таблиц в базе данных

from sqlmodel import SQLModel, create_engine

engine = create_engine("sqlite:///database.db")

# Создание всех таблиц
SQLModel.metadata.create_all(engine)

# Создание конкретной таблицы
User.metadata.create_all(engine)

CRUD-операции с SQLModel
Создание записей

from sqlmodel import Session

# Создание одной записи
user = User(name="Иван", email="ivan@example.com", age=25)

with Session(engine) as session:
    session.add(user)
    session.commit()
    session.refresh(user)  # Получить ID из базы
    print(f"Создан пользователь с ID: {user.id}")

# Создание нескольких записей
users = [
    User(name="Алексей", email="alex@example.com", age=30),
    User(name="Мария", email="maria@example.com", age=28)
]

with Session(engine) as session:
    session.add_all(users)
    session.commit()

Чтение данных

from sqlmodel import select

with Session(engine) as session:
    # Получение всех пользователей
    statement = select(User)
    users = session.exec(statement).all()
    
    # Получение пользователя по ID
    user = session.get(User, 1)
    
    # Получение первого пользователя
    statement = select(User).where(User.age > 25)
    user = session.exec(statement).first()
    
    # Получение с фильтрацией
    statement = select(User).where(User.name.contains("Иван"))
    users = session.exec(statement).all()

Обновление данных

with Session(engine) as session:
    # Получение и обновление
    user = session.get(User, 1)
    if user:
        user.age = 26
        user.email = "new_email@example.com"
        session.add(user)
        session.commit()
    
    # Массовое обновление
    statement = select(User).where(User.age < 18)
    users = session.exec(statement).all()
    for user in users:
        user.is_active = False
        session.add(user)
    session.commit()

Удаление данных

with Session(engine) as session:
    # Удаление конкретной записи
    user = session.get(User, 1)
    if user:
        session.delete(user)
        session.commit()
    
    # Массовое удаление
    statement = select(User).where(User.is_active == False)
    users = session.exec(statement).all()
    for user in users:
        session.delete(user)
    session.commit()

Продвинутые запросы и фильтрация
Операторы фильтрации

from sqlmodel import select, and_, or_

with Session(engine) as session:
    # Точное совпадение
    statement = select(User).where(User.name == "Иван")
    
    # Сравнение
    statement = select(User).where(User.age >= 18)
    
    # Поиск по подстроке
    statement = select(User).where(User.email.contains("@gmail.com"))
    
    # Поиск в списке
    statement = select(User).where(User.name.in_(["Иван", "Мария"]))
    
    # Комбинированные условия
    statement = select(User).where(
        and_(User.age >= 18, User.is_active == True)
    )
    
    # Условие ИЛИ
    statement = select(User).where(
        or_(User.age < 18, User.age > 65)
    )

Сортировка и лимиты

# Сортировка
statement = select(User).order_by(User.name)
statement = select(User).order_by(User.age.desc())

# Лимит и смещение
statement = select(User).limit(10).offset(20)

# Комбинирование
statement = select(User).where(User.is_active == True).order_by(User.name).limit(5)

Агрегация данных

from sqlmodel import func

with Session(engine) as session:
    # Подсчет записей
    statement = select(func.count(User.id))
    count = session.exec(statement).one()
    
    # Средний возраст
    statement = select(func.avg(User.age))
    avg_age = session.exec(statement).one()
    
    # Группировка
    statement = select(User.age, func.count(User.id)).group_by(User.age)
    results = session.exec(statement).all()

Работа с отношениями между таблицами
Определение связей

from sqlmodel import Relationship
from typing import Optional, List

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    
    # Обратная связь
    products: List["Product"] = Relationship(back_populates="category")

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price: float
    category_id: int = Field(foreign_key="category.id")
    
    # Прямая связь
    category: Optional[Category] = Relationship(back_populates="products")

Работа со связанными данными

with Session(engine) as session:
    # Создание связанных записей
    category = Category(name="Электроника")
    session.add(category)
    session.commit()
    session.refresh(category)
    
    product = Product(
        name="Смартфон",
        price=25000,
        category_id=category.id
    )
    session.add(product)
    session.commit()
    
    # Получение связанных данных
    statement = select(Product).where(Product.id == 1)
    product = session.exec(statement).first()
    print(f"Товар: {product.name}, Категория: {product.category.name}")

Связи многие-ко-многим

class UserProductLink(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    product_id: int = Field(foreign_key="product.id", primary_key=True)

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    
    products: List[Product] = Relationship(
        back_populates="users",
        link_model=UserProductLink
    )

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    
    users: List[User] = Relationship(
        back_populates="products",
        link_model=UserProductLink
    )

Асинхронная работа с SQLModel
Настройка асинхронного движка

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlmodel import select

# Создание асинхронного движка
engine = create_async_engine("sqlite+aiosqlite:///database.db")

# Для PostgreSQL
engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/dbname")

Асинхронные операции

async def create_user(name: str, email: str):
    async with AsyncSession(engine) as session:
        user = User(name=name, email=email)
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user

async def get_users():
    async with AsyncSession(engine) as session:
        statement = select(User)
        result = await session.exec(statement)
        return result.all()

async def update_user(user_id: int, new_name: str):
    async with AsyncSession(engine) as session:
        user = await session.get(User, user_id)
        if user:
            user.name = new_name
            session.add(user)
            await session.commit()
            await session.refresh(user)
        return user

Интеграция с FastAPI
Базовая интеграция

from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select

app = FastAPI()

def get_session():
    with Session(engine) as session:
        yield session

@app.post("/users/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.get("/users/", response_model=List[User])
def read_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

Разделение моделей для API

class UserBase(SQLModel):
    name: str
    email: str
    age: int

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_active: bool = Field(default=True)

class UserCreate(UserBase):
    pass

class UserRead(UserBase):
    id: int
    is_active: bool

class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None

@app.post("/users/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    db_user = User.from_orm(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

Миграции с Alembic
Настройка Alembic

pip install alembic
alembic init alembic

Конфигурация env.py

# alembic/env.py
from alembic import context
from sqlmodel import SQLModel
from myapp.models import User, Product, Category  # Импорт всех моделей

target_metadata = SQLModel.metadata

def run_migrations_online():
    connectable = engine
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()

Создание и применение миграций

# Создание миграции
alembic revision --autogenerate -m "Add user table"

# Применение миграции
alembic upgrade head

# Откат миграции
alembic downgrade -1

Валидация данных
Встроенная валидация Pydantic

from pydantic import validator, root_validator
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(min_length=2, max_length=50)
    email: str = Field(regex=r'^[^@]+@[^@]+\.[^@]+$')
    age: int = Field(ge=0, le=150)
    password: str = Field(min_length=8)
    
    @validator('email')
    def validate_email(cls, v):
        if not v.endswith('@example.com'):
            raise ValueError('Только email с доменом @example.com')
        return v
    
    @validator('name')
    def validate_name(cls, v):
        if any(char.isdigit() for char in v):
            raise ValueError('Имя не должно содержать цифры')
        return v.title()
    
    @root_validator
    def validate_password_strength(cls, values):
        password = values.get('password')
        if password and len(password) < 8:
            raise ValueError('Пароль должен быть не менее 8 символов')
        return values

Кастомные валидаторы

from pydantic import validator
import re

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price: float
    sku: str = Field(unique=True)
    
    @validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Цена должна быть положительной')
        return round(v, 2)
    
    @validator('sku')
    def validate_sku(cls, v):
        if not re.match(r'^[A-Z]{3}-\d{3}$', v):
            raise ValueError('SKU должен быть в формате ABC-123')
        return v

Тестирование с SQLModel
Настройка тестовой базы данных

import pytest
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.pool import StaticPool

@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

Тестирование CRUD операций

def test_create_user(session: Session):
    user = User(name="Test User", email="test@example.com", age=25)
    session.add(user)
    session.commit()
    session.refresh(user)
    
    assert user.id is not None
    assert user.name == "Test User"
    assert user.email == "test@example.com"

def test_read_user(session: Session):
    user = User(name="Test User", email="test@example.com", age=25)
    session.add(user)
    session.commit()
    session.refresh(user)
    
    retrieved_user = session.get(User, user.id)
    assert retrieved_user is not None
    assert retrieved_user.name == "Test User"

def test_update_user(session: Session):
    user = User(name="Test User", email="test@example.com", age=25)
    session.add(user)
    session.commit()
    session.refresh(user)
    
    user.name = "Updated Name"
    session.add(user)
    session.commit()
    
    updated_user = session.get(User, user.id)
    assert updated_user.name == "Updated Name"

Производительность и оптимизация
Eager Loading

from sqlmodel import select
from sqlalchemy.orm import selectinload

# Загрузка связанных данных
statement = select(User).options(selectinload(User.products))
users = session.exec(statement).all()

# Для каждого пользователя products уже загружены
for user in users:
    print(f"Пользователь {user.name} имеет {len(user.products)} товаров")

Пакетная обработка

def bulk_create_users(users_data: List[dict]):
    with Session(engine) as session:
        users = [User(**data) for data in users_data]
        session.add_all(users)
        session.commit()
        return users

def bulk_update_users(updates: List[dict]):
    with Session(engine) as session:
        session.bulk_update_mappings(User, updates)
        session.commit()

Индексы и оптимизация

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)  # Простой индекс
    email: str = Field(unique=True)  # Уникальный индекс
    age: int
    city: str = Field(index=True)
    
    # Составной индекс через __table_args__
    __table_args__ = (
        Index('idx_age_city', 'age', 'city'),
    )

Основные методы и функции SQLModel
Метод/Функция 	Описание 	Пример использования
SQLModel 	Базовый класс для моделей 	class User(SQLModel, table=True):
Field() 	Определение поля с параметрами 	id: int = Field(primary_key=True)
create_engine() 	Создание движка базы данных 	engine = create_engine("sqlite:///db.sqlite")
Session() 	Создание сессии для работы с БД 	with Session(engine) as session:
select() 	Создание SELECT запроса 	statement = select(User)
session.add() 	Добавление объекта в сессию 	session.add(user)
session.commit() 	Подтверждение изменений 	session.commit()
session.refresh() 	Обновление объекта из БД 	session.refresh(user)
session.exec() 	Выполнение запроса 	users = session.exec(statement).all()
session.get() 	Получение объекта по ID 	user = session.get(User, 1)
session.delete() 	Удаление объекта 	session.delete(user)
SQLModel.metadata.create_all() 	Создание всех таблиц 	SQLModel.metadata.create_all(engine)
Relationship() 	Определение связей между таблицами 	products: List[Product] = Relationship()
and_() 	Логическое И в запросах 	where(and_(User.age > 18, User.is_active))
or_() 	Логическое ИЛИ в запросах 	where(or_(User.age < 18, User.age > 65))
func.count() 	Подсчет записей 	select(func.count(User.id))
func.avg() 	Среднее значение 	select(func.avg(User.age))
func.sum() 	Сумма значений 	select(func.sum(Product.price))
.where() 	Фильтрация записей 	select(User).where(User.age > 18)
.order_by() 	Сортировка результатов 	select(User).order_by(User.name)
.limit() 	Ограничение количества записей 	select(User).limit(10)
.offset() 	Пропуск записей 	select(User).offset(20)
.group_by() 	Группировка результатов 	select(User.age).group_by(User.age)
.join() 	Объединение таблиц 	select(User).join(Product)
.all() 	Получение всех результатов 	session.exec(statement).all()
.first() 	Получение первого результата 	session.exec(statement).first()
.one() 	Получение единственного результата 	session.exec(statement).one()
Интеграция с аналитическими инструментами
Работа с Pandas

import pandas as pd
from sqlmodel import select

def users_to_dataframe(session: Session) -> pd.DataFrame:
    statement = select(User)
    users = session.exec(statement).all()
    
    # Преобразование в список словарей
    users_data = [user.dict() for user in users]
    
    # Создание DataFrame
    df = pd.DataFrame(users_data)
    return df

# Использование
with Session(engine) as session:
    df = users_to_dataframe(session)
    print(df.describe())
    
    # Анализ данных
    age_stats = df.groupby('age').size()
    print(age_stats)

Экспорт данных

def export_users_to_csv(session: Session, filename: str):
    df = users_to_dataframe(session)
    df.to_csv(filename, index=False)

def export_users_to_json(session: Session, filename: str):
    statement = select(User)
    users = session.exec(statement).all()
    
    users_data = [user.dict() for user in users]
    
    import json
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(users_data, f, ensure_ascii=False, indent=2)
