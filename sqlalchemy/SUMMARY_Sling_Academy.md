# Sling Academy

<https://www.slingacademy.com/cat/sqlalchemy/>

## Tutorials

### SQLAlchemy Aggregation: Min, Max, Average, and Sum

<https://www.slingacademy.com/article/sqlalchemy-aggregation-min-max-average-sum/>

#### Setting Up the Environment

        from sqlalchemy import create_engine, Column, Integer, Float, func
        from sqlalchemy.ext.declarative import declarative_base
        from sqlalchemy.orm import sessionmaker

        engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=engine)
        session = Session()
        Base = declarative_base()

        # Define a simple Product model
        class Product(Base):
            __tablename__ = 'products'
            id = Column(Integer, primary_key=True)
            name = Column(String)
            price = Column(Float)
        Base.metadata.create_all(engine)

#### Basic Aggregations

        min_price = session.query(func.min(Product.price)).scalar()
        print('Minimum product price:', min_price)

Similarly, for finding the maximum product price:

        max_price = session.query(func.max(Product.price)).scalar()
        print('Maximum product price:', max_price)

Calculating the average price:

        avg_price = session.query(func.avg(Product.price)).scalar()
        print('Average product price:', avg_price)

And fetching the sum of all product prices:

        total_price = session.query(func.sum(Product.price)).scalar()
        print('Total price of all products:', total_price)

#### Grouping and Aggregating

        brackets = session.query(Product.price, func.count(Product.id)).group_by(Product.price).all()
        for bracket in brackets:
            print(f'Price: {bracket[0]}, Count: {bracket[1]}')

#### Joining, Filtering, and Aggregating

        class Order(Base):
            __tablename__ = 'orders'
            id = Column(Integer, primary_key=True)
            product_id = Column(Integer, ForeignKey('products.id'))
            quantity = Column(Integer)

        # Now assume we have data populated in both the Product and Order tables.

        # Let's find the total sales per product:
        total_sales = session.query(
            Product.name,
            func.sum(Product.price * Order.quantity).label('total_sales')
        ).join(Order, Order.product_id == Product.id)
        .group_by(Product.name).all()

        for product in total_sales:
            print(f'Product: {product.name}, Total Sales: {product.total_sales}')

#### Advanced Aggregations: Hybrid Properties and Expressions

        from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method

        class Product(Base):
            # ... existing model fields
            
            @hybrid_property
            def avg_cost(self):
                return self.price * SOME_FIXED_FACTOR

        # Query using the hybrid property:
        avg_cost_query = session.query(Product.name, Product.avg_cost.label('average_cost')).all()

        for product in avg_cost_query:
            print(f'Product: {product.name}, Average Cost: {product.average_cost}')

#### Combining Aggregates with Case Statements

        from sqlalchemy import case

        sales_categories = session.query(
            Product.name,
            func.sum(case([(Order.quantity > 10, Order.quantity)], else_=0)).label('high_sales'),
            func.sum(case([(Order.quantity <= 10, Order.quantity)], else_=0)).label('low_sales')
        ).join(Order, Order.product_id == Product.id)
        .group_by(Product.name).all()

        for product in sales_categories:
            print(f"Product: {product.name}, High Sales: {product.high_sales}, Low Sales: {product.low_sales}")

### SQLAlchemy: Convert Query Results into Dictionary

#### Basic Conversion to Dictionary

        # Import the necessary modules
        from sqlalchemy.orm import sessionmaker
        from sqlalchemy import create_engine, MetaData, Table

        # Define your engine, meta, table and session here
        ...

        # Perform a query
        results = session.query(YourModel).all()

        # Convert to dictionary
        result_dicts = [{column.name: getattr(row, column.name) for column in YourModel.__table__.columns} for row in results]

#### Using the namedtuple Result

        from collections import namedtuple

        # Execute the query and use _asdict() function
        Result = namedtuple('Result', [column.name for column in YourModel.__table__.columns])

        # Fetch rows as namedtuples
        named_tuples = [Result(*row). _asdict() for row in session.execute(query)]

#### Advanced Method: Automating Dictionary Conversion

        from sqlalchemy.ext.declarative import declarative_base

        Base = declarative_base()

        class SerializerMixin:
            def __init__(self, data):
                for field in self.__table__.columns:
                    if ha getattr(field, 'name'):
                        setattr(self, field.name, data[field.name])

            def to_dict(self):
                return {column.name: getattr(self, column.name) for column in self.__table__.columns}
            
        class YourModel(Base, SerializerMixin):
            __tablename__ = 'your_table'

            # define your columns

#### Using Hybrid Properties for Custom Fields

        from sqlalchemy.ext.hybrid import hybrid_property

        # Add a hybrid property in your model
        class YourModel(Base):
            # ... model definitions ...
            
            @hybrid_property
            def custom_field(self):
                return self.some_column * 10 # or any other custom logic

        # Now, custom_field can be included in to_dict method
        # Extend the SerializerMixin to handle hybrid properties
        class ExtendedSerializerMixin(SerializerMixin):
            def to_dict(self):
                dictionary=super().to_dict()
                for key in self.__mapper__.all_orm_descriptors.keys():
                    if isinstance(getattr(self, key, None), HybridProperty):
                        dictionary[key]=getattr(self, key)
                return dictionary

