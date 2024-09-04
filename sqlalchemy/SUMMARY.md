# sqlalchemy

## SQLAlchemy 1.4 / 2.0 Tutorial

<https://docs.sqlalchemy.org/en/14/tutorial/index.html#unified-tutorial>

### Working with ORM Related Objects

        from sqlalchemy.orm import relationship


        class User(Base):
            __tablename__ = "user_account"

            # ... Column mappings

            addresses = relationship("Address", back_populates="user")


        class Address(Base):
            __tablename__ = "address"

            # ... Column mappings

            user = relationship("User", back_populates="addresses")

#### Persisting and Loading Relationships

        >>> u1 = User(name="pkrabs", fullname="Pearl Krabs")
        >>> u1.addresses
        []

        >>> a1 = Address(email_address="pearl.krabs@gmail.com")
        >>> u1.addresses.append(a1)

        >>> u1.addresses
        [Address(id=None, email_address='pearl.krabs@gmail.com')]

        >>> a1.user
        User(id=None, name='pkrabs', fullname='Pearl Krabs')

        >>> a2 = Address(email_address="pearl@aol.com", user=u1)
        >>> u1.addresses
        [Address(id=None, email_address='pearl.krabs@gmail.com'), Address(id=None, email_address='pearl@aol.com')]

        # equivalent effect as a2 = Address(user=u1)
        >>> a2.user = u1

#### Cascading Objects into the Session

        >>> session.add(u1)
        >>> u1 in session
        True
        >>> a1 in session
        True
        >>> a2 in session
        True

        >>> print(u1.id)
        None
        >>> print(a1.user_id)
        None

        >>> session.commit()
        INSERT INTO user_account (name, fullname) VALUES (?, ?)
        [...] ('pkrabs', 'Pearl Krabs')
        INSERT INTO address (email_address, user_id) VALUES (?, ?)
        [...] ('pearl.krabs@gmail.com', 6)
        INSERT INTO address (email_address, user_id) VALUES (?, ?)
        [...] ('pearl@aol.com', 6)
        COMMIT

#### Loading Relationships

        >>> u1.id
        BEGIN (implicit)
        SELECT user_account.id AS user_account_id, user_account.name AS user_account_name,
        user_account.fullname AS user_account_fullname
        FROM user_account
        WHERE user_account.id = ?
        [...] (6,)

        >>> u1.addresses
        SELECT address.id AS address_id, address.email_address AS address_email_address,
        address.user_id AS address_user_id
        FROM address
        WHERE ? = address.user_id
        [...] (6,)
        [Address(id=4, email_address='pearl.krabs@gmail.com'), Address(id=5, email_address='pearl@aol.com')]

        >>> u1.addresses
        [Address(id=4, email_address='pearl.krabs@gmail.com'), Address(id=5, email_address='pearl@aol.com')]

        >>> a1
        Address(id=4, email_address='pearl.krabs@gmail.com')
        >>> a2
        Address(id=5, email_address='pearl@aol.com')

#### Using Relationships in Queries

        >>> print(select(Address.email_address).select_from(User).join(User.addresses))
        SELECT address.email_address
        FROM user_account JOIN address ON user_account.id = address.user_id

        >>> print(select(Address.email_address).join_from(User, Address))
        SELECT address.email_address
        FROM user_account JOIN address ON user_account.id = address.user_id
##### Joining between Aliased targets

        >>> print(
        ...     select(User)
        ...     .join(User.addresses.of_type(address_alias_1))
        ...     .where(address_alias_1.email_address == "patrick@aol.com")
        ...     .join(User.addresses.of_type(address_alias_2))
        ...     .where(address_alias_2.email_address == "patrick@gmail.com")
        ... )
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN address AS address_1 ON user_account.id = address_1.user_id
        JOIN address AS address_2 ON user_account.id = address_2.user_id
        WHERE address_1.email_address = :email_address_1
        AND address_2.email_address = :email_address_2

        >>> user_alias_1 = aliased(User)
        >>> print(select(user_alias_1.name).join(user_alias_1.addresses))
        SELECT user_account_1.name
        FROM user_account AS user_account_1
        JOIN address ON user_account_1.id = address.user_id

