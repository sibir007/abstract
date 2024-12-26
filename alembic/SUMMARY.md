# alembic

## Tutorial

<https://alembic.sqlalchemy.org/en/latest/tutorial.html>

### Installation

```sh
$ cd /path/to/your/project
$ virtualenv .venv
$ /path/to/your/project/.venv/bin/pip install alembic
```

### The Migration Environment

```sh
yourproject/ # root of your application’s source code, or some directory within it
    alembic/ # home of the migration environment
        env.py # Python script that is run whenever the alembic migration tool is invoked
        README
        script.py.mako #  a Mako template file which is used to generate new migration scripts
        versions/ # directory holds the individual version scripts
            3512b954651e_add_account.py
            2b1ae634e5cd_add_order_id.py
            3adcc9a56557_rename_username_field.py
```

### Creating an Environment

```sh
$ cd /path/to/yourproject
$ source /path/to/yourproject/.venv/bin/activate   # assuming a local virtualenv
$ alembic init alembic
Creating directory /path/to/yourproject/alembic...done
Creating directory /path/to/yourproject/alembic/versions...done
Generating /path/to/yourproject/alembic.ini...done
Generating /path/to/yourproject/alembic/env.py...done
Generating /path/to/yourproject/alembic/README...done
Generating /path/to/yourproject/alembic/script.py.mako...done
Please edit configuration/connection/logging settings in
'/path/to/yourproject/alembic.ini' before proceeding.
```

Alembic also includes other environment templates. These can be listed out using the list_templates command:

```sh
$ alembic list_templates
Available templates:

generic - Generic single-database configuration.
async - Generic single-database configuration with an async dbapi.
multidb - Rudimentary multi-database configuration.

Templates are used via the 'init' command, e.g.:

  alembic init --template generic ./scripts
```

### Editing the .ini File

Alembic placed a file `alembic.ini` into the current directory. This is a file that the `alembic` script looks for when invoked. This file can exist in a different directory, with the location to it specified by either the `--config` option for the `alembic` runner or the `ALEMBIC_CONFIG` environment variable (the former takes precedence).

### Create a Migration Script

```sh
$ alembic revision -m "create account table"
Generating /path/to/yourproject/alembic/versions/1975ea83b712_create_accoun
t_table.py...done
```

We can then add some directives to our script, suppose adding a new table account:

```py
def upgrade():
    op.create_table(
        'account',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('description', sa.Unicode(200)),
    )

def downgrade():
    op.drop_table('account')
```

### Running our First Migration

```sh
$ alembic upgrade head
INFO  [alembic.context] Context class PostgresqlContext.
INFO  [alembic.context] Will assume transactional DDL.
INFO  [alembic.context] Running upgrade None -> 1975ea83b712
```

The process which occurred here included that Alembic first checked if the database had a table called alembic_version, and if not, created it. It looks in this table for the current version, if any, and then calculates the path from this version to the version requested, in this case head, which is known to be 1975ea83b712. It then invokes the upgrade() method in each file to get to the target revision.

### Running our Second Migration

Let’s do another one so we have some things to play with. We again create a revision file:

```sh
$ alembic revision -m "Add a column"
Generating /path/to/yourapp/alembic/versions/ae1027a6acf_add_a_column.py...
done
```

Let’s edit this file and add a new column to the account table:

```py
"""Add a column

Revision ID: ae1027a6acf
Revises: 1975ea83b712
Create Date: 2011-11-08 12:37:36.714947

"""

# revision identifiers, used by Alembic.
revision = 'ae1027a6acf'
down_revision = '1975ea83b712'

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('account', sa.Column('last_transaction_date', sa.DateTime))

def downgrade():
    op.drop_column('account', 'last_transaction_date')
```

Running again to head:

```sh
$ alembic upgrade head
INFO  [alembic.context] Context class PostgresqlContext.
INFO  [alembic.context] Will assume transactional DDL.
INFO  [alembic.context] Running upgrade 1975ea83b712 -> ae1027a6acf
```

We’ve now added the last_transaction_date column to the database.

### Partial Revision Identifiers

Any time we need to refer to a revision number explicitly, we have the option to use a partial number. As long as this number uniquely identifies the version, it may be used in any command in any place that version numbers are accepted:

```sh
$ alembic upgrade ae1
```

Above, we use ae1 to refer to revision ae1027a6acf. Alembic will stop and let you know if more than one version starts with that prefix.

### Relative Migration Identifiers

Relative upgrades/downgrades are also supported. To move two versions from the current, a decimal value “+N” can be supplied:

`$ alembic upgrade +2`

Negative values are accepted for downgrades:

`$ alembic downgrade -1`
Relative identifiers may also be in terms of a specific revision. For example, to upgrade to revision ae1027a6acf plus two additional steps:

`$ alembic upgrade ae10+2`

### Getting Information

With a few revisions present we can get some information about the state of things.

First we can view the current revision:

```sh
$ alembic current
INFO  [alembic.context] Context class PostgresqlContext.
INFO  [alembic.context] Will assume transactional DDL.
Current revision for postgresql://scott:XXXXX@localhost/test: 1975ea83b712 -> ae1027a6acf (head), Add a column
```

`head` is displayed only if the revision identifier for this database matches the `head` revision.

We can also view history with `alembic history`; the `--verbose` option (accepted by several commands, including history, current, heads and branches) will show us full information about each revision:

```sh
$ alembic history --verbose

Rev: ae1027a6acf (head)
Parent: 1975ea83b712
Path: /path/to/yourproject/alembic/versions/ae1027a6acf_add_a_column.py

    add a column

    Revision ID: ae1027a6acf
    Revises: 1975ea83b712
    Create Date: 2014-11-20 13:02:54.849677

Rev: 1975ea83b712
Parent: <base>
Path: /path/to/yourproject/alembic/versions/1975ea83b712_add_account_table.py

    create account table

    Revision ID: 1975ea83b712
    Revises:
    Create Date: 2014-11-20 13:02:46.257104
```

