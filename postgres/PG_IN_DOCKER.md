# Docker Postgres

<https://habr.com/en/articles/578744/>

## Hello Postgres

Официальный образ Постгреса очень продвинутый и позволяет настраивать множество параметров. Для быстрого старта большинство из них можно оставить как есть, но вот пароль суперпользователя придётся задать явно:

```bash
docker run --name habr-pg -e POSTGRES_PASSWORD=pgpwd4habr -d postgres
```

Эта команда запустит нам контейнер PostgreSQL в фоновом (detached) режиме и присвоит ему имя habr-pg

Классно, не правда ли? А что мы можем делать с этой базой данных? К сожалению, на текущий момент не так уж и много. Через интерфейс Docker можно запустить CLI, подключиться к контейнеру и уже оттуда запустить, например, psql:

```bash
sudo docker exec --it habr-pg /bin/sh
psql --username=postgres --dbname=postgres
```

Далее я буду использовать сокращенный вариант этой команды:

```bash
psql -U postgres -d postgres
```

И тут мы сталкиваемся с первой проблемой: что вернёт нам запрос select version();, выполненный в консоли? Мы не указали явным образом версию БД, которую хотим использовать. Давайте это исправим:

```bash
docker run --name habr-pg-13.3 -e POSTGRES_PASSWORD=pgpwd4habr -d postgres:13.3
```

Теперь вопросов об используемой версии БД не возникает, но работать с ней по-прежнему не очень удобно. Нам нужно сделать эту БД доступной извне, чтобы к ней могли подключаться приложения и IDE. Для этого нужно выставить наружу порт:

```bash
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_PASSWORD=pgpwd4habr -d postgres:13.3
```

Отлично! С этого момента к базе данных можно подключиться, например, из IntelliJ IDEA

Сейчас мы используем пользователя и базу данных в контейнере, создаваемых по умолчанию, я же предпочитаю указывать их явно. Финальная версия команды для запуска будет иметь вид:

```sh
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -d postgres:13.3
```

`psql` можно запустить так: `psql -U habrpguser -d habrdb`

И соответствующий compose-файл:

```sh
version: "3.9"
services:
  postgres:
    image: postgres:13.3
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
    ports:
      - "5432:5432"
```

## Инициализация структуры БД 

К текущему моменту мы научились запускать в контейнере необходимую нам версию PostgreSQL, переопределять суперпользователя и создавать базу данных с нужным именем.

Это хорошо, но чистая база данных вряд ли будет сильно полезна. Для работы/тестов/экспериментов нужно наполнить эту базу таблицами и другими объектами. Разумеется, всё это можно сделать вручную, но, согласитесь, гораздо удобнее, когда сразу после запуска вы автоматически получаете полностью готовую БД.

Разработчики официального образа PostgreSQL естественно предусмотрели этот момент и предоставили нам специальную точку входа для инициализации базы данных - `docker-entrypoint-initdb.d`. Любые `*.sql` или `*.sh` файлы в этом каталоге будут рассматриваться как скрипты для инициализации БД. Здесь есть несколько нюансов:

- если БД уже была проинициализирована ранее, то никакие изменения к ней применяться не будут;
- если в каталоге присутствует несколько файлов, то они будут отсортированы по имени с использованием текущей локали (по умолчанию en_US.utf8).

Инициализацию БД можно запустить через однострочник, но в этом случае требуется указывать абсолютный путь до каталога со скриптами:

```sh
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -d -v "/absolute/path/to/directory-with-init-scripts":/docker-entrypoint-initdb.d postgres:13.3
```

Например, на моей машине это выглядит так:

```bash
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -d -v "/Users/ivahrusev/src/useful-sql-scripts/running_pg_in_docker/2. Init Database":/docker-entrypoint-initdb.d postgres:13.3
```

В качестве обходного варианта можно использовать макрос, на лету определяя рабочую директорию, и запускать команду из каталога со скриптами:

```sh
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -d -v "$(pwd)":/docker-entrypoint-initdb.d postgres:13.3
```

Использование docker-compose файла в этом случае более удобно и позволяет указывать относительные пути:

```bash
version: "3.9"
services:
  postgres:
    image: postgres:13.3
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
    volumes:
      - .:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
```