##### Augmenting the ON Criteria

        >>> stmt = select(User.fullname).join(
        ...     User.addresses.and_(Address.email_address == "pearl.krabs@gmail.com")
        ... )
        >>> session.execute(stmt).all()
        SELECT user_account.fullname
        FROM user_account
        JOIN address ON user_account.id = address.user_id AND address.email_address = ?
        [...] ('pearl.krabs@gmail.com',)
        [('Pearl Krabs',)]

##### EXISTS forms: has() / any()

        >>> stmt = select(User.fullname).where(
        ...     User.addresses.any(Address.email_address == "pearl.krabs@gmail.com")
        ... )
        >>> session.execute(stmt).all()
        SELECT user_account.fullname
        FROM user_account
        WHERE EXISTS (SELECT 1
        FROM address
        WHERE user_account.id = address.user_id AND address.email_address = ?)
        [...] ('pearl.krabs@gmail.com',)
        [('Pearl Krabs',)]

        >>> stmt = select(User.fullname).where(~User.addresses.any())
        >>> session.execute(stmt).all()
        SELECT user_account.fullname
        FROM user_account
        WHERE NOT (EXISTS (SELECT 1
        FROM address
        WHERE user_account.id = address.user_id))
        [...] ()
        [('Patrick McStar',), ('Squidward Tentacles',), ('Eugene H. Krabs',)]

        >>> stmt = select(Address.email_address).where(Address.user.has(User.name == "pkrabs"))
        >>> session.execute(stmt).all()
        SELECT address.email_address
        FROM address
        WHERE EXISTS (SELECT 1
        FROM user_account
        WHERE user_account.id = address.user_id AND user_account.name = ?)
        [...] ('pkrabs',)
        [('pearl.krabs@gmail.com',), ('pearl@aol.com',)]

##### Common Relationship Operators

**many to one equals comparison**

        >>> print(select(Address).where(Address.user == u1))
        SELECT address.id, address.email_address, address.user_id
        FROM address
        WHERE :param_1 = address.user_id

**many to one not equals comparison**

        >>> print(select(Address).where(Address.user != u1))
        SELECT address.id, address.email_address, address.user_id
        FROM address
        WHERE address.user_id != :user_id_1 OR address.user_id IS NULL

**object is contained in a one-to-many collection**

        >>> print(select(User).where(User.addresses.contains(a1)))
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        WHERE user_account.id = :param_1

**An object has a particular parent from a one-to-many perspective**

        >>> from sqlalchemy.orm import with_parent
        >>> print(select(Address).where(with_parent(u1, User.addresses)))
        SELECT address.id, address.email_address, address.user_id
        FROM address
        WHERE :param_1 = address.user_id

##### Loader Strategies

<https://docs.sqlalchemy.org/en/14/tutorial/orm_related_objects.html#loader-strategies>

Loader strategies are represented as objects that may be associated with a SELECT statement using the Select.options() method, e.g.:

        for user_obj in session.execute(
            select(User).options(selectinload(User.addresses))
        ).scalars():
            user_obj.addresses  # access addresses collection already loaded

They may be also configured as defaults for a relationship() using the relationship.lazy option, e.g.:

from sqlalchemy.orm import relationship


        class User(Base):
            __tablename__ = "user_account"

            addresses = relationship("Address", back_populates="user", lazy="selectin")

##### Selectin Load

        >>> from sqlalchemy.orm import selectinload
        >>> stmt = select(User).options(selectinload(User.addresses)).order_by(User.id)
        >>> for row in session.execute(stmt):
        ...     print(
        ...         f"{row.User.name}  ({', '.join(a.email_address for a in row.User.addresses)})"
        ...     )
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account ORDER BY user_account.id
        [...] ()
        SELECT address.user_id AS address_user_id, address.id AS address_id,
        address.email_address AS address_email_address
        FROM address
        WHERE address.user_id IN (?, ?, ?, ?, ?, ?)
        [...] (1, 2, 3, 4, 5, 6)
        spongebob  (spongebob@sqlalchemy.org)
        sandy  (sandy@sqlalchemy.org, sandy@squirrelpower.org)
        patrick  ()
        squidward  ()
        ehkrabs  ()
        pkrabs  (pearl.krabs@gmail.com, pearl@aol.com)

##### Joined Load

        >>> from sqlalchemy.orm import joinedload
        >>> stmt = (
        ...     select(Address)
        ...     .options(joinedload(Address.user, innerjoin=True))
        ...     .order_by(Address.id)
        ... )
        >>> for row in session.execute(stmt):
        ...     print(f"{row.Address.email_address} {row.Address.user.name}")
        SELECT address.id, address.email_address, address.user_id, user_account_1.id AS id_1,
        user_account_1.name, user_account_1.fullname
        FROM address
        JOIN user_account AS user_account_1 ON user_account_1.id = address.user_id
        ORDER BY address.id
        [...] ()
        spongebob@sqlalchemy.org spongebob
        sandy@sqlalchemy.org sandy
        sandy@squirrelpower.org sandy
        pearl.krabs@gmail.com pkrabs
        pearl@aol.com pkrabs

##### Explicit Join + Eager load

        >>> from sqlalchemy.orm import contains_eager
        >>> stmt = (
        ...     select(Address)
        ...     .join(Address.user)
        ...     .where(User.name == "pkrabs")
        ...     .options(contains_eager(Address.user))
        ...     .order_by(Address.id)
        ... )
        >>> for row in session.execute(stmt):
        ...     print(f"{row.Address.email_address} {row.Address.user.name}")
        SELECT user_account.id, user_account.name, user_account.fullname,
        address.id AS id_1, address.email_address, address.user_id
        FROM address JOIN user_account ON user_account.id = address.user_id
        WHERE user_account.name = ? ORDER BY address.id
        [...] ('pkrabs',)
        pearl.krabs@gmail.com pkrabs
        pearl@aol.com pkrabs

        >>> stmt = (
        ...     select(Address)
        ...     .join(Address.user)
        ...     .where(User.name == "pkrabs")
        ...     .options(joinedload(Address.user))
        ...     .order_by(Address.id)
        ... )
        >>> print(stmt)  # SELECT has a JOIN and LEFT OUTER JOIN unnecessarily
        SELECT address.id, address.email_address, address.user_id,
        user_account_1.id AS id_1, user_account_1.name, user_account_1.fullname
        FROM address JOIN user_account ON user_account.id = address.user_id
        LEFT OUTER JOIN user_account AS user_account_1 ON user_account_1.id = address.user_id
        WHERE user_account.name = :name_1 ORDER BY address.id

##### Augmenting Loader Strategy Paths

        >>> from sqlalchemy.orm import selectinload
        >>> stmt = (
        ...     select(User)
        ...     .options(
        ...         selectinload(
        ...             User.addresses.and_(~Address.email_address.endswith("sqlalchemy.org"))
        ...         )
        ...     )
        ...     .order_by(User.id)
        ...     .execution_options(populate_existing=True)
        ... )
        >>> for row in session.execute(stmt):
        ...     print(
        ...         f"{row.User.name}  ({', '.join(a.email_address for a in row.User.addresses)})"
        ...     )
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account ORDER BY user_account.id
        [...] ()
        SELECT address.user_id AS address_user_id, address.id AS address_id,
        address.email_address AS address_email_address
        FROM address
        WHERE address.user_id IN (?, ?, ?, ?, ?, ?)
        AND (address.email_address NOT LIKE '%' || ?)
        [...] (1, 2, 3, 4, 5, 6, 'sqlalchemy.org')
        spongebob  ()
        sandy  (sandy@squirrelpower.org)
        patrick  ()
        squidward  ()
        ehkrabs  ()
        pkrabs  (pearl.krabs@gmail.com, pearl@aol.com)