Здесь хотелось бы акцентировать ваше внимание на одной простой вещи, о которой уже говорил в предыдущей статье: при создании миграций БД для ваших приложений отдавайте предпочтение чистому (plain) SQL. В этом случае их можно будет переиспользовать с минимальными затратами.

## А куда сохраняются мои данные?

Базы данных – это в первую очередь история про персистентность. И,.. Хьюстон, кажется у нас проблема… К настоящему моменту мы никак не управляем долговременным хранением нашей базы данных. Эту задачу целиком на себя берёт Docker, автоматически создавая volume для контейнера с БД. Есть целый ворох причин, почему это плохо, начиная от банальной невозможности просматривать содержимое volume’ов в бесплатной версии Docker Desktop и заканчивая лимитами дискового пространства.

Разумеется, хорошей практикой является полностью ручное управление физическим размещением создаваемых баз данных. Для этого нам нужно подмонтировать соответствующий каталог (куда будут сохраняться данные) в контейнер и при необходимости переопределить переменную окружения PGDATA:

```sh
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -e PGDATA=/var/lib/postgresql/data/pgdata -d -v "/absolute/path/to/directory-with-data":/var/lib/postgresql/data -v "/absolute/path/to/directory-with-init-scripts":/docker-entrypoint-initdb.d postgres:13.3
```

Вариант с макросом, использующий для инициализации БД скрипты из предыдущего раздела:

```bash
docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -e PGDATA=/var/lib/postgresql/data/pgdata -d -v "$(pwd)":/var/lib/postgresql/data -v "$(pwd)/../2. Init Database":/docker-entrypoint-initdb.d postgres:13.3
```

С однострочниками на этом закончим. Все дальнейшие шаги будем осуществлять только через compose-файл:

```sh
version: "3.9"
services:
  postgres:
    image: postgres:14.8-alpine3.18
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - ../2. Init Database:/docker-entrypoint-initdb.d
      - habrdb-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  habrdb-data:
```

## Healthcheck? Нет, не слышал…

Проверка состояния/работоспособности – healthcheck – вполне устоявшийся архитектурный шаблон, который вы должны взять на вооружение для всех ваших приложений. База данных, запускаемая в контейнере, не является исключением.

Основная задача healthcheck’а – как можно скорее уведомить среду, управляющую контейнером, о том, что с контейнером что-то не так. И самая простая стратегия решения проблемы – перезапуск контейнера.

Так же стоит сразу позаботиться об ограничении ресурсов для контейнера с БД. Для экспериментов и локального запуска вполне подойдёт секция resources (флаг --compatibility больше не требуется).

Healthcheck для PostgreSQL обычно основывается на использовании утилиты pg_isready как показано ниже:

```bash
version: "3.9"
services:
  postgres:
    image: postgres:14.8-alpine3.18
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - ../2. Init Database:/docker-entrypoint-initdb.d
      - habrdb-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 4G

volumes:
  habrdb-data:
```

## А если хочу изменить параметры БД? 

Для администраторов PostgreSQL не секрет, что конфигурация СУБД из коробки далека от идеальной и не очень подходит для эксплуатации. Я немного рассказывал об этом в своей статье про pg-index-health: ряд параметров нужно изменить в обязательном порядке, так как они влияют на производительность. Так же существует большое количество расширений для Постгреса, которые сделают эксплуатацию БД более удобной, наблюдаемой и управляемой. Одно из таких расширений - pg_stat_statements (кстати, оно пригодится нам позднее для мониторинга БД).

Ванильный образ PostgreSQL позволяет тюнить параметры и добавлять расширения на старте контейнера БД:

```sh
version: "3.9"
services:
  postgres:
    image: postgres:14.8-alpine3.18
    command:
      - "postgres"
      - "-c"
      - "max_connections=50"
      - "-c"
      - "shared_buffers=1GB"
      - "-c"
      - "effective_cache_size=4GB"
      - "-c"
      - "work_mem=16MB"
      - "-c"
      - "maintenance_work_mem=512MB"
      - "-c"
      - "random_page_cost=1.1"
      - "-c"
      - "temp_file_limit=10GB"
      - "-c"
      - "log_min_duration_statement=200ms"
      - "-c"
      - "idle_in_transaction_session_timeout=10s"
      - "-c"
      - "lock_timeout=1s"
      - "-c"
      - "statement_timeout=60s"
      - "-c"
      - "shared_preload_libraries=pg_stat_statements"
      - "-c"
      - "pg_stat_statements.max=10000"
      - "-c"
      - "pg_stat_statements.track=all"
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - ../2. Init Database:/docker-entrypoint-initdb.d
      - habrdb-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 4G

volumes:
  habrdb-data:
```

Update. Февраль 2024. Разумеется, можно указать свой postgresql.conf. Пример [тут](https://github.com/mfvanek/useful-sql-scripts/blob/915b5f4a62db14307175af98ddad671d3bbc8484/running_pg_in_docker/5.1.%20Tuning%20parameters%20via%20file/docker-compose.yml#L1).

Посмотреть список установленных расширений можно с помощью запроса `select * from pg_extension`;.

А команда show позволит узнать текущее значение того или иного параметра, например: show random_page_cost;.

## Не люблю консоль; дайте мне человеческий UI!

Далеко не все пользователи любят работать с БД из командной строки. Очень многие предпочитают использовать для этого продвинутый графический интерфейс, например pgAdmin.

Запустить ещё один контейнер, в котором будет бежать GUI, не сложно, но для удобной коммуникации с БД их лучше объединить в одну сеть:

```yml
version: "3.9"
services:
  postgres:
    container_name: postgres_container
    image: postgres:14.8-alpine3.18
    command:
      - "postgres"
      - "-c"
      - "max_connections=50"
      - "-c"
      - "shared_buffers=1GB"
      - "-c"
      - "effective_cache_size=4GB"
      - "-c"
      - "work_mem=16MB"
      - "-c"
      - "maintenance_work_mem=512MB"
      - "-c"
      - "random_page_cost=1.1"
      - "-c"
      - "temp_file_limit=10GB"
      - "-c"
      - "log_min_duration_statement=200ms"
      - "-c"
      - "idle_in_transaction_session_timeout=10s"
      - "-c"
      - "lock_timeout=1s"
      - "-c"
      - "statement_timeout=60s"
      - "-c"
      - "shared_preload_libraries=pg_stat_statements"
      - "-c"
      - "pg_stat_statements.max=10000"
      - "-c"
      - "pg_stat_statements.track=all"
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - ../2. Init Database:/docker-entrypoint-initdb.d
      - habrdb-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 4G
    networks:
      - postgres

  pgadmin:
    container_name: pgadmin_container
    image: dpage/pgadmin4:7.2
    environment:
      PGADMIN_DEFAULT_EMAIL: "habrpguser@habr.com"
      PGADMIN_DEFAULT_PASSWORD: "pgadminpwd4habr"
      PGADMIN_CONFIG_SERVER_MODE: "False"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    ports:
      - "5050:80"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 1G
    networks:
      - postgres

volumes:
  habrdb-data:
  pgadmin-data:

networks:
  postgres:
    driver: bridge
```

pgAdmin стартует на порту 5050: перейдя на нужный адрес, можно будет настроить подключение к БД.

## А как насчёт мониторинга?

В современной разработке любой микросервис или инфраструктурный компонент должен быть поставлен на мониторинг, то есть непрерывно отдавать метрики - ключевые показатели, позволяющие определить, как ведёт себя система в данный момент времени.

PostgreSQL не имеет встроенной интеграции с системами мониторинга наподобие Prometheus (или Zabbix). Вместо этого он полагается на использование внешних агентов - экспортеров. Мы у себя активно используем postgres_exporter, позволяющий добавлять свои собственные sql-запросы и кастомные метрики на их основе:

```yml
version: "3.9"
services:
  postgres:
    container_name: postgres_container
    image: postgres:14.8-alpine3.18
    command:
      - "postgres"
      - "-c"
      - "max_connections=50"
      - "-c"
      - "shared_buffers=1GB"
      - "-c"
      - "effective_cache_size=4GB"
      - "-c"
      - "work_mem=16MB"
      - "-c"
      - "maintenance_work_mem=512MB"
      - "-c"
      - "random_page_cost=1.1"
      - "-c"
      - "temp_file_limit=10GB"
      - "-c"
      - "log_min_duration_statement=200ms"
      - "-c"
      - "idle_in_transaction_session_timeout=10s"
      - "-c"
      - "lock_timeout=1s"
      - "-c"
      - "statement_timeout=60s"
      - "-c"
      - "shared_preload_libraries=pg_stat_statements"
      - "-c"
      - "pg_stat_statements.max=10000"
      - "-c"
      - "pg_stat_statements.track=all"
    environment:
      POSTGRES_DB: "habrdb"
      POSTGRES_USER: "habrpguser"
      POSTGRES_PASSWORD: "pgpwd4habr"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    volumes:
      - ../2. Init Database:/docker-entrypoint-initdb.d
      - habrdb-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 4G
    networks:
      - postgres

  pgadmin:
    container_name: pgadmin_container
    image: dpage/pgadmin4:7.2
    environment:
      PGADMIN_DEFAULT_EMAIL: "habrpguser@habr.com"
      PGADMIN_DEFAULT_PASSWORD: "pgadminpwd4habr"
      PGADMIN_CONFIG_SERVER_MODE: "False"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    ports:
      - "5050:80"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 1G
    networks:
      - postgres

  postgres_exporter:
    container_name: exporter_container
    image: prometheuscommunity/postgres-exporter:v0.10.1
    environment:
      DATA_SOURCE_URI: "postgres:5432/habrdb?sslmode=disable"
      DATA_SOURCE_USER: "habrpguser"
      DATA_SOURCE_PASS: "pgpwd4habr"
      PG_EXPORTER_EXTEND_QUERY_PATH: "/etc/postgres_exporter/queries.yaml"
    volumes:
      - ./queries.yaml:/etc/postgres_exporter/queries.yaml:ro
    ports:
      - "9187:9187"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.2'
          memory: 500M
    networks:
      - postgres

volumes:
  habrdb-data:
  pgadmin-data:

networks:
  postgres:
    driver: bridge

```

После запуска скрипта экспортер будет доступен на порту 9187 и отдавать метрики в формате Prometheus:

```bash
...
# HELP pg_stat_user_tables_n_tup_upd Number of rows updated
# TYPE pg_stat_user_tables_n_tup_upd counter
pg_stat_user_tables_n_tup_upd{datname="habrdb",relname="first_table",schemaname="public",server="postgres:5432"} 0
pg_stat_user_tables_n_tup_upd{datname="habrdb",relname="second_table",schemaname="public",server="postgres:5432"} 0
# HELP pg_stat_user_tables_seq_scan Number of sequential scans initiated on this table
# TYPE pg_stat_user_tables_seq_scan counter
pg_stat_user_tables_seq_scan{datname="habrdb",relname="first_table",schemaname="public",server="postgres:5432"} 1
pg_stat_user_tables_seq_scan{datname="habrdb",relname="second_table",schemaname="public",server="postgres:5432"} 1
# HELP pg_stat_user_tables_seq_tup_read Number of live rows fetched by sequential scans
# TYPE pg_stat_user_tables_seq_tup_read counter
pg_stat_user_tables_seq_tup_read{datname="habrdb",relname="first_table",schemaname="public",server="postgres:5432"} 0
pg_stat_user_tables_seq_tup_read{datname="habrdb",relname="second_table",schemaname="public",server="postgres:5432"} 0
# HELP pg_stat_user_tables_vacuum_count Number of times this table has been manually vacuumed (not counting VACUUM FULL)
# TYPE pg_stat_user_tables_vacuum_count counter
pg_stat_user_tables_vacuum_count{datname="habrdb",relname="first_table",schemaname="public",server="postgres:5432"} 0
pg_stat_user_tables_vacuum_count{datname="habrdb",relname="second_table",schemaname="public",server="postgres:5432"} 0
# HELP pg_static Version string as reported by postgres
# TYPE pg_static untyped
pg_static{server="postgres:5432",short_version="13.3.0",version="PostgreSQL 13.3 (Debian 13.3-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit"} 1
...
```

Разумеется, для полноценной постановки на мониторинг нужно ещё поднять сам Prometheus + Grafana, а так же загрузить подходящий dashboard, но это уже выходит за рамки данной статьи. Более того, если ваша служба информационной безопасности исповедует Zero Trust, то экспортер придётся прикрыть с помощью nginx и настроить mTLS...