##### Raiseload

        class User(Base):
            __tablename__ = "user_account"

            # ... Column mappings

            addresses = relationship("Address", back_populates="user", lazy="raise_on_sql")


        class Address(Base):
            __tablename__ = "address"

            # ... Column mappings

            user = relationship("User", back_populates="addresses", lazy="raise_on_sql")

        u1 = s.execute(select(User)).scalars().first()
        u1.addresses
        sqlalchemy.exc.InvalidRequestError: 'User.addresses' is not available due to lazy='raise_on_sql'

        u1 = s.execute(select(User).options(selectinload(User.addresses))).scalars().first()

## ORM Querying Guide

<https://docs.sqlalchemy.org/en/14/orm/queryguide.html#orm-querying-guide>

### SELECT statements

        >>> from sqlalchemy import select
        >>> stmt = select(User).where(User.name == "spongebob")
        >>> result = session.execute(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        WHERE user_account.name = ?
        [...] ('spongebob',)
        >>> for user_obj in result.scalars():
        ...     print(f"{user_obj.name} {user_obj.fullname}")
        spongebob Spongebob Squarepants

#### Selecting ORM Entities and Attributes

        >>> result = session.execute(select(User).order_by(User.id))
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account ORDER BY user_account.id
        [...] ()
        >>> result.fetchone()
        (User(id=1, name='spongebob', fullname='Spongebob Squarepants'),)

        >>> result.scalars().all()

        [User(id=2, name='sandy', fullname='Sandy Cheeks'),
        User(id=3, name='patrick', fullname='Patrick Star'),
        User(id=4, name='squidward', fullname='Squidward Tentacles'),
        User(id=5, name='ehkrabs', fullname='Eugene H. Krabs')]

        >>> stmt = select(User, Address).join(User.addresses).order_by(User.id, Address.id)

        >>> for row in session.execute(stmt):
        ...     print(f"{row.User.name} {row.Address.email_address}")

        SELECT user_account.id, user_account.name, user_account.fullname,
        address.id AS id_1, address.user_id, address.email_address
        FROM user_account JOIN address ON user_account.id = address.user_id
        ORDER BY user_account.id, address.id
        [...] ()

        spongebob spongebob@sqlalchemy.org
        sandy sandy@sqlalchemy.org
        sandy squirrel@squirrelpower.org
        patrick pat999@aol.com
        squidward stentcl@sqlalchemy.org

#### Selecting Individual Attributes

        >>> result = session.execute(
        ...     select(User.name, Address.email_address)
        ...     .join(User.addresses)
        ...     .order_by(User.id, Address.id)
        ... )
        SELECT user_account.name, address.email_address
        FROM user_account JOIN address ON user_account.id = address.user_id
        ORDER BY user_account.id, address.id
        [...] ()

        >>> for row in result:
        ...     print(f"{row.name}  {row.email_address}")
        spongebob  spongebob@sqlalchemy.org
        sandy  sandy@sqlalchemy.org
        sandy  squirrel@squirrelpower.org
        patrick  pat999@aol.com
        squidward  stentcl@sqlalchemy.org

#### Grouping Selected Attributes with Bundles¶

        >>> from sqlalchemy.orm import Bundle
        >>> stmt = select(
        ...     Bundle("user", User.name, User.fullname), Bundle("email", Address.email_address)
        ... ).join_from(User, Address)
        >>> for row in session.execute(stmt):
        ...     print(f"{row.user.name} {row.user.fullname} {row.email.email_address}")
        SELECT user_account.name, user_account.fullname, address.email_address
        FROM user_account JOIN address ON user_account.id = address.user_id
        [...] ()
        spongebob Spongebob Squarepants spongebob@sqlalchemy.org
        sandy Sandy Cheeks sandy@sqlalchemy.org
        sandy Sandy Cheeks squirrel@squirrelpower.org
        patrick Patrick Star pat999@aol.com
        squidward Squidward Tentacles stentcl@sqlalchemy.org

#### Selecting ORM Aliases

        >>> from sqlalchemy.orm import aliased
        >>> u1 = aliased(User)
        >>> print(select(u1).order_by(u1.id))
        SELECT user_account_1.id, user_account_1.name, user_account_1.fullname
        FROM user_account AS user_account_1 ORDER BY user_account_1.id

        >>> from sqlalchemy.orm import aliased
        >>> u1 = aliased(User, name="u1")
        >>> stmt = select(u1).order_by(u1.id)
        >>> row = session.execute(stmt).first()
        SELECT u1.id, u1.name, u1.fullname
        FROM user_account AS u1 ORDER BY u1.id
        [...] ()
        >>> print(f"{row.u1.name}")
        spongebob

#### Getting ORM Results from Textual and Core Statements

        >>> from sqlalchemy import text
        >>> textual_sql = text("SELECT id, name, fullname FROM user_account ORDER BY id")
        >>> textual_sql = textual_sql.columns(User.id, User.name, User.fullname)

        >>> # using from_statement()
        >>> orm_sql = select(User).from_statement(textual_sql)
        >>> for user_obj in session.execute(orm_sql).scalars():
        ...     print(user_obj)
        SELECT id, name, fullname FROM user_account ORDER BY id
        [...] ()
        User(id=1, name='spongebob', fullname='Spongebob Squarepants')
        User(id=2, name='sandy', fullname='Sandy Cheeks')
        User(id=3, name='patrick', fullname='Patrick Star')
        User(id=4, name='squidward', fullname='Squidward Tentacles')
        User(id=5, name='ehkrabs', fullname='Eugene H. Krabs')

        >>> # using aliased() to select from a subquery
        >>> orm_subquery = aliased(User, textual_sql.subquery())
        >>> stmt = select(orm_subquery)
        >>> for user_obj in session.execute(stmt).scalars():
        ...     print(user_obj)
        SELECT anon_1.id, anon_1.name, anon_1.fullname
        FROM (SELECT id, name, fullname FROM user_account ORDER BY id) AS anon_1
        [...] ()
        User(id=1, name='spongebob', fullname='Spongebob Squarepants')
        User(id=2, name='sandy', fullname='Sandy Cheeks')
        User(id=3, name='patrick', fullname='Patrick Star')
        User(id=4, name='squidward', fullname='Squidward Tentacles')
        User(id=5, name='ehkrabs', fullname='Eugene H. Krabs')

#### Selecting Entities from Subqueries

        >>> inner_stmt = select(User).where(User.id < 7).order_by(User.id)
        >>> subq = inner_stmt.subquery()
        >>> aliased_user = aliased(User, subq)
        >>> stmt = select(aliased_user)
        >>> for user_obj in session.execute(stmt).scalars():
        ...     print(user_obj)
        SELECT anon_1.id, anon_1.name, anon_1.fullname
        FROM (SELECT user_account.id AS id, user_account.name AS name, user_account.fullname AS fullname
        FROM user_account
        WHERE user_account.id < ? ORDER BY user_account.id) AS anon_1
        [generated in ...] (7,)
        User(id=1, name='spongebob', fullname='Spongebob Squarepants')
        User(id=2, name='sandy', fullname='Sandy Cheeks')
        User(id=3, name='patrick', fullname='Patrick Star')
        User(id=4, name='squidward', fullname='Squidward Tentacles')
        User(id=5, name='ehkrabs', fullname='Eugene H. Krabs')

#### Selecting Entities from UNIONs and other set operations

        >>> from sqlalchemy import union_all
        >>> u = union_all(
        ...     select(User).where(User.id < 2), select(User).where(User.id == 3)
        ... ).order_by(User.id)
        >>> stmt = select(User).from_statement(u)
        >>> for user_obj in session.execute(stmt).scalars():
        ...     print(user_obj)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        WHERE user_account.id < ? UNION ALL SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        WHERE user_account.id = ? ORDER BY id
        [generated in ...] (2, 3)
        User(id=1, name='spongebob', fullname='Spongebob Squarepants')
        User(id=3, name='patrick', fullname='Patrick Star')

        >>> subq = union_all(
        ...     select(User).where(User.id < 2), select(User).where(User.id == 3)
        ... ).subquery()
        >>> user_alias = aliased(User, subq)
        >>> stmt = select(user_alias).order_by(user_alias.id)
        >>> for user_obj in session.execute(stmt).scalars():
        ...     print(user_obj)
        SELECT anon_1.id, anon_1.name, anon_1.fullname
        FROM (SELECT user_account.id AS id, user_account.name AS name, user_account.fullname AS fullname
        FROM user_account
        WHERE user_account.id < ? UNION ALL SELECT user_account.id AS id, user_account.name AS name, user_account.fullname AS fullname
        FROM user_account
        WHERE user_account.id = ?) AS anon_1 ORDER BY anon_1.id
        [generated in ...] (2, 3)
        User(id=1, name='spongebob', fullname='Spongebob Squarepants')
        User(id=3, name='patrick', fullname='Patrick Star')

#### Joins

The Select.join() and Select.join_from() methods are used to construct SQL JOINs against a SELECT statement.

#### Simple Relationship Joins

        >>> stmt = select(User).join(User.addresses)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account JOIN address ON user_account.id = address.user_id

#### Chaining Multiple Joins

        >>> stmt = select(User).join(User.orders).join(Order.items)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN user_order ON user_account.id = user_order.user_id
        JOIN order_items AS order_items_1 ON user_order.id = order_items_1.order_id
        JOIN item ON item.id = order_items_1.item_id

        >>> stmt = select(User).join(User.orders).join(Order.items).join(User.addresses)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN user_order ON user_account.id = user_order.user_id
        JOIN order_items AS order_items_1 ON user_order.id = order_items_1.order_id
        JOIN item ON item.id = order_items_1.item_id
        JOIN address ON user_account.id = address.user_id

#### Joins to a Target Entity or Selectable

        >>> stmt = select(User).join(Address)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account JOIN address ON user_account.id = address.user_id

#### Joins to a Target with an ON Clause

        >>> stmt = select(User).join(Address, User.id == Address.user_id)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account JOIN address ON user_account.id = address.user_id

        >>> stmt = select(User).join(Address, User.addresses)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account JOIN address ON user_account.id = address.user_id

        >>> a1 = aliased(Address)
        >>> a2 = aliased(Address)
        >>> stmt = (
        ...     select(User)
        ...     .join(a1, User.addresses)
        ...     .join(a2, User.addresses)
        ...     .where(a1.email_address == "ed@foo.com")
        ...     .where(a2.email_address == "ed@bar.com")
        ... )
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN address AS address_1 ON user_account.id = address_1.user_id
        JOIN address AS address_2 ON user_account.id = address_2.user_id
        WHERE address_1.email_address = :email_address_1
        AND address_2.email_address = :email_address_2

        >>> stmt = (
        ...     select(User)
        ...     .join(User.addresses.of_type(a1))
        ...     .join(User.addresses.of_type(a2))
        ...     .where(a1.email_address == "ed@foo.com")
        ...     .where(a2.email_address == "ed@bar.com")
        ... )
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN address AS address_1 ON user_account.id = address_1.user_id
        JOIN address AS address_2 ON user_account.id = address_2.user_id
        WHERE address_1.email_address = :email_address_1
        AND address_2.email_address = :email_address_2

#### Augmenting Built-in ON Clauses

        >>> stmt = select(User).join(User.addresses.and_(Address.email_address != "foo@bar.com"))
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN address ON user_account.id = address.user_id
        AND address.email_address != :email_address_1


#### Joining to Subqueries

        >>> subq = select(Address).where(Address.email_address == "pat999@aol.com").subquery()
        >>> stmt = select(User).join(subq, User.id == subq.c.user_id)
        >>> print(stmt)
        SELECT user_account.id, user_account.name, user_account.fullname
        FROM user_account
        JOIN (SELECT address.id AS id,
        address.user_id AS user_id, address.email_address AS email_address
        FROM address
        WHERE address.email_address = :email_address_1) AS anon_1
        ON user_account.id = anon_1.user_id

        >>> address_subq = aliased(Address, subq, name="address")
        >>> stmt = select(User, address_subq).join(address_subq)
        >>> for row in session.execute(stmt):
        ...     print(f"{row.User} {row.address}")
        SELECT user_account.id, user_account.name, user_account.fullname,
        anon_1.id AS id_1, anon_1.user_id, anon_1.email_address
        FROM user_account
        JOIN (SELECT address.id AS id,
        address.user_id AS user_id, address.email_address AS email_address
        FROM address
        WHERE address.email_address = ?) AS anon_1 ON user_account.id = anon_1.user_id
        [...] ('pat999@aol.com',)
        User(id=3, name='patrick', fullname='Patrick Star') Address(id=4, email_address='pat999@aol.com')

        >>> user_address_subq = (
        ...     select(User.id, User.name, Address.id, Address.email_address)
        ...     .join_from(User, Address)
        ...     .where(Address.email_address.in_(["pat999@aol.com", "squirrel@squirrelpower.org"]))
        ...     .subquery()
        ... )
        >>> user_alias = aliased(User, user_address_subq, name="user")
        >>> address_alias = aliased(Address, user_address_subq, name="address")
        >>> stmt = select(user_alias, address_alias).where(user_alias.name == "sandy")
        >>> for row in session.execute(stmt):
        ...     print(f"{row.user} {row.address}")
        SELECT anon_1.id, anon_1.name, anon_1.id_1, anon_1.email_address
        FROM (SELECT user_account.id AS id, user_account.name AS name, address.id AS id_1, address.email_address AS email_address
        FROM user_account JOIN address ON user_account.id = address.user_id
        WHERE address.email_address IN (?, ?)) AS anon_1
        WHERE anon_1.name = ?
        [...] ('pat999@aol.com', 'squirrel@squirrelpower.org', 'sandy')
        User(id=2, name='sandy', fullname='Sandy Cheeks') Address(id=3, email_address='squirrel@squirrelpower.org')

#### Controlling what to Join From

>>> stmt = select(Address).join_from(User, User.addresses).where(User.name == "sandy")
>>> print(stmt)
SELECT address.id, address.user_id, address.email_address
FROM user_account JOIN address ON user_account.id = address.user_id
WHERE user_account.name = :name_1

>>> stmt = select(Address).join_from(User, Address).where(User.name == "sandy")
>>> print(stmt)
SELECT address.id, address.user_id, address.email_address
FROM user_account JOIN address ON user_account.id = address.user_id
WHERE user_account.name = :name_1

>>> stmt = select(Address).select_from(User).join(Address).where(User.name == "sandy")
>>> print(stmt)
SELECT address.id, address.user_id, address.email_address
FROM user_account JOIN address ON user_account.id = address.user_id
WHERE user_account.name = :name_1

#### Special Relationship Operators

[Special Relationship Operators](#working-with-orm-related-objects)

#### ORM Execution Options

<https://docs.sqlalchemy.org/en/14/orm/queryguide.html#orm-execution-options>


#### ORM Update / Delete with Arbitrary WHERE clause

The Session.execute() method, in addition to handling ORM-enabled Select objects, can also accommodate ORM-enabled Update and Delete objects, which UPDATE or DELETE any number of database rows while also being able to synchronize the state of matching objects locally present in the Session. See the section UPDATE and DELETE with arbitrary WHERE clause for background on this feature.

#### Inspecting entities and columns from ORM-enabled SELECT and DML statements

>>> from pprint import pprint
>>> user_alias = aliased(User, name="user2")
>>> stmt = select(User, User.id, user_alias)
>>> pprint(stmt.column_descriptions)
[{'aliased': False,
    'entity': <class 'User'>,
    'expr': <class 'User'>,
    'name': 'User',
    'type': <class 'User'>},
    {'aliased': False,
    'entity': <class 'User'>,
    'expr': <....InstrumentedAttribute object at ...>,
    'name': 'id',
    'type': Integer()},
    {'aliased': True,
    'entity': <AliasedClass ...; User>,
    'expr': <AliasedClass ...; User>,
    'name': 'user2',
    'type': <class 'User'>}]

## Tutorials

### SQLAlchemy GROUP BY: A Comprehensive Guide

<https://www.slingacademy.com/article/sqlalchemy-group-by-comprehensive-guide/>

#### Setting Up the Environment

        from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
        from sqlalchemy.ext.declarative import declarative_base
        from sqlalchemy.orm import sessionmaker

        engine = create_engine('sqlite:///group_by.db', echo=False)
        Base = declarative_base()

        # Define a sample table
        class User(Base):
        __tablename__ = 'users'
        id = Column(Integer, primary_key=True)
        name = Column(String)
        age = Column(Integer)
        registration_date = Column(DateTime)

        Base.metadata.create_all(engine)

        # Create a session
        Session = sessionmaker(bind=engine)
        session = Session()

#### Simple GROUP BY Queries

mock data to work with:

        # Add sample users

        session.add_all([
        User(name='Alice', age=30, registration_date='2023-01-01'),
        User(name='Bob', age=40, registration_date='2023-01-02'),
        User(name='Charlie', age=30, registration_date='2023-01-03'),
        User(name='David', age=40, registration_date='2023-01-01'),
        ])
        session.commit()

how many users are of each age:

        from sqlalchemy import func

        # Group users by age and count each group
        users_grouped_by_age = session.query(User.age, func.count(User.id)).group_by(User.age).all()
        for age_group in users_grouped_by_age:
        print(f'Age: {age_group.age}, Count: {age_group[1]}')

#### Expanding the GROUP BY Query

find the average age of users who registered on the same date

        # Group users by registration date and calculate the average age
        avg_age_by_reg_date = session.query(User.registration_date, func.avg(User.age).label('average_age')).group_by(User.registration_date).all()
        for data in avg_age_by_reg_date:
        print(f'Date: {data.registration_date}, Average Age: {data.average_age:.2f}')

#### GROUP BY with JOIN Operations

introduce a new table to represent user purchases and then join this table with our users:

        # Define a new Purchases table
        class Purchase(Base):
        __tablename__ = 'purchases'
        id = Column(Integer, primary_key=True)
        user_id = Column(Integer)
        item = Column(String)
        price = Column(Integer)
        purchase_date = Column(DateTime)

        # Add some purchases
        session.add_all([
        Purchase(user_id=1, item='Book', price=20, purchase_date='2023-01-10'),
        Purchase(user_id=2, item='Pen', price=3, purchase_date='2023-01-10'),
        Purchase(user_id=1, item='Notebook', price=5, purchase_date='2023-01-11'),
        # ...add more purchases
        ])
        session.commit()

group the number of items purchased by each user:

        # Group purchases by user
        user_purchases = session.query(User.name, func.count(Purchase.id).label('total_purchases'))\
        .join(Purchase, User.id == Purchase.user_id)\
        .group_by(User.name)\
        .all()
        for purchase in user_purchases:
        print(f'User: {purchase.name}, Total Purchases: {purchase.total_purchases}')

#### Advanced GROUP BY with HAVING Clauses

identify users who have made purchases totaling over a certain amount:

        # Filter groups by the sum of purchases
        high_spenders = session.query(User.name, func.sum(Purchase.price).label('total_spent'))\
        .join(Purchase, User.id == Purchase.user_id)\
        .group_by(User.name)\
        .having(func.sum(Purchase.price) > 50)\
        .all()
        for spender in high_spenders:
        print(f'User: {spender.name}, Total Spent: {spender.total_spent}')