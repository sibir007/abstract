# FASTAPI

## Tutorial - User Guide 

### First Steps

```py
# main.py

from fastapi import FastAPI #Step 1: import FastAPI

app = FastAPI() #Step 2: create a FastAPI "instance"


@app.get("/") #Step 3: create a path operation
async def root(): # Step 4: define the path operation function
    return {"message": "Hello World"} # Step 5: return the content
```

```sh
fastapi dev main.py
INFO     Using path main.py
INFO     Resolved absolute path /home/user/code/awesomeapp/main.py
INFO     Searching for package file structure from directories with __init__.py files
...
```

Open your browser at <http://127.0.0.1:8000>

Check the openapi.json¶

If you are curious about how the raw OpenAPI schema looks like, FastAPI automatically generates a JSON (schema) with the descriptions of all your API.

You can see it directly at: http://127.0.0.1:8000/openapi.json.

It will show a JSON starting with something like:

```json
{
    "openapi": "3.1.0",
    "info": {
        "title": "FastAPI",
        "version": "0.1.0"
    },
    "paths": {
        "/items/": {
            "get": {
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {
                            "application/json": {



...
```

Operation

"Operation" here refers to one of the HTTP "methods".

You can also use the other operations:

- @app.post()
- @app.put()
- @app.delete()

And the more exotic ones:

- @app.options()
- @app.head()
- @app.patch()
- @app.trace()

### Path Parameters

```py
from fastapi import FastAPI

app = FastAPI()
@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}
```

#### Path parameters with types

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

#### Data conversion

<http://127.0.0.1:8000/items/3>

```json
{"item_id":3}
```

#### Data validation

<http://127.0.0.1:8000/items/foo> or <http://127.0.0.1:8000/items/4.2>

```json
  "detail": [
    {
      "type": "int_parsing",
      "loc": [
        "path",
        "item_id"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "foo",
      "url": "https://errors.pydantic.dev/2.1/v/int_parsing"
    }
  ]
}
```

#### Documentation

<http://127.0.0.1:8000/docs>

<http://127.0.0.1:8000/redoc>

#### Pydantic

All the data validation

#### Order matters

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}


@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}
```

Otherwise, the path for `/users/{user_id}` would match also for `/users/me`, "thinking" that it's receiving a parameter user_id with a value of "me".

Similarly, you cannot redefine a path operation:

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/users")
async def read_users():
    return ["Rick", "Morty"]


@app.get("/users")
async def read_users2():
    return ["Bean", "Elfo"]
```

The first one will always be used since the path matches first.

#### Predefined values

```py
from enum import Enum

from fastapi import FastAPI


class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


app = FastAPI()


@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}

    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}

    return {"model_name": model_name, "message": "Have some residuals"}

```

In your client you will get a JSON response like:

```json
{
  "model_name": "alexnet",
  "message": "Deep Learning FTW!"
}
```

#### Path parameters containing paths

```py
from fastapi import FastAPI

app = FastAPI()
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}
```

### Query Parameters

```py
from fastapi import FastAPI

app = FastAPI()

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
```

For example, in the URL:

```uri
http://127.0.0.1:8000/items/?skip=0&limit=10
```

...the query parameters are:

- skip: with a value of 0
- limit: with a value of 10

So, going to the URL:

```url
http://127.0.0.1:8000/items/
```

would be the same as going to:

```url
http://127.0.0.1:8000/items/?skip=0&limit=10
```

#### Optional parameters

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}

```

#### Query parameter type conversion

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None, short: bool = False):
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item

```

In this case, if you go to:

`http://127.0.0.1:8000/items/foo?short=1`

or

`http://127.0.0.1:8000/items/foo?short=True`

or

`http://127.0.0.1:8000/items/foo?short=true`

or

`http://127.0.0.1:8000/items/foo?short=on`

or

`http://127.0.0.1:8000/items/foo?short=yes`

or any other case variation (uppercase, first letter in uppercase, etc), your function will see the parameter short with a bool value of `True`. Otherwise as `False`.

#### Multiple path and query parameters

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(
    user_id: int, item_id: str, q: str | None = None, short: bool = False
):
    item = {"item_id": item_id, "owner_id": user_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```

#### Required query parameters

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_user_item(item_id: str, needy: str):
    item = {"item_id": item_id, "needy": needy}
    return item
```

If you open in your browser a URL like:

`http://127.0.0.1:8000/items/foo-item`

...without adding the required parameter needy, you will see an error like:

```json
{
  "detail": [
    {
      "type": "missing",
      "loc": [
        "query",
        "needy"
      ],
      "msg": "Field required",
      "input": null,
      "url": "https://errors.pydantic.dev/2.1/v/missing"
    }
  ]
}
```

some parameters as required, some as having a default value, and some entirely optional:

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/{item_id}")
async def read_user_item(
    item_id: str, needy: str, skip: int = 0, limit: int | None = None
):
    item = {"item_id": item_id, "needy": needy, "skip": skip, "limit": limit}
    return item

```

### Request Body

Your API almost always has to send a response body. But clients don't necessarily need to send request bodies all the time, sometimes they only request a path, maybe with some query parameters, but don't send a body.

```py
from fastapi import FastAPI
from pydantic import BaseModel # Import Pydantic's BaseModel


class Item(BaseModel): # Create your data model
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


app = FastAPI()


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, q: str | None = None): # Declare model as a parameter  # Request body + path + query parameters
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result
# Editor support
```

this model above declares a JSON "object" (or Python dict) like:

```json
{
    "name": "Foo",
    "description": "An optional description",
    "price": 45.2,
    "tax": 3.5
}
```

...as description and tax are optional (with a default value of None), this JSON "object" would also be valid:

```json
{
    "name": "Foo",
    "price": 45.2
}
```

### Query Parameters and String Validations

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/")
async def read_items(q: str | None = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
  ```

The query parameter q is of type Union[str, None] (or str | None in Python 3.10), that means that it's of type str but could also be None, and indeed, the default value is None, so FastAPI will know it's not required.

#### Additional validation

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(max_length=50)] = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

We had this type annotation:

`q: str | None = None`

What we will do is wrap that with Annotated, so it becomes:

`q: Annotated[str | None] = None`

Both of those versions mean the same thing, q is a parameter that can be a str or None, and by default, it is None.

`q: Annotated[str | None, Query(max_length=50)`

Default value is still None, so the parameter is still optional. We are telling FastAPI that we want it to have additional validation for this value, we want it to have maximum 50 characters

`q: str | None = Query(default=None)`

...makes the parameter optional, with a default value of None, the same as:

`q: str | None = None`

Then, we can pass more parameters to Query. In this case, the max_length parameter that applies to strings:

`q: Union[str, None] = Query(default=None, max_length=50)`

Keep in mind that when using Query inside of Annotated you cannot use the default parameter for Query.

Instead use the actual default value of the function parameter. Otherwise, it would be inconsistent.

For example, this is not allowed:

`q: Annotated[str, Query(default="rick")] = "morty"`

...because it's not clear if the default value should be "rick" or "morty".

So, you would use (preferably):

`q: Annotated[str, Query()] = "rick"`

...or in older code bases you will find:

`q: str = Query(default="rick")`

#### Add more validations

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(
    q: Annotated[str | None, Query(min_length=3, max_length=50)] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Add regular expressions

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(
    q: Annotated[
        str | None, Query(min_length=3, max_length=50, pattern="^fixedquery$")
    ] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

- `^`: starts with the following characters, doesn't have characters before.
- `fixedquery`: has the exact value fixedquery.
- `$`: ends there, doesn't have any more characters after fixedquery.

Before Pydantic version 2 and before FastAPI 0.100.0, the parameter was called regex instead of pattern, but it's now deprecated.

#### Default values

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str, Query(min_length=3)] = "fixedquery"):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Required parameters

`q: str`

So, when you need to declare a value as required while using Query, you can simply not declare a default value:

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str, Query(min_length=3)]):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Required with Ellipsis (...)

There's an alternative way to explicitly declare that a value is required. You can set the default to the literal value `...`

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str, Query(min_length=3)] = ...):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

This will let FastAPI know that this parameter is required.

#### Required, can be None

You can declare that a parameter can accept None, but that it's still required. This would force clients to send a value, even if the value is None.

To do that, you can declare that None is a valid type but still use ... as the default:

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(min_length=3)] = ...):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Query parameter list / multiple values

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[list[str] | None, Query()] = None):
    query_items = {"q": q}
    return query_items
```

Then, with a URL like:

`http://localhost:8000/items/?q=foo&q=bar`

So, the response to that URL would be:

```json
{
  "q": [
    "foo",
    "bar"
  ]
}
```

#### Query parameter list / multiple values with defaults

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[list[str], Query()] = ["foo", "bar"]):
    query_items = {"q": q}
    return query_items
```

If you go to:

`http://localhost:8000/items/`

the default of q will be: ["foo", "bar"] and your response will be:

```json
{
  "q": [
    "foo",
    "bar"
  ]
}
```

You can also use list directly instead of List[str] (or list[str] in Python 3.9+):

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[list, Query()] = []):
    query_items = {"q": q}
    return query_items
```

Keep in mind that in this case, FastAPI won't check the contents of the list.

For example, List[int] would check (and document) that the contents of the list are integers. But list alone wouldn't.

#### Declare more metadata

You can add a `title`:

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(
    q: Annotated[str | None, Query(title="Query string", min_length=3)] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results

```

And a `description`:

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()
@app.get("/items/")
async def read_items(
    q: Annotated[
        str | None,
        Query(
            title="Query string",
            description="Query string for the items to search in the database that have a good match",
            min_length=3,
        ),
    ] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Alias parameters

`http://127.0.0.1:8000/items/?item-query=foobaritems`

`item-query` is not a valid Python variable name.

Then you can declare an alias, and that alias is what will be used to find the parameter value:

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(alias="item-query")] = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Deprecating parameters

Now let's say you don't like this parameter anymore.

You have to leave it there a while because there are clients using it, but you want the docs to clearly show it as `deprecated`.

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(
    q: Annotated[
        str | None,
        Query(
            alias="item-query",
            title="Query string",
            description="Query string for the items to search in the database that have a good match",
            min_length=3,
            max_length=50,
            pattern="^fixedquery$",
            deprecated=True,
        ),
    ] = None,
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

#### Exclude parameters from OpenAPI

To exclude a query parameter from the generated OpenAPI schema (and thus, from the automatic documentation systems), set the parameter `include_in_schema` of `Query` to `Fals`

```py
from typing import Annotated

from fastapi import FastAPI, Query

app = FastAPI()


@app.get("/items/")
async def read_items(
    hidden_query: Annotated[str | None, Query(include_in_schema=False)] = None,
):
    if hidden_query:
        return {"hidden_query": hidden_query}
    else:
        return {"hidden_query": "Not found"}
```

### Path Parameters and Numeric Validations

#### Import Path

```py
from typing import Annotated  # import Path from fastapi, and import Annotated:

from fastapi import FastAPI, Path, Query

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get")],
    q: Annotated[str | None, Query(alias="item-query")] = None,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

#### Declare metadata

You can declare all the same parameters as for Query.

```py
from typing import Annotated

from fastapi import FastAPI, Path, Query

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get")],
    q: Annotated[str | None, Query(alias="item-query")] = None,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

#### Order the parameters as you need

```py
from fastapi import FastAPI, Path

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(q: str, item_id: int = Path(title="The ID of the item to get")):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

you use Annotated, you won't have this problem, it won't matter as you're not using the function parameter default values for Query() or Path().

```py
from typing import Annotated

from fastapi import FastAPI, Path

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    q: str, item_id: Annotated[int, Path(title="The ID of the item to get")]
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results

```

#### Order the parameters as you need, tricks

<https://fastapi.tiangolo.com/tutorial/path-params-numeric-validations/#order-the-parameters-as-you-need-tricks>

#### Number validations: greater than or equal

```py
from typing import Annotated

from fastapi import FastAPI, Path

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get", ge=1)], q: str
): # ge=1, item_id will need to be an integer number "greater than or equal" to 1
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

#### Number validations: greater than and less than or equal

```py
from typing import Annotated

from fastapi import FastAPI, Path

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item to get", gt=0, le=1000)],
    q: str,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

#### Number validations: floats, greater than and less than

```py
from typing import Annotated

from fastapi import FastAPI, Path, Query

app = FastAPI()


@app.get("/items/{item_id}")
async def read_items(
    *,
    item_id: Annotated[int, Path(title="The ID of the item to get", ge=0, le=1000)],
    q: str,
    size: Annotated[float, Query(gt=0, lt=10.5)],
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    if size:
        results.update({"size": size})
    return results
```

### Query Parameter Models

#### Query Parameters with a Pydantic Model

```py
from typing import Annotated, Literal

from fastapi import FastAPI, Query
from pydantic import BaseModel, Field

app = FastAPI()


class FilterParams(BaseModel):
    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
    order_by: Literal["created_at", "updated_at"] = "created_at"
    tags: list[str] = []


@app.get("/items/")
async def read_items(filter_query: Annotated[FilterParams, Query()]):
    return filter_query
```

FastAPI will extract the data for each field from the query parameters in the request and give you the Pydantic model you defined.

#### Forbid Extra Query Parameters

```py
from typing import Annotated, Literal

from fastapi import FastAPI, Query
from pydantic import BaseModel, Field

app = FastAPI()


class FilterParams(BaseModel):
    model_config = {"extra": "forbid"}

    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
    order_by: Literal["created_at", "updated_at"] = "created_at"
    tags: list[str] = []


@app.get("/items/")
async def read_items(filter_query: Annotated[FilterParams, Query()]):
    return filter_query
```

If a client tries to send some extra data in the query parameters, they will receive an error response.

For example, if the client tries to send a tool query parameter with a value of `plumbus`, like:

`https://example.com/items/?limit=10&tool=plumbus`

They will receive an error response telling them that the query parameter tool is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["query", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus"
        }
    ]
}
```

### Body - Multiple Parameters

#### Mix Path, Query and body parameters

```py
from typing import Annotated

from fastapi import FastAPI, Path
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(
    item_id: Annotated[int, Path(title="The ID of the item to get", ge=0, le=1000)],
    q: str | None = None,
    item: Item | None = None,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    if item:
        results.update({"item": item})
    return results
```

Notice that, in this case, the item that would be taken from the body is optional. As it has a None default value.

In the previous example, the path operations would expect a JSON body with the attributes of an Item, like:

```py
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2
}
```

#### Multiple body parameters

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


class User(BaseModel):
    username: str
    full_name: str | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, user: User):
    results = {"item_id": item_id, "item": item, "user": user}
    return results
```

it will then use the parameter names as keys (field names) in the body, and expect a body like:

```py
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    }
}
```

#### Singular values in body

```py
from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


class User(BaseModel):
    username: str
    full_name: str | None = None


@app.put("/items/{item_id}")
async def update_item(
    item_id: int, item: Item, user: User, importance: Annotated[int, Body()]
):
    results = {"item_id": item_id, "item": item, "user": user, "importance": importance}
    return results
```

In this case, FastAPI will expect a body like:

```py
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    },
    "importance": 5
}
```

#### Multiple body params and query

```py
from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


class User(BaseModel):
    username: str
    full_name: str | None = None


@app.put("/items/{item_id}")
async def update_item(
    *,
    item_id: int,
    item: Item,
    user: User,
    importance: Annotated[int, Body(gt=0)],
    q: str | None = None,
):
    results = {"item_id": item_id, "item": item, "user": user, "importance": importance}
    if q:
        results.update({"q": q})
    return results
```

Body also has all the same extra validation and metadata parameters as Query,Path and others you will see later.

#### Embed a single body parameter

```py
from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Annotated[Item, Body(embed=True)]):
    results = {"item_id": item_id, "item": item}
    return results
```

In this case FastAPI will expect a body like:

```json
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    }
}
```

instead of:

```json
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2
}
```

### Body - Fields

The same way you can declare additional validation and metadata in path operation function parameters with Query, Path and Body, you can declare validation and metadata inside of Pydantic models using Pydantic's Field

```py
from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel, Field # Import Field

app = FastAPI()


class Item(BaseModel): # Declare model attributes
    name: str
    description: str | None = Field(
        default=None, title="The description of the item", max_length=300
    )
    price: float = Field(gt=0, description="The price must be greater than zero")
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Annotated[Item, Body(embed=True)]):
    results = {"item_id": item_id, "item": item}
    return results
```

Actually, Query, Path and others you'll see next create objects of subclasses of a common Param class, which is itself a subclass of Pydantic's FieldInfo class.

And Pydantic's Field returns an instance of FieldInfo as well.

Body also returns objects of a subclass of FieldInfo directly. And there are others you will see later that are subclasses of the Body class.

Remember that when you import Query, Path, and others from fastapi, those are actually functions that return special classes.

Notice how each model's attribute with a type, default value and Field has the same structure as a path operation function's parameter, with Field instead of Path, Query and Body.

### Body - Nested Models

#### List fields

```py


from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list = []


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results

```

This will make tags be a list, although it doesn't declare the type of the elements of the list.

#### Import typing's List

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

we can make tags be specifically a "list of strings"

#### Set types

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

With this, even if you receive a request with duplicate data, it will be converted to a set of unique items.

#### Nested Models

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Image(BaseModel):
    url: str
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    image: Image | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

```json
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": ["rock", "metal", "bar"],
    "image": {
        "url": "http://example.com/baz.jpg",
        "name": "The Foo live"
    }
}
```

#### Special types and validation

```py
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl # To see all the options you have, checkout Pydantic's Type Overview https://docs.pydantic.dev/latest/concepts/types/

app = FastAPI()


class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    image: Image | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

#### Attributes with lists of submodels

```py
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()


class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    images: list[Image] | None = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

This will expect (convert, validate, document, etc.) a JSON body like:

```json
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": [
        "rock",
        "metal",
        "bar"
    ],
    "images": [
        {
            "url": "http://example.com/baz.jpg",
            "name": "The Foo live"
        },
        {
            "url": "http://example.com/dave.jpg",
            "name": "The Baz"
        }
    ]
}
```

#### Deeply nested models

```py
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()


class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    images: list[Image] | None = None


class Offer(BaseModel):
    name: str
    description: str | None = None
    price: float
    items: list[Item]


@app.post("/offers/")
async def create_offer(offer: Offer):
    return offer
```

Notice how Offer has a list of Items, which in turn have an optional list of Images

#### Bodies of pure lists

If the top level value of the JSON body you expect is a JSON array (a Python list), you can declare the type in the parameter of the function, the same as in Pydantic models:

```py
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()


class Image(BaseModel):
    url: HttpUrl
    name: str


@app.post("/images/multiple/")
async def create_multiple_images(images: list[Image]):
    return images
```

#### Bodies of arbitrary dicts

This would be useful if you want to receive keys that you don't already know.

```py


from fastapi import FastAPI

app = FastAPI()


@app.post("/index-weights/")
async def create_index_weights(weights: dict[int, float]):
    return weights

```

### Declare Request Example Data

#### Extra JSON Schema data in Pydantic models

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Foo",
                    "description": "A very nice Item",
                    "price": 35.4,
                    "tax": 3.2,
                }
            ]
        }
    }

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results

```

#### Field additional arguments

```py
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()


class Item(BaseModel):
    name: str = Field(examples=["Foo"])
    description: str | None = Field(default=None, examples=["A very nice Item"])
    price: float = Field(examples=[35.4])
    tax: float | None = Field(default=None, examples=[3.2])


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
```

#### examples in JSON Schema - OpenAP

When using any of:

- `Path()`
- `Query()`
- `Header()`
- `Cookie()`
- `Body()`
- `Form()`
- `File()`

you can also declare a group of examples with additional information that will be added to their JSON Schemas inside of OpenAPI.

Here we pass examples containing one example of the data expected in Body():

```py

from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(
    item_id: int,
    item: Annotated[
        Item,
        Body(
            examples=[
                {
                    "name": "Foo",
                    "description": "A very nice Item",
                    "price": 35.4,
                    "tax": 3.2,
                }
            ],
        ),
    ],
):
    results = {"item_id": item_id, "item": item}
    return results
```

You can of course also pass multiple examples:

```py
from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(
    *,
    item_id: int,
    item: Annotated[
        Item,
        Body(
            examples=[
                {
                    "name": "Foo",
                    "description": "A very nice Item",
                    "price": 35.4,
                    "tax": 3.2,
                },
                {
                    "name": "Bar",
                    "price": "35.4",
                },
                {
                    "name": "Baz",
                    "price": "thirty five point four",
                },
            ],
        ),
    ],
):
    results = {"item_id": item_id, "item": item}
    return results
```

#### OpenAPI-specific examples

```py


from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.put("/items/{item_id}")
async def update_item(
    *,
    item_id: int,
    item: Annotated[
        Item,
        Body(
            openapi_examples={
                "normal": {
                    "summary": "A normal example",
                    "description": "A **normal** item works correctly.",
                    "value": {
                        "name": "Foo",
                        "description": "A very nice Item",
                        "price": 35.4,
                        "tax": 3.2,
                    },
                },
                "converted": {
                    "summary": "An example with converted data",
                    "description": "FastAPI can convert price `strings` to actual `numbers` automatically",
                    "value": {
                        "name": "Bar",
                        "price": "35.4",
                    },
                },
                "invalid": {
                    "summary": "Invalid data is rejected with an error",
                    "value": {
                        "name": "Baz",
                        "price": "thirty five point four",
                    },
                },
            },
        ),
    ],
):
    results = {"item_id": item_id, "item": item}
    return results

```

### Extra Data Types 

Other data types¶

Here are some of the additional data types you can use:

- UUID:
  - A standard "Universally Unique Identifier", common as an ID in many databases and systems.
  - In requests and responses will be represented as a str.
- datetime.datetime:
  - A Python datetime.datetime.
  - In requests and responses will be represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00.
- datetime.date:
  - Python datetime.date.
  - In requests and responses will be represented as a str in ISO 8601 format, like: 2008-09-15.
- datetime.time:
  - A Python datetime.time.
  - In requests and responses will be represented as a str in ISO 8601 format, like: 14:23:55.003.
- datetime.timedelta:
  - A Python datetime.timedelta.
  - In requests and responses will be represented as a float of total seconds.
  - Pydantic also allows representing it as a "ISO 8601 time diff encoding", [see the docs for more info](https://docs.pydantic.dev/latest/concepts/serialization/#custom-serializers).
- frozenset:
  - In requests and responses, treated the same as a set:
      -In requests, a list will be read, eliminating duplicates and converting it to a set.
      -In responses, the set will be converted to a list.
      -The generated schema will specify that the set values are unique (using JSON Schema's uniqueItems).
- bytes:
  - Standard Python bytes.
  - In requests and responses will be treated as str.
  - The generated schema will specify that it's a str with binary "format".
- Decimal:
  - Standard Python Decimal.
  - In requests and responses, handled the same as a float.
You can check all the valid Pydantic data types here: [Pydantic data types](https://docs.pydantic.dev/latest/usage/types/types/).

#### Example

```py
from datetime import datetime, time, timedelta
from typing import Annotated
from uuid import UUID

from fastapi import Body, FastAPI

app = FastAPI()


@app.put("/items/{item_id}")
async def read_items(
    item_id: UUID,
    start_datetime: Annotated[datetime, Body()],
    end_datetime: Annotated[datetime, Body()],
    process_after: Annotated[timedelta, Body()],
    repeat_at: Annotated[time | None, Body()] = None,
):
    start_process = start_datetime + process_after # Note that the parameters inside the function have their natural data type, and you can, for example, perform normal date manipulations
    duration = end_datetime - start_process
    return {
        "item_id": item_id,
        "start_datetime": start_datetime,
        "end_datetime": end_datetime,
        "process_after": process_after,
        "repeat_at": repeat_at,
        "start_process": start_process,
        "duration": duration,
    }
```

### Cookie Parameters

```py
from typing import Annotated

from fastapi import Cookie, FastAPI

app = FastAPI()


@app.get("/items/")
async def read_items(ads_id: Annotated[str | None, Cookie()] = None):
    return {"ads_id": ads_id}
```

### Header Parameters

```py
from typing import Annotated

from fastapi import FastAPI, Header

app = FastAPI()


@app.get("/items/")
async def read_items(user_agent: Annotated[str | None, Header()] = None):
    return {"User-Agent": user_agent}
```

Header is a "sister" class of Path, Query and Cookie. It also inherits from the same common Param class.

But remember that when you import Query, Path, Header, and others from fastapi, those are actually functions that return special classes.

#### Automatic conversion¶

Header has a little extra functionality on top of what Path, Query and Cookie provide.

Most of the standard headers are separated by a "hyphen" character, also known as the "minus symbol" (-).

But a variable like user-agent is invalid in Python.

So, by default, Header will convert the parameter names characters from underscore (_) to hyphen (-) to extract and document the headers.

Also, HTTP headers are case-insensitive, so, you can declare them with standard Python style (also known as "snake_case").

So, you can use user_agent as you normally would in Python code, instead of needing to capitalize the first letters as User_Agent or something similar.

If for some reason you need to disable automatic conversion of underscores to hyphens, set the parameter convert_underscores of Header to False:

```py
from typing import Annotated

from fastapi import FastAPI, Header

app = FastAPI()


@app.get("/items/")
async def read_items(
    strange_header: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    return {"strange_header": strange_header}
```

#### Duplicate headers

It is possible to receive duplicate headers. That means, the same header with multiple values.

You can define those cases using a list in the type declaration.

You will receive all the values from the duplicate header as a Python list.

For example, to declare a header of X-Token that can appear more than once, you can write:

```py
from typing import Annotated

from fastapi import FastAPI, Header

app = FastAPI()


@app.get("/items/")
async def read_items(x_token: Annotated[list[str] | None, Header()] = None):
    return {"X-Token values": x_token}
```

If you communicate with that path operation sending two HTTP headers like:

```
X-Token: foo
X-Token: bar
```

The response would be like:

```json
{
    "X-Token values": [
        "bar",
        "foo"
    ]
}
```

### Cookie Parameter Models

If you have a group of cookies that are related, you can create a Pydantic model to declare them

```py
from typing import Annotated

from fastapi import Cookie, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Cookies(BaseModel):
    session_id: str
    fatebook_tracker: str | None = None
    googall_tracker: str | None = None


@app.get("/items/")
async def read_items(cookies: Annotated[Cookies, Cookie()]):
    return cookies
```

Have in mind that, as browsers handle cookies in special ways and behind the scenes, they don't easily allow JavaScript to touch them.

If you go to the API docs UI at /docs you will be able to see the documentation for cookies for your path operations.

But even if you fill the data and click "Execute", because the docs UI works with JavaScript, the cookies won't be sent, and you will see an error message as if you didn't write any values.

#### Forbid Extra Cookies

```py
from typing import Annotated, Union

from fastapi import Cookie, FastAPI
from pydantic import BaseModel

app = FastAPI()


class Cookies(BaseModel):
    model_config = {"extra": "forbid"}

    session_id: str
    fatebook_tracker: Union[str, None] = None
    googall_tracker: Union[str, None] = None


@app.get("/items/")
async def read_items(cookies: Annotated[Cookies, Cookie()]):
    return cookies
```

If a client tries to send some extra cookies, they will receive an error response.

### Header Parameter Models

```py
from typing import Annotated

from fastapi import FastAPI, Header
from pydantic import BaseModel

app = FastAPI()


class CommonHeaders(BaseModel):
    host: str
    save_data: bool
    if_modified_since: str | None = None
    traceparent: str | None = None
    x_tag: list[str] = []


@app.get("/items/")
async def read_items(headers: Annotated[CommonHeaders, Header()]):
    return headers
```

#### Forbid Extra Headers

```py
from typing import Annotated

from fastapi import FastAPI, Header
from pydantic import BaseModel

app = FastAPI()


class CommonHeaders(BaseModel):
    model_config = {"extra": "forbid"}

    host: str
    save_data: bool
    if_modified_since: str | None = None
    traceparent: str | None = None
    x_tag: list[str] = []


@app.get("/items/")
async def read_items(headers: Annotated[CommonHeaders, Header()]):
    return headers
```

If a client tries to send some extra headers, they will receive an error response.

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["header", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus",
        }
    ]
}
```

### Response Model - Return Type

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []


@app.post("/items/")
async def create_item(item: Item) -> Item:
    return item


@app.get("/items/")
async def read_items() -> list[Item]:
    return [
        Item(name="Portal Gun", price=42.0),
        Item(name="Plumbus", price=32.0),
    ]
```

It will limit and filter the output data to what is defined in the return type.

#### response_model Parameter

There are some cases where you need or want to return some data that is not exactly what the type declares.

For example, you could want to return a dictionary or a database object, but declare it as a Pydantic model. This way the Pydantic model would do all the data documentation, validation, etc. for the object that you returned (e.g. a dictionary or database object).

If you added the return type annotation, tools and editors would complain with a (correct) error telling you that your function is returning a type (e.g. a dict) that is different from what you declared (e.g. a Pydantic model).

In those cases, you can use the path operation decorator parameter response_model instead of the return type.

You can use the response_model parameter in any of the path operations:

- @app.get()
- @app.post()
- @app.put()
- @app.delete()
- etc.

```py
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []


@app.post("/items/", response_model=Item)
async def create_item(item: Item) -> Any:
    return item


@app.get("/items/", response_model=list[Item])
async def read_items() -> Any:
    return [
        {"name": "Portal Gun", "price": 42.0},
        {"name": "Plumbus", "price": 32.0},
    ]
```

Notice that response_model is a parameter of the "decorator" method (get, post, etc). Not of your path operation function, like all the parameters and body.

response_model receives the same type you would declare for a Pydantic model field, so, it can be a Pydantic model, but it can also be, e.g. a list of Pydantic models, like List[Item].

FastAPI will use this response_model to do all the data documentation, validation, etc. and also to convert and filter the output data to its type declaration.

Tip

If you have strict type checks in your editor, mypy, etc, you can declare the function return type as Any.

That way you tell the editor that you are intentionally returning anything. But FastAPI will still do the data documentation, validation, filtering, etc. with the response_model.

#### response_model Priority

If you declare both a return type and a response_model, the response_model will take priority and be used by FastAPI.

You can also use response_model=None to disable creating a response model for that path operation, you might need to do it if you are adding type annotations for things that are not valid Pydantic fields, you will see an example of that in one of the sections below.

#### Return the same input data

```py
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None


# Don't do this in production!
@app.post("/user/")
async def create_user(user: UserIn) -> UserIn:
    return user
```

To use EmailStr, first install email-validator.

Make sure you create a virtual environment, activate it, and then install it, for example:

`$ pip install email-validator`

or with:

`$ pip install "pydantic[email]"`

Danger

Never store the plain password of a user or send it in a response like this, unless you know all the caveats and you know what you are doing.

#### Add an output model

```py
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None


@app.post("/user/", response_model=UserOut)
async def create_user(user: UserIn) -> Any:
    return user
```

So, FastAPI will take care of filtering out all the data that is not declared in the output model (using Pydantic).

In this case, because the two models are different, if we annotated the function return type as UserOut, the editor and tools would complain that we are returning an invalid type, as those are different classes.

#### Return Type and Data Filtering

```py
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()


class BaseUser(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None


class UserIn(BaseUser):
    password: str


@app.post("/user/")
async def create_user(user: UserIn) -> BaseUser:
    return user
```

#### FastAPI Data Filtering

Now, for FastAPI, it will see the return type and make sure that what you return includes only the fields that are declared in the type

#### Other Return Type Annotations

There might be cases where you return something that is not a valid Pydantic field and you annotate it in the function, only to get the support provided by tooling (the editor, mypy, etc).

##### Return a Response Directly

The most common case would be [returning a Response directly](https://fastapi.tiangolo.com/advanced/response-directly/) as explained later in the advanced docs.

```py
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse, RedirectResponse

app = FastAPI()


@app.get("/portal")
async def get_portal(teleport: bool = False) -> Response:
    if teleport:
        return RedirectResponse(url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    return JSONResponse(content={"message": "Here's your interdimensional portal."})
```

This simple case is handled automatically by FastAPI because the return type annotation is the class (or a subclass of) Response.

And tools will also be happy because both RedirectResponse and JSONResponse are subclasses of Response, so the type annotation is correct.

##### Annotate a Response Subclass

You can also use a subclass of Response in the type annotation:

```py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/teleport")
async def get_teleport() -> RedirectResponse:
    return RedirectResponse(url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")
```

This will also work because RedirectResponse is a subclass of Response, and FastAPI will automatically handle this simple case.

##### Invalid Return Type Annotations

But when you return some other arbitrary object that is not a valid Pydantic type (e.g. a database object) and you annotate it like that in the function, FastAPI will try to create a Pydantic response model from that type annotation, and will fail.

The same would happen if you had something like a union between different types where one or more of them are not valid Pydantic types, for example this would fail 💥:

```py
from fastapi import FastAPI, Response
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/portal")
async def get_portal(teleport: bool = False) -> Response | dict:
    if teleport:
        return RedirectResponse(url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    return {"message": "Here's your interdimensional portal."}
```

##### Disable Response Model

Continuing from the example above, you might not want to have the default data validation, documentation, filtering, etc. that is performed by FastAPI.

But you might want to still keep the return type annotation in the function to get the support from tools like editors and type checkers (e.g. mypy).

In this case, you can disable the response model generation by setting response_model=None:

```py
from fastapi import FastAPI, Response
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/portal", response_model=None)
async def get_portal(teleport: bool = False) -> Response | dict:
    if teleport:
        return RedirectResponse(url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    return {"message": "Here's your interdimensional portal."}

```

This will make FastAPI skip the response model generation and that way you can have any return type annotations you need without it affecting your FastAPI application.

#### Response Model encoding parameters

#### Use the response_model_exclude_unset parameter

Your response model could have default values, like:

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float = 10.5
    tags: list[str] = []


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The bartenders", "price": 62, "tax": 20.2},
    "baz": {"name": "Baz", "description": None, "price": 50.2, "tax": 10.5, "tags": []},
}


@app.get("/items/{item_id}", response_model=Item, response_model_exclude_unset=True)
async def read_item(item_id: str):
    return items[item_id]
```

- `description: Union[str, None] = None` (or `str | None = None` in Python 3.10) has a default of None.
- `tax: float = 10.5` has a default of 10.5.
- `tags: List[str] = []` has a default of an empty list: [].

but you might want to omit them from the result if they were not actually stored.

For example, if you have models with many optional attributes in a NoSQL database, but you don't want to send very long JSON responses full of default values.
Use the response_model_exclude_unset parameter

So, if you send a request to that path operation for the item with ID foo, the response (not including default values) will be:

```json
{
    "name": "Foo",
    "price": 50.2
}
```

You can also use:

- `response_model_exclude_defaults=True`
- `response_model_exclude_none=True`

as described in [the Pydantic docs](https://docs.pydantic.dev/1.10/usage/exporting_models/#modeldict) for exclude_defaults and exclude_none.

##### Data with values for fields with defaults

But if your data has values for the model's fields with default values, like the item with ID bar:

```json
{
    "name": "Bar",
    "description": "The bartenders",
    "price": 62,
    "tax": 20.2
}
```

they will be included in the response.

##### Data with the same values as the defaults

If the data has the same values as the default ones, like the item with ID baz:

```json
{
    "name": "Baz",
    "description": None,
    "price": 50.2,
    "tax": 10.5,
    "tags": []
}
```

FastAPI is smart enough (actually, Pydantic is smart enough) to realize that, even though description, tax, and tags have the same values as the defaults, they were set explicitly (instead of taken from the defaults).

So, they will be included in the JSON response.

#### response_model_include and response_model_exclude

They take a set of str with the name of the attributes to include (omitting the rest) or to exclude (including the rest).

This can be used as a quick shortcut if you have only one Pydantic model and want to remove some data from the output.

Tip

> But it is still recommended to use the ideas above, using multiple classes, instead of these parameters.
> This is because the JSON Schema generated in your app's OpenAPI (and the docs) will still be the one for the complete model, even if you use response_model_include or response_model_exclude to omit some attributes.
> This also applies to response_model_by_alias that works similarly.

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float = 10.5


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The Bar fighters", "price": 62, "tax": 20.2},
    "baz": {
        "name": "Baz",
        "description": "There goes my baz",
        "price": 50.2,
        "tax": 10.5,
    },
}


@app.get(
    "/items/{item_id}/name",
    response_model=Item,
    response_model_include={"name", "description"},
)
async def read_item_name(item_id: str):
    return items[item_id]


@app.get("/items/{item_id}/public", response_model=Item, response_model_exclude={"tax"})
async def read_item_public_data(item_id: str):
    return items[item_id]
```

Tp

>The syntax {"name", "description"} creates a set with those two values.
>It is equivalent to set(["name", "description"]).

If you forget to use a set and use a list or tuple instead, FastAPI will still convert it to a set and it will work correctly:

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float = 10.5


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The Bar fighters", "price": 62, "tax": 20.2},
    "baz": {
        "name": "Baz",
        "description": "There goes my baz",
        "price": 50.2,
        "tax": 10.5,
    },
}


@app.get(
    "/items/{item_id}/name",
    response_model=Item,
    response_model_include=["name", "description"],
)
async def read_item_name(item_id: str):
    return items[item_id]


@app.get("/items/{item_id}/public", response_model=Item, response_model_exclude=["tax"])
async def read_item_public_data(item_id: str):
    return items[item_id]
```

### Extra Models

#### Multiple models

```py
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None


class UserInDB(BaseModel):
    username: str
    hashed_password: str
    email: EmailStr
    full_name: str | None = None


def fake_password_hasher(raw_password: str):
    return "supersecret" + raw_password


def fake_save_user(user_in: UserIn):
    hashed_password = fake_password_hasher(user_in.password)
    user_in_db = UserInDB(**user_in.dict(), hashed_password=hashed_password)
    print("User saved! ..not really")
    return user_in_db


@app.post("/user/", response_model=UserOut)
async def create_user(user_in: UserIn):
    user_saved = fake_save_user(user_in)
    return user_saved
```

The examples here use `.dict()` for compatibility with Pydantic v1, but you should use `.model_dump()` instead if you can use Pydantic v2.

#### Reduce duplication

```py
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()


class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    pass


class UserInDB(UserBase):
    hashed_password: str


def fake_password_hasher(raw_password: str):
    return "supersecret" + raw_password


def fake_save_user(user_in: UserIn):
    hashed_password = fake_password_hasher(user_in.password)
    user_in_db = UserInDB(**user_in.dict(), hashed_password=hashed_password)
    print("User saved! ..not really")
    return user_in_db


@app.post("/user/", response_model=UserOut)
async def create_user(user_in: UserIn):
    user_saved = fake_save_user(user_in)
    return user_saved
```

#### Union or anyOf

```py
from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class BaseItem(BaseModel):
    description: str
    type: str


class CarItem(BaseItem):
    type: str = "car"


class PlaneItem(BaseItem):
    type: str = "plane"
    size: int


items = {
    "item1": {"description": "All my friends drive a low rider", "type": "car"},
    "item2": {
        "description": "Music is my aeroplane, it's my aeroplane",
        "type": "plane",
        "size": 5,
    },
}


@app.get("/items/{item_id}", response_model=Union[PlaneItem, CarItem]) # Union in Python 3.10 == some_variable: PlaneItem | CarItem
async def read_item(item_id: str):
    return items[item_id]
```

#### List of models

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str


items = [
    {"name": "Foo", "description": "There comes my hero"},
    {"name": "Red", "description": "It's my aeroplane"},
]


@app.get("/items/", response_model=list[Item])
async def read_items():
    return items
```

#### Response with arbitrary dict

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/keyword-weights/", response_model=dict[str, float])
async def read_keyword_weights():
    return {"foo": 2.3, "bar": 3.4}
```

### Response Status Code

The same way you can specify a response model, you can also declare the HTTP status code used for the response with the parameter status_code in any of the path operations:

- `@app.get()`
- `@app.post()`
- `@app.put()`
- `@app.delete()`
- etc.

```py
from fastapi import FastAPI

app = FastAPI()


@app.post("/items/", status_code=201)
async def create_item(name: str):
    return {"name": name}
```

It will:

- Return that status code in the response.
- Document it as such in the OpenAPI schema (and so, in the user interfaces):

#### About HTTP status codes

- 100 and above are for "Information". You rarely use them directly. Responses with these status codes cannot have a body.
- 200 and above are for "Successful" responses. These are the ones you would use the most.
  - 200 is the default status code, which means everything was "OK".
  - Another example would be 201, "Created". It is commonly used after creating a new record in the database.
  - A special case is 204, "No Content". This response is used when there is no content to return to the client, and so the response must not have a body.
- 300 and above are for "Redirection". Responses with these status codes may or may not have a body, except for 304, "Not Modified", which must not have one.
- 400 and above are for "Client error" responses. These are the second type you would probably use the most.
  - An example is 404, for a "Not Found" response.
  - For generic errors from the client, you can just use 400.
- 500 and above are for server errors. You almost never use them directly. When something goes wrong at some part in your application code, or server, it will automatically return one of these status codes.

#### Shortcut to remember the names

```py
from fastapi import FastAPI, status

app = FastAPI()


@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(name: str):
    return {"name": name}
```

#### Changing the default

Later, in the [Advanced User Guide](https://fastapi.tiangolo.com/advanced/response-change-status-code/), you will see how to return a different status code than the default you are declaring here.

#### Form Data

When you need to receive form fields instead of JSON, you can use `Form`

```py
from typing import Annotated

from fastapi import FastAPI, Form # Import Form

app = FastAPI()


@app.post("/login/")
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]): # Define Form parameters
    return {"username": username}
```

For example, in one of the ways the OAuth2 specification can be used (called "password flow") it is required to send a username and password as form fields.

The spec requires the fields to be exactly named username and password, and to be sent as form fields, not JSON.

With Form you can declare the same configurations as with Body (and Query, Path, Cookie), including validation, examples, an alias (e.g. user-name instead of username), etc.

Info

> Form is a class that inherits directly from Body.

Tip

> To declare form bodies, you need to use Form explicitly, because without it the parameters would be interpreted as query parameters or body (JSON) parameters.

#### About "Form Fields"

The way HTML forms (<form></form>) sends the data to the server normally uses a "special" encoding for that data, it's different from JSON.

FastAPI will make sure to read that data from the right place instead of JSON.

Technical Details

> Data from forms is normally encoded using the "media type" application/x-www-form-urlencoded.
> But when the form includes files, it is encoded as multipart/form-data. You'll read about handling files in the next chapter.
>If you want to read more about these encodings and form fields, head to the [MDN web docs for POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

Warning

You can declare multiple Form parameters in a path operation, but you can't also declare Body fields that you expect to receive as JSON, as the request will have the body encoded using application/x-www-form-urlencoded instead of application/json.

This is not a limitation of FastAPI, it's part of the HTTP protocol.

### Form Models

You can use Pydantic models to declare form fields in FastAPI.

Info

To use forms, first install python-multipart.

Make sure you create a virtual environment, activate it, and then install it, for example:

`$ pip install python-multipart`

#### Pydantic Models for Forms

```py
from typing import Annotated

from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()


class FormData(BaseModel):
    username: str
    password: str


@app.post("/login/")
async def login(data: Annotated[FormData, Form()]):
    return data
```

#### Forbid Extra Form Fields

```py
from typing import Annotated

from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()


class FormData(BaseModel):
    username: str
    password: str
    model_config = {"extra": "forbid"}


@app.post("/login/")
async def login(data: Annotated[FormData, Form()]):
    return data
```

If a client tries to send some extra data, they will receive an error response.

For example, if the client tries to send the form fields:

- username: Rick
- password: Portal Gun
- extra: Mr. Poopybutthole

They will receive an error response telling them that the field extra is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["body", "extra"],
            "msg": "Extra inputs are not permitted",
            "input": "Mr. Poopybutthole"
        }
    ]
}
```

### Request Files

You can define files to be uploaded by the client using `File`

Info

>To receive uploaded files, first install `python-multipart`.
> Make sure you create a virtual environment, activate it, and then install it, for example:
> `$ pip install python-multipart`
> This is because uploaded files are sent as "form data".

```py
from typing import Annotated

from fastapi import FastAPI, File, UploadFile # Import File

app = FastAPI()


@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]): # Define File Parameters
    return {"file_size": len(file)}


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile): # File Parameters with UploadFile
    return {"filename": file.filename}
```

Info

> File is a class that inherits directly from Form.
> But remember that when you import Query, Path, File and others from fastapi, those are actually functions that return special classes.

Tip

> To declare File bodies, you need to use File, because otherwise the parameters would be interpreted as query parameters or body (JSON) parameters.

The files will be uploaded as "form data".

If you declare the type of your path operation function parameter as bytes, FastAPI will read the file for you and you will receive the contents as bytes.

Keep in mind that this means that the whole contents will be stored in memory. This will work well for small files.

But there are several cases in which you might benefit from using UploadFile.

#### UploadFile

Using `UploadFile` has several advantages over bytes:

- You don't have to use `File()` in the default value of the parameter.
- It uses a "spooled" file:
  - A file stored in memory up to a maximum size limit, and after passing this limit it will be stored in disk.
- This means that it will work well for large files like images, videos, large binaries, etc. without consuming all the memory.
- You can get metadata from the uploaded file.
- It has a file-like async interface.
- It exposes an actual Python SpooledTemporaryFile object that you can pass directly to other libraries that expect a file-like object.

`UploadFile` has the following attributes:

- `filename`: A str with the original file name that was uploaded (e.g. myimage.jpg).
- `content_type`: A str with the content type (MIME type / media type) (e.g. image/jpeg).
- `file`: A [SpooledTemporaryFile](https://docs.python.org/3/library/tempfile.html#tempfile.SpooledTemporaryFile) (a [file-like](https://docs.python.org/3/glossary.html#term-file-like-object) object). This is the actual Python file object that you can pass directly to other functions or libraries that expect a "file-like" object.

`UploadFile` has the following async methods. They all call the corresponding file methods underneath (using the internal `SpooledTemporaryFile`).

- `write(data)`: Writes data (`str` or `bytes`) to the file.
- `read(size)`: Reads size (`int`) bytes/characters of the file.
- `seek(offset)`: Goes to the byte position `offset (int)` in the file.
  - E.g., `await myfile.seek(0)` would go to the start of the file.
  - This is especially useful if you run `await myfile.read()` once and then need to read the contents again.
- `close()`: Closes the file.

As all these methods are async methods, you need to "`await`" them.

For example, inside of an async path operation function you can get the contents with:

`contents = await myfile.read()`

async Technical Details

> When you use the async methods, FastAPI runs the file methods in a threadpool and awaits for them.

Starlette Technical Details

> FastAPI's UploadFile inherits directly from Starlette's UploadFile, but adds some necessary parts to make it compatible with Pydantic and the other parts of FastAPI.

#### Optional File Upload

```py
from typing import Annotated

from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.post("/files/")
async def create_file(file: Annotated[bytes | None, File()] = None):
    if not file:
        return {"message": "No file sent"}
    else:
        return {"file_size": len(file)}


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile | None = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        return {"filename": file.filename}
```

#### UploadFile with Additional Metadata

```py
from typing import Annotated

from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.post("/files/")
async def create_file(file: Annotated[bytes, File(description="A file read as bytes")]):
    return {"file_size": len(file)}


@app.post("/uploadfile/")
async def create_upload_file(
    file: Annotated[UploadFile, File(description="A file read as UploadFile")],
):
    return {"filename": file.filename}
```

#### Multiple File Uploads

It's possible to upload several files at the same time.
They would be associated to the same "form field" sent using "form data".
To use that, declare a list of bytes or UploadFile:

```py
from typing import Annotated

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.post("/files/")
async def create_files(files: Annotated[list[bytes], File()]):
    return {"file_sizes": [len(file) for file in files]}


@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}


@app.get("/")
async def main():
    content = """
<body>
<form action="/files/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)
```

#### Multiple File Uploads with Additional Metadata

```py
from typing import Annotated

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.post("/files/")
async def create_files(
    files: Annotated[list[bytes], File(description="Multiple files as bytes")],
):
    return {"file_sizes": [len(file) for file in files]}


@app.post("/uploadfiles/")
async def create_upload_files(
    files: Annotated[
        list[UploadFile], File(description="Multiple files as UploadFile")
    ],
):
    return {"filenames": [file.filename for file in files]}


@app.get("/")
async def main():
    content = """
<body>
<form action="/files/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)
```

### Request Forms and Files

```py
from typing import Annotated

from fastapi import FastAPI, File, Form, UploadFile

app = FastAPI()


@app.post("/files/")
async def create_file(
    file: Annotated[bytes, File()],
    fileb: Annotated[UploadFile, File()],
    token: Annotated[str, Form()],
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }
```

### Handling Errors

There are many situations in which you need to notify an error to a client that is using your API.

This client could be a browser with a frontend, a code from someone else, an IoT device, etc.

You could need to tell the client that:

- The client doesn't have enough privileges for that operation.
- The client doesn't have access to that resource.
The item the client was trying to access doesn't exist.
etc.
- In these cases, you would normally return an HTTP status code in the range of 400 (from 400 to 499).

This is similar to the 200 HTTP status codes (from 200 to 299). Those "200" status codes mean that somehow there was a "success" in the request.

The status codes in the 400 range mean that there was an error from the client.

Remember all those "404 Not Found" errors (and jokes)?

```py
from fastapi import FastAPI, HTTPException # Import HTTPException

app = FastAPI()

items = {"foo": "The Foo Wrestlers"}


@app.get("/items/{item_id}")
async def read_item(item_id: str):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found") # Raise an HTTPException in your code
    return {"item": items[item_id]}
```

`HTTPException` is a normal Python exception with additional data relevant for APIs.

Because it's a Python exception, you don't `return` it, you `raise` it.

This also means that if you are inside a utility function that you are calling inside of your path operation function, and you `raise` the `HTTPException` from inside of that utility function, it won't run the rest of the code in the path operation function, it will terminate that request right away and send the HTTP error from the `HTTPException` to the client.

The benefit of raising an exception over `return`ing a value will be more evident in the section about Dependencies and Security.

In this example, when the client requests an item by an ID that doesn't exist, raise an exception with a status code of `404`.

If the client requests http://example.com/items/foo (an item_id "foo"), that client will receive an HTTP status code of `200`, and a JSON response of:

```json
{
  "item": "The Foo Wrestlers"
}
```

But if the client requests http://example.com/items/bar (a non-existent item_id "bar"), that client will receive an HTTP status code of `404` (the "not found" error), and a JSON response of:

```json
{
  "detail": "Item not found"
}
```

Tip

>When raising an HTTPException, you can pass any value that can be converted to JSON as the parameter detail, not only str.
> You could pass a dict, a list, etc.
> They are handled automatically by FastAPI and converted to JSON.

#### Add custom headers

There are some situations in where it's useful to be able to add custom headers to the HTTP error. For example, for some types of security.

You probably won't need to use it directly in your code.

But in case you needed it for an advanced scenario, you can add custom headers:

```py
from fastapi import FastAPI, HTTPException

app = FastAPI()

items = {"foo": "The Foo Wrestlers"}


@app.get("/items-header/{item_id}")
async def read_item_header(item_id: str):
    if item_id not in items:
        raise HTTPException(
            status_code=404,
            detail="Item not found",
            headers={"X-Error": "There goes my error"},
        )
    return {"item": items[item_id]}
```

#### Install custom exception handlers

You can add custom exception handlers with [the same exception utilities from Starlette](https://www.starlette.io/exceptions/).

Let's say you have a custom exception UnicornException that you (or a library you use) might raise.

And you want to handle this exception globally with FastAPI.

You could add a custom exception handler with @app.exception_handler():

```py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name


app = FastAPI()


@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. There goes a rainbow..."},
    )


@app.get("/unicorns/{name}")
async def read_unicorn(name: str):
    if name == "yolo":
        raise UnicornException(name=name)
    return {"unicorn_name": name}
```

#### Override the default exception handlers

FastAPI has some default exception handlers.

These handlers are in charge of returning the default JSON responses when you raise an HTTPException and when the request has invalid data.

You can override these exception handlers with your own.

Override request validation exceptions¶
When a request contains invalid data, FastAPI internally raises a `RequestValidationError`.

And it also includes a default exception handler for it.

To override it, `import the RequestValidationError` and use it with `@app.exception_handler(RequestValidationError)` to decorate the exception handler.

The exception handler will receive a `Request` and the exception.

```py
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id == 3:
        raise HTTPException(status_code=418, detail="Nope! I don't like 3.")
    return {"item_id": item_id}
```

you will get a text version, with:

```txt
1 validation error
path -> item_id
  value is not a valid integer (type=type_error.integer)
```

`RequestValidationError` is a sub-class of Pydantic's `ValidationError`.

FastAPI uses it so that, if you use a Pydantic model in response_model, and your data has an error, you will see the error in your log.

But the client/user will not see it. Instead, the client will receive an "Internal Server Error" with an HTTP status code 500.

It should be this way because if you have a Pydantic `ValidationError` in your response or anywhere in your code (not in the client's request), it's actually a bug in your code.

And while you fix it, your clients/users shouldn't have access to internal information about the error, as that could expose a security vulnerability.

#### Override the HTTPException error handler

```py
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id == 3:
        raise HTTPException(status_code=418, detail="Nope! I don't like 3.")
    return {"item_id": item_id}
```

#### Use the RequestValidationError body

```py
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )


class Item(BaseModel):
    title: str
    size: int


@app.post("/items/")
async def create_item(item: Item):
    return item

```

Now try sending an invalid item like:

```json
{
  "title": "towel",
  "size": "XL"
}
```

You will receive a response telling you that the data is invalid containing the received body:

```json
{
  "detail": [
    {
      "loc": [
        "body",
        "size"
      ],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ],
  "body": {
    "title": "towel",
    "size": "XL"
  }
}
```

#### FastAPI's HTTPException vs Starlette's HTTPException

FastAPI has its own HTTPException.

And FastAPI's HTTPException error class inherits from Starlette's HTTPException error class.

The only difference is that FastAPI's HTTPException accepts any JSON-able data for the detail field, while Starlette's HTTPException only accepts strings for it.

So, you can keep raising FastAPI's HTTPException as normally in your code.

But when you register an exception handler, you should register it for Starlette's `HTTPException`.

This way, if any part of Starlette's internal code, or a Starlette extension or plug-in, raises a Starlette HTTPException, your handler will be able to catch and handle it.

In this example, to be able to have both `HTTPExceptions` in the same code, Starlette's exceptions is renamed to `StarletteHTTPException`:

`from starlette.exceptions import HTTPException as StarletteHTTPException`

#### Reuse FastAPI's exception handlers

If you want to use the exception along with the same default exception handlers from FastAPI, you can import and reuse the default exception handlers from fastapi.exception_handlers:

```py
from fastapi import FastAPI, HTTPException
from fastapi.exception_handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()


@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request, exc):
    print(f"OMG! An HTTP error!: {repr(exc)}")
    return await http_exception_handler(request, exc)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(f"OMG! The client sent invalid data!: {exc}")
    return await request_validation_exception_handler(request, exc)


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id == 3:
        raise HTTPException(status_code=418, detail="Nope! I don't like 3.")
    return {"item_id": item_id}
```

### Path Operation Configuration

#### Response Status Code

```py
from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.post("/items/", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return item
```

#### Tags

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.post("/items/", response_model=Item, tags=["items"])
async def create_item(item: Item):
    return item


@app.get("/items/", tags=["items"])
async def read_items():
    return [{"name": "Foo", "price": 42}]


@app.get("/users/", tags=["users"])
async def read_users():
    return [{"username": "johndoe"}]
```

hey will be added to the OpenAPI schema and used by the automatic documentation interfaces

#### Tags with Enums

```py
from enum import Enum

from fastapi import FastAPI

app = FastAPI()


class Tags(Enum):
    items = "items"
    users = "users"


@app.get("/items/", tags=[Tags.items])
async def get_items():
    return ["Portal gun", "Plumbus"]


@app.get("/users/", tags=[Tags.users])
async def read_users():
    return ["Rick", "Morty"]
```

#### Summary and description

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    description="Create an item with all the information, name, description, price, tax and a set of unique tags",
)
async def create_item(item: Item):
    return item
```

#### Description from docstring

As descriptions tend to be long and cover multiple lines, you can declare the path operation description in the function docstring and FastAPI will read it from there.

You can write Markdown in the docstring, it will be interpreted and displayed correctly (taking into account docstring indentation).

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.post("/items/", response_model=Item, summary="Create an item")
async def create_item(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    """
    return item
```

#### Response description

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()


@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    response_description="The created item",
)
async def create_item(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    """
    return item
```

Notice that `response_description` refers specifically to the response, the `description` refers to the path operation in general.

#### Deprecate a path operation

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/", tags=["items"])
async def read_items():
    return [{"name": "Foo", "price": 42}]


@app.get("/users/", tags=["users"])
async def read_users():
    return [{"username": "johndoe"}]


@app.get("/elements/", tags=["items"], deprecated=True)
async def read_elements():
    return [{"item_id": "Foo"}]
```

It will be clearly marked as deprecated in the interactive doc

#### JSON Compatible Encoder

There are some cases where you might need to convert a data type (like a Pydantic model) to something compatible with JSON (like a dict, list, etc).

For example, if you need to store it in a database.

For that, FastAPI provides a `jsonable_encoder()` function

##### Using the jsonable_encoder

Let's imagine that you have a database fake_db that only receives JSON compatible data.

For example, it doesn't receive datetime objects, as those are not compatible with JSON.

So, a datetime object would have to be converted to a str containing the data in ISO format.

The same way, this database wouldn't receive a Pydantic model (an object with attributes), only a dict.

You can use jsonable_encoder for that.

It receives an object, like a Pydantic model, and returns a JSON compatible version:

```py
from datetime import datetime

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

fake_db = {}


class Item(BaseModel):
    title: str
    timestamp: datetime
    description: str | None = None


app = FastAPI()


@app.put("/items/{id}")
def update_item(id: str, item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    fake_db[id] = json_compatible_item_data
```

In this example, it would convert the Pydantic model to a dict, and the datetime to a str.

The result of calling it is something that can be encoded with the Python standard json.dumps().

It doesn't return a large str containing the data in JSON format (as a string). It returns a Python standard data structure (e.g. a dict) with values and sub-values that are all compatible with JSON.

#### Body - Updates

##### Update replacing with PUT

To update an item you can use the HTTP PUT operation.

You can use the jsonable_encoder to convert the input data to data that can be stored as JSON (e.g. with a NoSQL database). For example, converting datetime to str.

```py
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    tax: float = 10.5
    tags: list[str] = []


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The bartenders", "price": 62, "tax": 20.2},
    "baz": {"name": "Baz", "description": None, "price": 50.2, "tax": 10.5, "tags": []},
}


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    return items[item_id]


@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    update_item_encoded = jsonable_encoder(item)
    items[item_id] = update_item_encoded
    return update_item_encoded
```

PUT is used to receive data that should replace the existing data.

Warning about replacing

That means that if you want to update the item bar using PUT with a body containing:

```json
{
    "name": "Barz",
    "price": 3,
    "description": None,
}
```

because it doesn't include the already stored attribute "tax": 20.2, the input model would take the default value of "tax": 10.5.

And the data would be saved with that "new" tax of 10.5.

##### Partial updates with PATCH

You can also use the HTTP PATCH operation to partially update data.

This means that you can send only the data that you want to update, leaving the rest intact.

Note

PATCH is less commonly used and known than PUT.

And many teams use only PUT, even for partial updates.

You are free to use them however you want, FastAPI doesn't impose any restrictions.

But this guide shows you, more or less, how they are intended to be used.

##### Using Pydantic's exclude_unset parameter

```py
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    tax: float = 10.5
    tags: list[str] = []


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The bartenders", "price": 62, "tax": 20.2},
    "baz": {"name": "Baz", "description": None, "price": 50.2, "tax": 10.5, "tags": []},
}


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    return items[item_id]


@app.patch("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    stored_item_data = items[item_id]
    stored_item_model = Item(**stored_item_data)
    update_data = item.dict(exclude_unset=True)
    updated_item = stored_item_model.copy(update=update_data)
    items[item_id] = jsonable_encoder(updated_item)
    return updated_item
```

##### Using Pydantic's update parameter

Now, you can create a copy of the existing model using .model_copy(), and pass the update parameter with a dict containing the data to update.
Like stored_item_model.model_copy(update=update_data):

```py
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    tax: float = 10.5
    tags: list[str] = []


items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The bartenders", "price": 62, "tax": 20.2},
    "baz": {"name": "Baz", "description": None, "price": 50.2, "tax": 10.5, "tags": []},
}


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    return items[item_id]


@app.patch("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    stored_item_data = items[item_id]
    stored_item_model = Item(**stored_item_data)
    update_data = item.dict(exclude_unset=True)
    updated_item = stored_item_model.copy(update=update_data)
    items[item_id] = jsonable_encoder(updated_item)
    return updated_item
```

### Dependencies

```py
from typing import Annotated

from fastapi import Depends, FastAPI # Import Depends

app = FastAPI()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100): # Create a dependency, or "dependable"
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]): # Declare the dependency, in the "dependant"
    return commons


@app.get("/users/")
async def read_users(commons: Annotated[dict, Depends(common_parameters)]): # Declare the dependency, in the "dependant"
    return commons
```
You can think of it as a path operation function without the "decorator" (without the `@app.get("/some-path`")).

And it can return anything you want.

In this case, this dependency expects:

- An optional query parameter q that is a str.
- An optional query parameter skip that is an int, and by default is 0.
- An optional query parameter limit that is an int, and by default is 100.
- And then it just returns a dict containing those values.

And then it just returns a dict containing those values.

Although you use Depends in the parameters of your function the same way you use Body, Query, etc, Depends works a bit differently.

You only give Depends a single parameter.

This parameter must be something like a function.

You don't call it directly (don't add the parenthesis at the end), you just pass it as a parameter to Depends().

And that function takes parameters in the same way that path operation functions do.

Whenever a new request arrives, FastAPI will take care of:

- Calling your dependency ("dependable") function with the correct parameters.
- Get the result from your function.
- Assign that result to the parameter in your path operation function.
  
#### Share Annotated dependencies

But because we are using Annotated, we can store that Annotated value in a variable and use it in multiple places:

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


CommonsDep = Annotated[dict, Depends(common_parameters)]


@app.get("/items/")
async def read_items(commons: CommonsDep):
    return commons


@app.get("/users/")
async def read_users(commons: CommonsDep):
    return commons
```

#### Simple usage

If you look at it, path operation functions are declared to be used whenever a path and operation matches, and then FastAPI takes care of calling the function with the correct parameters, extracting the data from the request.

Actually, all (or most) of the web frameworks work in this same way.

You never call those functions directly. They are called by your framework (in this case, FastAPI).

With the Dependency Injection system, you can also tell FastAPI that your path operation function also "depends" on something else that should be executed before your path operation function, and FastAPI will take care of executing it and "injecting" the results.

Other common terms for this same idea of "dependency injection" are:

- resources
- providers
- services
- injectables
- components

### Classes as Dependencies

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit


@app.get("/items/")
async def read_items(commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response
  ```

####   Shortcut

Instead of writing:

`commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]`

...you write:

`commons: Annotated[CommonQueryParams, Depends()]`

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit


@app.get("/items/")
async def read_items(commons: Annotated[CommonQueryParams, Depends()]):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response
```

### Sub-dependencies

```py
from typing import Annotated

from fastapi import Cookie, Depends, FastAPI

app = FastAPI()


def query_extractor(q: str | None = None):
    return q


def query_or_cookie_extractor(
    q: Annotated[str, Depends(query_extractor)],
    last_query: Annotated[str | None, Cookie()] = None,
):
    if not q:
        return last_query
    return q


@app.get("/items/")
async def read_query(
    query_or_default: Annotated[str, Depends(query_or_cookie_extractor)],
):
    return {"q_or_cookie": query_or_default}
```

#### Using the same dependency multiple times

If one of your dependencies is declared multiple times for the same path operation, for example, multiple dependencies have a common sub-dependency, FastAPI will know to call that sub-dependency only once per request.

And it will save the returned value in a "cache" and pass it to all the "dependants" that need it in that specific request, instead of calling the dependency multiple times for the same request.

In an advanced scenario where you know you need the dependency to be called at every step (possibly multiple times) in the same request instead of using the "cached" value, you can set the parameter use_cache=False when using Depends:

async def needy_dependency(fresh_value: Annotated[str, Depends(get_value, use_cache=False)]):
    return {"fresh_value": fresh_value}

### Dependencies in path operation decorators

In some cases you don't really need the return value of a dependency inside your path operation function.

Or the dependency doesn't return a value.

But you still need it to be executed/solved.

For those cases, instead of declaring a path operation function parameter with Depends, you can add a list of dependencies to the path operation decorator.


```py
from typing import Annotated

from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI()


async def verify_token(x_token: Annotated[str, Header()]): # Dependency requirements
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid") # Raise exceptions


async def verify_key(x_key: Annotated[str, Header()]): # Dependency requirements
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid") # Raise exceptions
    return x_key # Return values


@app.get("/items/", dependencies=[Depends(verify_token), Depends(verify_key)]) # Add dependencies to the path operation decorator
async def read_items():
    return [{"item": "Foo"}, {"item": "Bar"}]
```

These dependencies will be executed/solved the same way as normal dependencies. But their value (if they return any) won't be passed to your path operation function.

### Global Dependencies

they will be applied to all the path operations in the application:

```py
from fastapi import Depends, FastAPI, Header, HTTPException
from typing_extensions import Annotated


async def verify_token(x_token: Annotated[str, Header()]):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def verify_key(x_key: Annotated[str, Header()]):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key


app = FastAPI(dependencies=[Depends(verify_token), Depends(verify_key)])


@app.get("/items/")
async def read_items():
    return [{"item": "Portal Gun"}, {"item": "Plumbus"}]


@app.get("/users/")
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]
```

### Dependencies with yield 

FastAPI supports dependencies that do some extra steps after finishing.

To do this, use yield instead of return, and write the extra steps (code) after

#### A database dependency with yield

```py
async def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()
```

#### Sub-dependencies with yield

```py
from typing import Annotated

from fastapi import Depends


async def dependency_a():
    dep_a = generate_dep_a()
    try:
        yield dep_a
    finally:
        dep_a.close()


async def dependency_b(dep_a: Annotated[DepA, Depends(dependency_a)]):
    dep_b = generate_dep_b()
    try:
        yield dep_b
    finally:
        dep_b.close(dep_a)


async def dependency_c(dep_b: Annotated[DepB, Depends(dependency_b)]):
    dep_c = generate_dep_c()
    try:
        yield dep_c
    finally:
        dep_c.close(dep_b)
```

```py
from typing import Annotated

from fastapi import Depends


async def dependency_a():
    dep_a = generate_dep_a()
    try:
        yield dep_a
    finally:
        dep_a.close()


async def dependency_b(dep_a: Annotated[DepA, Depends(dependency_a)]):
    dep_b = generate_dep_b()
    try:
        yield dep_b
    finally:
        dep_b.close(dep_a)


async def dependency_c(dep_b: Annotated[DepB, Depends(dependency_b)]):
    dep_c = generate_dep_c()
    try:
        yield dep_c
    finally:
        dep_c.close(dep_b)
```

#### Dependencies with yield and HTTPException

```py
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException

app = FastAPI()


data = {
    "plumbus": {"description": "Freshly pickled plumbus", "owner": "Morty"},
    "portal-gun": {"description": "Gun to create portals", "owner": "Rick"},
}


class OwnerError(Exception):
    pass


def get_username():
    try:
        yield "Rick"
    except OwnerError as e:
        raise HTTPException(status_code=400, detail=f"Owner error: {e}")


@app.get("/items/{item_id}")
def get_item(item_id: str, username: Annotated[str, Depends(get_username)]):
    if item_id not in data:
        raise HTTPException(status_code=404, detail="Item not found")
    item = data[item_id]
    if item["owner"] != username:
        raise OwnerError(username)
    return item
```

An alternative you could use to catch exceptions (and possibly also raise another HTTPException) is to create a Custom Exception Handler

#### Dependencies with yield and except

If you catch an exception using `except` in a dependency with `yield` and you don't raise it again (or `raise` a new exception), FastAPI won't be able to notice there was an exception, the same way that would happen with regular Python:

```py
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException

app = FastAPI()


class InternalError(Exception):
    pass


def get_username():
    try:
        yield "Rick"
    except InternalError:
        print("Oops, we didn't raise again, Britney 😱")


@app.get("/items/{item_id}")
def get_item(item_id: str, username: Annotated[str, Depends(get_username)]):
    if item_id == "portal-gun":
        raise InternalError(
            f"The portal gun is too dangerous to be owned by {username}"
        )
    if item_id != "plumbus":
        raise HTTPException(
            status_code=404, detail="Item not found, there's only a plumbus here"
        )
    return item_id
```

In this case, the client will see an HTTP 500 Internal Server Error response as it should, given that we are not raising an HTTPException or similar, but the server will not have any logs or any other indication of what was the error. 😱

#### Always raise in Dependencies with yield and except

If you catch an exception in a dependency with yield, unless you are raising another HTTPException or similar, you should re-raise the original exception.

You can re-raise the same exception using raise:

```py
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException

app = FastAPI()


class InternalError(Exception):
    pass


def get_username():
    try:
        yield "Rick"
    except InternalError:
        print("We don't swallow the internal error here, we raise again 😎")
        raise


@app.get("/items/{item_id}")
def get_item(item_id: str, username: Annotated[str, Depends(get_username)]):
    if item_id == "portal-gun":
        raise InternalError(
            f"The portal gun is too dangerous to be owned by {username}"
        )
    if item_id != "plumbus":
        raise HTTPException(
            status_code=404, detail="Item not found, there's only a plumbus here"
        )
    return item_id
```

Now the client will get the same HTTP 500 Internal Server Error response, but the server will have our custom InternalError in the logs. 😎

This diagram shows HTTPException, but you could also raise any other exception that you catch in a dependency with yield or with a Custom Exception Handler.

If you raise any exception, it will be passed to the dependencies with yield, including HTTPException. In most cases you will want to re-raise that same exception or a new one from the dependency with yield to make sure it's properly handled.

### Security

#### OAuth2

OAuth2 is a specification that defines several ways to handle authentication and authorization.

It is quite an extensive specification and covers several complex use cases.

It includes ways to authenticate using a "third party".

That's what all the systems with "login with Facebook, Google, Twitter, GitHub" use underneath.

#### OAuth 1

There was an OAuth 1, which is very different from OAuth2, and more complex, as it included direct specifications on how to encrypt the communication.

It is not very popular or used nowadays.

OAuth2 doesn't specify how to encrypt the communication, it expects you to have your application served with HTTPS.

#### OpenID Connect

OpenID Connect is another specification, based on OAuth2.

It just extends OAuth2 specifying some things that are relatively ambiguous in OAuth2, to try to make it more interoperable.

For example, Google login uses OpenID Connect (which underneath uses OAuth2).

But Facebook login doesn't support OpenID Connect. It has its own flavor of OAuth2.

#### OpenID (not "OpenID Connect")

There was also an "OpenID" specification. That tried to solve the same thing as OpenID Connect, but was not based on OAuth2.

So, it was a complete additional system.

It is not very popular or used nowadays.

#### OpenAPI

OpenAPI (previously known as Swagger) is the open specification for building APIs (now part of the Linux Foundation).

#### FastAPI is based on OpenAPI.

That's what makes it possible to have multiple automatic interactive documentation interfaces, code generation, etc.

OpenAPI has a way to define multiple security "schemes".

By using them, you can take advantage of all these standard-based tools, including these interactive documentation systems.

OpenAPI defines the following security schemes:

- apiKey: an application specific key that can come from:
  - A query parameter.
  - A header.
  - A cookie.
- http: standard HTTP authentication systems, including:
  - bearer: a header Authorization with a value of Bearer plus a token. This is inherited from OAuth2.
  - HTTP Basic authentication.
  - HTTP Digest, etc.
- oauth2: all the OAuth2 ways to handle security (called "flows").
  - Several of these flows are appropriate for building an OAuth 2.0 authentication provider (like Google, Facebook, Twitter, GitHub, etc):
    - implicit
    - clientCredentials
    - authorizationCode
  - But there is one specific "flow" that can be perfectly used for handling authentication in the same application directly:
    - password: some next chapters will cover examples of this.
- openIdConnect: has a way to define how to discover OAuth2 authentication data automatically.
  - This automatic discovery is what is defined in the OpenID Connect specification.

#### FastAPI utilities

FastAPI provides several tools for each of these security schemes in the fastapi.security module that simplify using these security mechanisms.

In the next chapters you will see how to add security to your API using those tools provided by FastAPI.

And you will also see how it gets automatically integrated into the interactive documentation system.

### Security - First Steps

```py
# main.py
from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
```

`fastapi dev main.py`

Go to the interactive docs at: <http://127.0.0.1:8000/docs>

You already have a shiny new "Authorize" button.

And your path operation has a little lock in the top-right corner that you can click.

And if you click it, you have a little authorization form to type a username and password (and other optional fields

#### The `password` flow

Now let's go back a bit and understand what is all that.

The password "flow" is one of the ways ("flows") defined in OAuth2, to handle security and authentication.

OAuth2 was designed so that the backend or API could be independent of the server that authenticates the user.

But in this case, the same FastAPI application will handle the API and the authentication.

So, let's review it from that simplified point of view:

- The user types the username and password in the frontend, and hits Enter.
- The frontend (running in the user's browser) sends that username and password to a specific URL in our API (declared with tokenUrl="token").
- The API checks that username and password, and responds with a "token" (we haven't implemented any of this yet).
  - A "token" is just a string with some content that we can use later to verify this user.
  - Normally, a token is set to expire after some time.
    - So, the user will have to log in again at some point later.
    - And if the token is stolen, the risk is less. It is not like a permanent key that will work forever (in most of the cases).
- The frontend stores that token temporarily somewhere.
- The user clicks in the frontend to go to another section of the frontend web app.
- The frontend needs to fetch some more data from the API.
  - But it needs authentication for that specific endpoint.
  - So, to authenticate with our API, it sends a header Authorization with a value of Bearer plus the token.
  - If the token contains foobar, the content of the Authorization header would be: Bearer foobar.

#### FastAPI's `OAuth2PasswordBearer`

FastAPI provides several tools, at different levels of abstraction, to implement these security features.

In this example we are going to use OAuth2, with the Password flow, using a Bearer token. We do that using the OAuth2PasswordBearer class.

When we create an instance of the OAuth2PasswordBearer class we pass in the tokenUrl parameter. This parameter contains the URL that the client (the frontend running in the user's browser) will use to send the username and password in order to get a token.

`oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")`

Here tokenUrl="token" refers to a relative URL token that we haven't created yet. As it's a relative URL, it's equivalent to ./token.

Because we are using a relative URL, if your API was located at https://example.com/, then it would refer to https://example.com/token. But if your API was located at https://example.com/api/v1/, then it would refer to https://example.com/api/v1/token.

Using a relative URL is important to make sure your application keeps working even in an advanced use case like Behind a Proxy.

This parameter doesn't create that endpoint / path operation, but declares that the URL `/token` will be the one that the client should use to get the token. That information is used in OpenAPI, and then in the interactive API documentation systems.

The `oauth2_scheme` variable is an instance of `OAuth2PasswordBearer`, but it is also a "callable".

It could be called as:

`oauth2_scheme(some, parameters)`

So, it can be used with `Depends`.

Now you can pass that `oauth2_scheme` in a dependency with `Depends`

`async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):`

FastAPI will know that it can use the class OAuth2PasswordBearer (declared in a dependency) to define the security scheme in OpenAPI because it inherits from fastapi.security.oauth2.OAuth2, which in turn inherits from fastapi.security.base.SecurityBase.

All the security utilities that integrate with OpenAPI (and the automatic API docs) inherit from SecurityBase, that's how FastAPI can know how to integrate them in OpenAPI.

It will go and look in the request for that Authorization header, check if the value is Bearer plus some token, and will return the token as a str.

If it doesn't see an Authorization header, or the value doesn't have a Bearer token, it will respond with a 401 status code error (UNAUTHORIZED) directly.

You don't even have to check if the token exists to return an error. You can be sure that if your function is executed, it will have a str in that token.

### Get Current User

In the previous chapter the security system (which is based on the dependency injection system) was giving the path operation function a token as a str

```py
@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}
```

But that is still not that useful.

Let's make it give us the current user.

```py
from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


def fake_decode_token(token): # 2 Get the user
    return User(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]): # 1 Create a get_current_user dependency
    user = fake_decode_token(token) # 2 Get the user
    return user


@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]): # 3 Inject the current user
    return current_user
```

### Simple OAuth2 with Password and Bearer

```py
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

app = FastAPI()


def fake_hash_password(password: str):
    return "fakehashed" + password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user
```

OAuth2PasswordRequestForm is a class dependency that declares a form body with:

- The `username`.
- The `password`.
- An optional `scope` field as a big string, composed of strings separated by spaces.
- An optional `grant_type`.
- An optional `client_id` (we don't need it for our example).
- An optional `client_secret` (we don't need it for our example).

> Tip
>
> The OAuth2 spec actually requires a field `grant_type` with a fixed value of password, but `OAuth2PasswordRequestForm` doesn't enforce it.
>
> If you need to enforce it, use `OAuth2PasswordRequestFormStrict` instead of `OAuth2PasswordRequestForm`.

> Info
>
> The `OAuth2PasswordRequestForm` is not a special class for FastAPI as is `OAuth2PasswordBearer`.
>
> OAuth2PasswordBearer makes FastAPI know that it is a security scheme. So it is added that way to OpenAPI.
>
> But `OAuth2PasswordRequestForm` is just a class dependency that you could have written yourself, or you could have declared `Form` parameters directly.
>
> But as it's a common use case, it is provided by FastAPI directly, just to make it easier.

>Tip
>
>The instance of the dependency class `OAuth2PasswordRequestForm` won't have an attribute `scope` with the long string separated by spaces, instead, it will have a scopes attribute with the actual `list` of strings for each scope sent.
>
>We are not using scopes in this example, but the functionality is there if you need it.

**Return** the token. The response of the token endpoint must be a JSON object.

It should have a `token_type`. In our case, as we are using "Bearer" tokens, the token type should be "bearer".

And it should have an `access_token`, with a string containing our access token.

For this simple example, we are going to just be completely insecure and return the same `username` as the token.

>Tip
>
>In the next chapter, you will see a real secure implementation, with password hashing and JWT tokens.
>
>But for now, let's focus on the specific details we need.

>Tip
>
>By the spec, you should return a JSON with an `access_token` and a `token_type`, the same as in this example.
>
>This is something that you have to do yourself in your code, and make sure you use those JSON keys.
>
>It's almost the only thing that you have to remember to do correctly yourself, to be compliant with the specifications.
>
>For the rest, FastAPI handles it for you.

>Info
>
>The additional header `WWW-Authenticate` with value Bearer we are returning here is also part of the spec.
>
>Any HTTP (error) status code 401 "UNAUTHORIZED" is supposed to also return a WWW-Authenticate header.
>
>In the case of bearer tokens (our case), the value of that header should be Bearer.
>
>You can actually skip that extra header and it would still work.
>
>But it's provided here to be compliant with the specifications.
>
>Also, there might be tools that expect and use it (now or in the future) and that might be useful for you or your users, now or in the future.
>
>That's the benefit of standards...

### OAuth2 with Password (and hashing), Bearer with JWT tokens

#### About JWT

JWT means "JSON Web Tokens".

It's a standard to codify a JSON object in a long dense string without spaces. It looks like this:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

It is not encrypted, so, anyone could recover the information from the contents.

But it's signed. So, when you receive a token that you emitted, you can verify that you actually emitted it.

That way, you can create a token with an expiration of, let's say, 1 week. And then when the user comes back the next day with the token, you know that user is still logged in to your system.

After a week, the token will be expired and the user will not be authorized and will have to sign in again to get a new token. And if the user (or a third party) tried to modify the token to change the expiration, you would be able to discover it, because the signatures would not match.

If you want to play with JWT tokens and see how they work, check <https://jwt.io>

#### Install `PyJWT`

We need to install `PyJWT` to generate and verify the JWT tokens in Python

`pip install pyjwt`

>Info
>
>If you are planning to use digital signature algorithms like RSA or ECDSA, you should install the cryptography library dependency pyjwt[crypto].
>
>You can read more about it in the PyJWT Installation docs

#### Install passlib

`PassLib` is a great Python package to handle password hashes.

It supports many secure hashing algorithms and utilities to work with them.

The recommended algorithm is "Bcrypt"

`pip install "passlib[bcrypt]"`

>Tip
>
>With passlib, you could even configure it to be able to read passwords created by Django, a Flask security plug-in or many others.
>
>So, you would be able to, for example, share the same data from a Django application in a database with a FastAPI application. Or gradually migrate a Django application using the same database.
>
>And your users would be able to login from your Django app or from your FastAPI app, at the same time.

#### main.py

```py
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext # Hash and verify the passwords
from pydantic import BaseModel

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7" # 2 Handle JWT tokens
ALGORITHM = "HS256" # 2 Handle JWT tokens
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # 2 Handle JWT tokens


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}


class Token(BaseModel): # 2 Handle JWT tokens
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # Hash and verify the passwords

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


def verify_password(plain_password, hashed_password):  # 1 Hash and verify the passwords
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):  # 1 Hash and verify the passwords
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):  # 1 Hash and verify the passwords
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None): # 2 Handle JWT tokens
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]): # 3 Update the dependencies
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token") # 4 Update the /token path operation¶
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]
```

#### 2 Handle JWT tokens

```sh
$ openssl rand -hex 32
09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
```

- Copy the output to the variable `SECRET_KEY` (don't use the one in the example).
- Create a variable `ALGORITHM` with the algorithm used to sign the JWT token and set it to "HS256".
- Create a variable for the expiration of the token.
- Define a Pydantic Model that will be used in the token endpoint for the response.
- Create a utility function to generate a new access token

#### 3 Update the dependencies

- Update get_current_user to receive the same token as before, but this time, using JWT tokens.
- Decode the received token, verify it, and return the current user.
- If the token is invalid, return an HTTP error right away.

#### 4 Update the /token path operation

- Create a timedelta with the expiration time of the token.
- Create a real JWT access token and return it.

#### Technical details about the JWT "subject" sub

The JWT specification says that there's a key sub, with the subject of the token.

It's optional to use it, but that's where you would put the user's identification, so we are using it here.

JWT might be used for other things apart from identifying a user and allowing them to perform operations directly on your API.

For example, you could identify a "car" or a "blog post".

Then you could add permissions about that entity, like "drive" (for the car) or "edit" (for the blog).

And then, you could give that JWT token to a user (or bot), and they could use it to perform those actions (drive the car, or edit the blog post) without even needing to have an account, just with the JWT token your API generated for that.

Using these ideas, JWT can be used for way more sophisticated scenarios.

In those cases, several of those entities could have the same ID, let's say foo (a user foo, a car foo, and a blog post foo).

So, to avoid ID collisions, when creating the JWT token for the user, you could prefix the value of the sub key, e.g. with username:. So, in this example, the value of sub could have been: username:johndoe.

The important thing to keep in mind is that the sub key should have a unique identifier across the entire application, and it should be a string.

#### Advanced usage with scopes

OAuth2 has the notion of "scopes".

You can use them to add a specific set of permissions to a JWT token.

Then you can give this token to a user directly or a third party, to interact with your API with a set of restrictions.

You can learn how to use them and how they are integrated into FastAPI later in the Advanced User Guide.

### Middleware

You can add middleware to FastAPI applications.

A "middleware" is a function that works with every request before it is processed by any specific path operation. And also with every response before returning it.

- It takes each request that comes to your application.
- It can then do something to that request or run any needed code.
- Then it passes the request to be processed by the rest of the application (by some path operation).
- It then takes the response generated by the application (by some path operation).
- It can do something to that response or run any needed code.
- Then it returns the response.

#### Create a middleware

To create a middleware you use the decorator @app.middleware("http") on top of a function.

The middleware function receives:

- The request.
- A function call_next that will receive the request as a parameter.
  - This function will pass the request to the corresponding path operation.
  - Then it returns the response generated by the corresponding path operation.
- You can then further modify the response before returning it.

> Tip
>
>Keep in mind that custom proprietary headers can be added using the 'X-' prefix.
>
>But if you have custom headers that you want a client in a browser to be able to see, you need to add them to your CORS configurations (CORS (Cross-Origin Resource Sharing)) using the parameter expose_headers documented in Starlette's CORS docs.

#### Before and after the response¶

You can add code to be run with the request, before any path operation receives it.

And also after the response is generated, before returning it.

For example, you could add a custom header X-Process-Time containing the time in seconds that it took to process the request and generate a response:

```py
import time

from fastapi import FastAPI, Request

app = FastAPI()


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

```

>Tip
>
>Here we use time.perf_counter() instead of time.time() because it can be more precise for these use cases. 🤓

#### Other middlewares

You can later read more about other middlewares in the [Advanced User Guide: Advanced Middleware](https://fastapi.tiangolo.com/advanced/middleware/ "Advanced User Guide: Advanced Middleware").

You will read about how to handle CORS with a middleware in the next section.

### CORS (Cross-Origin Resource Sharing)

CORS or "Cross-Origin Resource Sharing" refers to the situations when a frontend running in a browser has JavaScript code that communicates with a backend, and the backend is in a different "origin" than the frontend.

#### Origin

An origin is the combination of protocol (http, https), domain (myapp.com, localhost, localhost.tiangolo.com), and port (80, 443, 8080).

So, all these are different origins:

- `http://localhost`
- `https://localhost`
- `http://localhost:8080`

Even if they are all in localhost, they use different protocols or ports, so, they are different "origins".

#### Steps

So, let's say you have a frontend running in your browser at http://localhost:8080, and its JavaScript is trying to communicate with a backend running at http://localhost (because we don't specify a port, the browser will assume the default port 80).

Then, the browser will send an HTTP OPTIONS request to the :80-backend, and if the backend sends the appropriate headers authorizing the communication from this different origin (http://localhost:8080) then the :8080-browser will let the JavaScript in the frontend send its request to the :80-backend.

To achieve this, the :80-backend must have a list of "allowed origins".

In this case, the list would have to include http://localhost:8080 for the :8080-frontend to work correctly.

#### Wildcards

It's also possible to declare the list as "*" (a "wildcard") to say that all are allowed.

But that will only allow certain types of communication, excluding everything that involves credentials: Cookies, Authorization headers like those used with Bearer Tokens, etc.

So, for everything to work correctly, it's better to specify explicitly the allowed origins.

#### Use CORSMiddleware

You can configure it in your FastAPI application using the `CORSMiddleware`.

- Import `CORSMiddleware`.
- Create a list of allowed origins (as strings).
- Add it as a "middleware" to your FastAPI application.

You can also specify whether your backend allows:

- Credentials (Authorization headers, Cookies, etc).
- Specific HTTP methods (POST, PUT) or all of them with the wildcard "*".
- Specific HTTP headers or all of them with the wildcard "*".

```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}
```

The default parameters used by the CORSMiddleware implementation are restrictive by default, so you'll need to explicitly enable particular origins, methods, or headers, in order for browsers to be permitted to use them in a Cross-Domain context.

The following arguments are supported:

- allow_origins - A list of origins that should be permitted to make cross-origin requests. E.g. ['https://example.org', 'https://www.example.org']. You can use ['*'] to allow any origin.
- allow_origin_regex - A regex string to match against origins that should be permitted to make cross-origin requests. e.g. 'https://.*\.example\.org'.
- allow_methods - A list of HTTP methods that should be allowed for cross-origin requests. Defaults to ['GET']. You can use ['*'] to allow all standard methods.
- allow_headers - A list of HTTP request headers that should be supported for cross-origin requests. Defaults to []. You can use ['*'] to allow all headers. The Accept, Accept-Language, Content-Language and Content-Type headers are always allowed for simple CORS requests.
- allow_credentials - Indicate that cookies should be supported for cross-origin requests. Defaults to False. Also, allow_origins cannot be set to ['*'] for credentials to be allowed, origins must be specified.
- expose_headers - Indicate any response headers that should be made accessible to the browser. Defaults to [].
- max_age - Sets a maximum time in seconds for browsers to cache CORS responses. Defaults to 600.

The middleware responds to two particular types of HTTP request...

#### CORS preflight requests

These are any OPTIONS request with Origin and Access-Control-Request-Method headers.

In this case the middleware will intercept the incoming request and respond with appropriate CORS headers, and either a 200 or 400 response for informational purposes.
Simple requests¶

Any request with an Origin header. In this case the middleware will pass the request through as normal, but will include appropriate CORS headers on the response.
More info¶

For more info about CORS, check the [Mozilla CORS documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### SQL (Relational) Databases

<https://fastapi.tiangolo.com/tutorial/sql-databases/#sql-relational-databases>

### Bigger Applications - Multiple Files

#### An example file structure

```sh
.
├── app                  # "app" is a Python package
│   ├── __init__.py      # this file makes "app" a "Python package"
│   ├── main.py          # "main" module, e.g. import app.main
│   ├── dependencies.py  # "dependencies" module, e.g. import app.dependencies
│   └── routers          # "routers" is a "Python subpackage"
│   │   ├── __init__.py  # makes "routers" a "Python subpackage"
│   │   ├── items.py     # "items" submodule, e.g. import app.routers.items
│   │   └── users.py     # "users" submodule, e.g. import app.routers.users
│   └── internal         # "internal" is a "Python subpackage"
│       ├── __init__.py  # makes "internal" a "Python subpackage"
│       └── admin.py     # "admin" submodule, e.g. import app.internal.admin
```

#### app/routers/users.py

```py

from fastapi import APIRouter # 1 Import APIRouter

router = APIRouter()


@router.get("/users/", tags=["users"]) # 2 Path operations with APIRouter
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


@router.get("/users/me", tags=["users"]) # 2 Path operations with APIRouter
async def read_user_me():
    return {"username": "fakecurrentuser"}


@router.get("/users/{username}", tags=["users"]) # 2 Path operations with APIRouter
async def read_user(username: str):
    return {"username": username}
```

#### app/dependencies.py

```py

from typing import Annotated

from fastapi import Header, HTTPException


async def get_token_header(x_token: Annotated[str, Header()]):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def get_query_token(token: str):
    if token != "jessica":
        raise HTTPException(status_code=400, detail="No Jessica token provided")
```

#### app/routers/items.py

```py

rom fastapi import APIRouter, Depends, HTTPException

from ..dependencies import get_token_header

router = APIRouter(
    prefix="/items",
    tags=["items"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


fake_items_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}


@router.get("/")
async def read_items():
    return fake_items_db


@router.get("/{item_id}")
async def read_item(item_id: str):
    if item_id not in fake_items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"name": fake_items_db[item_id]["name"], "item_id": item_id}


@router.put(
    "/{item_id}",
    tags=["custom"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_item(item_id: str):
    if item_id != "plumbus":
        raise HTTPException(
            status_code=403, detail="You can only update the item: plumbus"
        )
    return {"item_id": item_id, "name": "The great Plumbus"}
```

#### app/main.py

```py
from fastapi import Depends, FastAPI

from .dependencies import get_query_token, get_token_header
from .internal import admin
from .routers import items, users

app = FastAPI(dependencies=[Depends(get_query_token)])


app.include_router(users.router)
app.include_router(items.router)
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_token_header)],
    responses={418: {"description": "I'm a teapot"}},
)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
```

#### app/internal/admin.py

```py
from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def update_admin():
    return {"message": "Admin getting schwifty"}
```

#### fastapi dev app/main.py

<http://127.0.0.1:8000/docs>

#### Include the same router multiple times with different prefix¶

You can also use `.include_router()` multiple times with the same router using different prefixes.

This could be useful, for example, to expose the same API under different prefixes, e.g. /api/v1 and /api/latest.

This is an advanced usage that you might not really need, but it's there in case you do.

#### Include an APIRouter in another

The same way you can include an APIRouter in a FastAPI application, you can include an APIRouter in another APIRouter using:

router.include_router(other_router)

Make sure you do it before including router in the FastAPI app, so that the path operations from other_router are also included.

### Background Tasks

You can define background tasks to be run after returning a response.

This is useful for operations that need to happen after a request, but that the client doesn't really have to be waiting for the operation to complete before receiving the response.

This includes, for example:

-Email notifications sent after performing an action:
  -As connecting to an email server and sending an email tends to be "slow" (several seconds), you can return the response right away and send the email notification in the background.
-Processing data:
  -For example, let's say you receive a file that must go through a slow process, you can return a response of "Accepted" (HTTP 202) and process the file in the background.

```py
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()


def write_notification(email: str, message=""):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)


@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent in the background"}

```

#### Dependency Injection

Using BackgroundTasks also works with the dependency injection system, you can declare a parameter of type BackgroundTasks at multiple levels: in a path operation function, in a dependency (dependable), in a sub-dependency, etc.

FastAPI knows what to do in each case and how to reuse the same object, so that all the background tasks are merged together and are run in the background afterwards:

```py
from typing import Annotated

from fastapi import BackgroundTasks, Depends, FastAPI

app = FastAPI()


def write_log(message: str):
    with open("log.txt", mode="a") as log:
        log.write(message)


def get_query(background_tasks: BackgroundTasks, q: str | None = None):
    if q:
        message = f"found query: {q}\n"
        background_tasks.add_task(write_log, message)
    return q


@app.post("/send-notification/{email}")
async def send_notification(
    email: str, background_tasks: BackgroundTasks, q: Annotated[str, Depends(get_query)]
):
    message = f"message to {email}\n"
    background_tasks.add_task(write_log, message)
    return {"message": "Message sent"}

```

In this example, the messages will be written to the log.txt file after the response is sent.

If there was a query in the request, it will be written to the log in a background task.

And then another background task generated at the path operation function will write a message using the email path parameter.

#### Caveat

If you need to perform heavy background computation and you don't necessarily need it to be run by the same process (for example, you don't need to share memory, variables, etc), you might benefit from using other bigger tools like [Celery](https://docs.celeryq.dev/).

They tend to require more complex configurations, a message/job queue manager, like RabbitMQ or Redis, but they allow you to run background tasks in multiple processes, and especially, in multiple servers.

But if you need to access variables and objects from the same FastAPI app, or you need to perform small background tasks (like sending an email notification), you can simply just use BackgroundTasks.

### Metadata and Docs URLs

```py
from fastapi import FastAPI

# You can write Markdown in the description field and it will be rendered in the output.
description = """
ChimichangApp API helps you do awesome stuff. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

app = FastAPI(
    title="ChimichangApp",
    description=description,
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Deadpoolio the Amazing",
        "url": "http://x-force.example.com/contact/",
        "email": "dp@x-force.example.com",
    },
    license_info={ # License identifier
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)


@app.get("/items/")
async def read_items():
    return [{"name": "Katana"}]

```

#### Metadata for tags

```py


from fastapi import FastAPI

tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
    },
    {
        "name": "items",
        "description": "Manage items. So _fancy_ they have their own docs.",
        "externalDocs": {
            "description": "Items external docs",
            "url": "https://fastapi.tiangolo.com/",
        },
    },
]

app = FastAPI(openapi_tags=tags_metadata)


@app.get("/users/", tags=["users"]) # Use your tags
async def get_users():
    return [{"name": "Harry"}, {"name": "Ron"}]


@app.get("/items/", tags=["items"]) # Use your tags
async def get_items():
    return [{"name": "wand"}, {"name": "flying broom"}]
```

#### OpenAPI URL

By default, the OpenAPI schema is served at /openapi.json.

But you can configure it with the parameter openapi_url.

For example, to set it to be served at /api/v1/openapi.json:

```py
from fastapi import FastAPI

app = FastAPI(openapi_url="/api/v1/openapi.json")


@app.get("/items/")
async def read_items():
    return [{"name": "Foo"}]
```

If you want to disable the OpenAPI schema completely you can set `openapi_url=None`, that will also disable the documentation user interfaces that use it.

#### Docs URLs

You can configure the two documentation user interfaces included:

- Swagger UI: served at /docs.
  - You can set its URL with the parameter docs_url.
  - You can disable it by setting docs_url=None.
- ReDoc: served at /redoc.
  - You can set its URL with the parameter redoc_url.
  - You can disable it by setting redoc_url=None.

For example, to set Swagger UI to be served at /documentation and disable ReDoc:

```py
from fastapi import FastAPI

app = FastAPI(docs_url="/documentation", redoc_url=None)


@app.get("/items/")
async def read_items():
    return [{"name": "Foo"}]
```

### Static Files

```py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles # 1 Use StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static") # 1 Use StaticFiles
```

#### Details

The first `"/static"` refers to the sub-path this "sub-application" will be "mounted" on. So, any path that starts with "/static" will be handled by it.

The `directory="static`" refers to the name of the directory that contains your static files.

The `name="static"` gives it a name that can be used internally by FastAPI.

All these parameters can be different than "static", adjust them with the needs and specific details of your own application.

For more details and options check [Starlette's docs about Static Files](https://www.starlette.io/staticfiles/).

### Testing 

Thanks to [Starlette](https://www.starlette.io/testclient/), testing FastAPI applications is easy and enjoyable.

It is based on [HTTPX](https://www.python-httpx.org/), which in turn is designed based on Requests, so it's very familiar and intuitive.

With it, you can use [pytest](pytest) directly with FastAPI.

```py
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()


@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}
```

>Tip
>
>If you want to call async functions in your tests apart from sending requests to your FastAPI application (e.g. asynchronous database functions), have a look at the [Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/) in the advanced tutorial.

```sh
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py

```

```py
# app/main.py
from typing import Annotated

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel

fake_secret_token = "coneofsilence"

fake_db = {
    "foo": {"id": "foo", "title": "Foo", "description": "There goes my hero"},
    "bar": {"id": "bar", "title": "Bar", "description": "The bartenders"},
}

app = FastAPI()


class Item(BaseModel):
    id: str
    title: str
    description: str | None = None


@app.get("/items/{item_id}", response_model=Item)
async def read_main(item_id: str, x_token: Annotated[str, Header()]):
    if x_token != fake_secret_token:
        raise HTTPException(status_code=400, detail="Invalid X-Token header")
    if item_id not in fake_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return fake_db[item_id]


@app.post("/items/", response_model=Item)
async def create_item(item: Item, x_token: Annotated[str, Header()]):
    if x_token != fake_secret_token:
        raise HTTPException(status_code=400, detail="Invalid X-Token header")
    if item.id in fake_db:
        raise HTTPException(status_code=409, detail="Item already exists")
    fake_db[item.id] = item
    return item
```

```py
# app/test_main.py
from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_read_item():
    response = client.get("/items/foo", headers={"X-Token": "coneofsilence"})
    assert response.status_code == 200
    assert response.json() == {
        "id": "foo",
        "title": "Foo",
        "description": "There goes my hero",
    }


def test_read_item_bad_token():
    response = client.get("/items/foo", headers={"X-Token": "hailhydra"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid X-Token header"}


def test_read_nonexistent_item():
    response = client.get("/items/baz", headers={"X-Token": "coneofsilence"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}


def test_create_item():
    response = client.post(
        "/items/",
        headers={"X-Token": "coneofsilence"},
        json={"id": "foobar", "title": "Foo Bar", "description": "The Foo Barters"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": "foobar",
        "title": "Foo Bar",
        "description": "The Foo Barters",
    }


def test_create_item_bad_token():
    response = client.post(
        "/items/",
        headers={"X-Token": "hailhydra"},
        json={"id": "bazz", "title": "Bazz", "description": "Drop the bazz"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid X-Token header"}


def test_create_existing_item():
    response = client.post(
        "/items/",
        headers={"X-Token": "coneofsilence"},
        json={
            "id": "foo",
            "title": "The Foo ID Stealers",
            "description": "There goes my stealer",
        },
    )
    assert response.status_code == 409
    assert response.json() == {"detail": "Item already exists"}

```

### Debugging

#### Call uvicorn

```py
import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    a = "a"
    b = "b" + a
    return {"hello world": b}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### Run your code with your debugger

For example, in Visual Studio Code, you can:

- Go to the "Debug" panel.
- "Add configuration...".
- Select "Python"
- Run the debugger with the option "Python: Current File (Integrated Terminal)".

## Advanced User Guide

### Path Operation Advanced Configuration 

#### Exclude from OpenAPI

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/items/", include_in_schema=False)
async def read_items():
    return [{"item_id": "Foo"}]
```

#### Advanced description from docstring

You can limit the lines used from the docstring of a path operation function for OpenAPI.

Adding an `\f` (an escaped "form feed" character) causes FastAPI to truncate the output used for OpenAPI at this point.

```py
from typing import Set, Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None
    tags: Set[str] = set()


@app.post("/items/", response_model=Item, summary="Create an item")
async def create_item(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    \f 
    :param item: User input.
    """
    return item
```

#### Additional Responses

##### Additional Response with model

```py
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class Item(BaseModel):
    id: str
    value: str


class Message(BaseModel):
    message: str


app = FastAPI()


@app.get("/items/{item_id}", response_model=Item, responses={404: {"model": Message}})
async def read_item(item_id: str):
    if item_id == "foo":
        return {"id": "foo", "value": "there goes my hero"}
    return JSONResponse(status_code=404, content={"message": "Item not found"})

```

The generated responses in the OpenAPI for this path operation will be:

```json
{
    "responses": {
        "404": {
            "description": "Additional Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Message"
                    }
                }
            }
        },
        "200": {
            "description": "Successful Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Item"
                    }
                }
            }
        },
        "422": {
            "description": "Validation Error",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/HTTPValidationError"
                    }
                }
            }
        }
    }
}
```

The schemas are referenced to another place inside the OpenAPI schema:

```json
{
    "components": {
        "schemas": {
            "Message": {
                "title": "Message",
                "required": [
                    "message"
                ],
                "type": "object",
                "properties": {
                    "message": {
                        "title": "Message",
                        "type": "string"
                    }
                }
            },
            "Item": {
                "title": "Item",
                "required": [
                    "id",
                    "value"
                ],
                "type": "object",
                "properties": {
                    "id": {
                        "title": "Id",
                        "type": "string"
                    },
                    "value": {
                        "title": "Value",
                        "type": "string"
                    }
                }
            },
            "ValidationError": {
                "title": "ValidationError",
                "required": [
                    "loc",
                    "msg",
                    "type"
                ],
                "type": "object",
                "properties": {
                    "loc": {
                        "title": "Location",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "msg": {
                        "title": "Message",
                        "type": "string"
                    },
                    "type": {
                        "title": "Error Type",
                        "type": "string"
                    }
                }
            },
            "HTTPValidationError": {
                "title": "HTTPValidationError",
                "type": "object",
                "properties": {
                    "detail": {
                        "title": "Detail",
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/ValidationError"
                        }
                    }
                }
            }
        }
    }
}

```

##### Additional media types for the main response

You can use this same responses parameter to add different media types for the same main response.

For example, you can add an additional media type of image/png, declaring that your path operation can return a JSON object (with media type application/json) or a PNG image:

```py
from typing import Union

from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel


class Item(BaseModel):
    id: str
    value: str


app = FastAPI()


@app.get(
    "/items/{item_id}",
    response_model=Item,
    responses={
        200: {
            "content": {"image/png": {}},
            "description": "Return the JSON item or an image.",
        }
    },
)
async def read_item(item_id: str, img: Union[bool, None] = None):
    if img:
        return FileResponse("image.png", media_type="image/png")
    else:
        return {"id": "foo", "value": "there goes my hero"}
```

##### Combining information

You can also combine response information from multiple places, including the response_model, status_code, and responses parameters.

You can declare a response_model, using the default status code 200 (or a custom one if you need), and then declare additional information for that same response in responses, directly in the OpenAPI schema.

FastAPI will keep the additional information from responses, and combine it with the JSON Schema from your model.

For example, you can declare a response with a status code 404 that uses a Pydantic model and has a custom description.

And a response with a status code 200 that uses your response_model, but includes a custom example:

```py
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class Item(BaseModel):
    id: str
    value: str


class Message(BaseModel):
    message: str


app = FastAPI()


@app.get(
    "/items/{item_id}",
    response_model=Item,
    responses={
        404: {"model": Message, "description": "The item was not found"},
        200: {
            "description": "Item requested by ID",
            "content": {
                "application/json": {
                    "example": {"id": "bar", "value": "The bar tenders"}
                }
            },
        },
    },
)
async def read_item(item_id: str):
    if item_id == "foo":
        return {"id": "foo", "value": "there goes my hero"}
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})
```

##### Combine predefined responses and custom ones

```py
from typing import Union

from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel


class Item(BaseModel):
    id: str
    value: str


responses = {
    404: {"description": "Item not found"},
    302: {"description": "The item was moved"},
    403: {"description": "Not enough privileges"},
}


app = FastAPI()


@app.get(
    "/items/{item_id}",
    response_model=Item,
    responses={**responses, 200: {"content": {"image/png": {}}}},
)
async def read_item(item_id: str, img: Union[bool, None] = None):
    if img:
        return FileResponse("image.png", media_type="image/png")
    else:
        return {"id": "foo", "value": "there goes my hero"}
```

#### OpenAPI Extra

<https://fastapi.tiangolo.com/advanced/path-operation-advanced-configuration/#openapi-extra>

### Additional Status Codes

By default, FastAPI will return the responses using a `JSONResponse`, putting the content you return from your path operation inside of that `JSONResponse`.

It will use the default status code or the one you set in your path operation.

If you want to return additional status codes apart from the main one, you can do that by returning a Response directly, like a JSONResponse, and set the additional status code directly.

For example, let's say that you want to have a path operation that allows to update items, and returns HTTP status codes of 200 "OK" when successful.

But you also want it to accept new items. And when the items didn't exist before, it creates them, and returns an HTTP status code of 201 "Created".

To achieve that, import JSONResponse, and return your content there directly, setting the status_code that you want:

```py
from typing import Annotated

from fastapi import Body, FastAPI, status
from fastapi.responses import JSONResponse

app = FastAPI()

items = {"foo": {"name": "Fighters", "size": 6}, "bar": {"name": "Tenders", "size": 3}}


@app.put("/items/{item_id}")
async def upsert_item(
    item_id: str,
    name: Annotated[str | None, Body()] = None,
    size: Annotated[int | None, Body()] = None,
):
    if item_id in items:
        item = items[item_id]
        item["name"] = name
        item["size"] = size
        return item
    else:
        item = {"name": name, "size": size}
        items[item_id] = item
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=item)
```

#### OpenAPI and API docs

If you return additional status codes and responses directly, they won't be included in the OpenAPI schema (the API docs), because FastAPI doesn't have a way to know beforehand what you are going to return.

But you can document that in your code, using: [Additional Responses](#### Additional Responses)

### Return a Response Directly

When you return a Response directly its data is not validated, converted (serialized), nor documented automatically.

But you can still document it as described in Additional Responses in OpenAPI

#### Using the jsonable_encoder in a Response

When you create a FastAPI path operation you can normally return any data from it: a dict, a list, a Pydantic model, a database model, etc.

By default, FastAPI would automatically convert that return value to JSON using the jsonable_encoder explained in JSON Compatible Encoder.

Then, behind the scenes, it would put that JSON-compatible data (e.g. a dict) inside of a JSONResponse that would be used to send the response to the client.

But you can return a JSONResponse directly from your path operations.

It might be useful, for example, to return custom headers or cookies.

You cannot put a Pydantic model in a JSONResponse without first converting it to a dict with all the data types (like datetime, UUID, etc) converted to JSON-compatible types.

For those cases, you can use the jsonable_encoder to convert your data before passing it to a response:

```py
from datetime import datetime
from typing import Union

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class Item(BaseModel):
    title: str
    timestamp: datetime
    description: Union[str, None] = None


app = FastAPI()


@app.put("/items/{id}")
def update_item(id: str, item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    return JSONResponse(content=json_compatible_item_data)
```

#### Returning a custom Response

he example above shows all the parts you need, but it's not very useful yet, as you could have just returned the item directly, and FastAPI would put it in a JSONResponse for you, converting it to a dict, etc. All that by default.

Now, let's see how you could use that to return a custom response.

Let's say that you want to return an XML response.

You could put your XML content in a string, put that in a Response, and return it:

```py
from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/legacy/")
def get_legacy_data():
    data = """<?xml version="1.0"?>
    <shampoo>
    <Header>
        Apply shampoo here.
    </Header>
    <Body>
        You'll have to use soap here.
    </Body>
    </shampoo>
    """
    return Response(content=data, media_type="application/xml")

```

### Custom Response - HTML, Stream, File, others

#### Use ORJSONResponse

```py
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

app = FastAPI()


@app.get("/items/", response_class=ORJSONResponse)
async def read_items():
    return ORJSONResponse([{"item_id": "Foo"}])

```

#### HTML Response

```py


from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/items/", response_class=HTMLResponse)
async def read_items():
    return """
    <html>
        <head>
            <title>Some HTML in here</title>
        </head>
        <body>
            <h1>Look ma! HTML!</h1>
        </body>
    </html>
    """
```

If you want to override the response from inside of the function but at the same time document the "media type" in OpenAPI, you can use the response_class parameter AND return a Response object.

```py
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


def generate_html_response():
    html_content = """
    <html>
        <head>
            <title>Some HTML in here</title>
        </head>
        <body>
            <h1>Look ma! HTML!</h1>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@app.get("/items/", response_class=HTMLResponse)
async def read_items():
    return generate_html_response()
```

#### Available responses

##### Response

The main Response class, all the other responses inherit from it.

You can return it directly.

It accepts the following parameters:

- content - A str or bytes.
- status_code - An int HTTP status code.
- headers - A dict of strings.
- media_type - A str giving the media type. E.g. "text/html".

FastAPI (actually Starlette) will automatically include a Content-Length header. It will also include a Content-Type header, based on the media_type and appending a charset for text types.

```py
from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/legacy/")
def get_legacy_data():
    data = """<?xml version="1.0"?>
    <shampoo>
    <Header>
        Apply shampoo here.
    </Header>
    <Body>
        You'll have to use soap here.
    </Body>
    </shampoo>
    """
    return Response(content=data, media_type="application/xml")
```

##### HTMLResponse¶

Takes some text or bytes and returns an HTML response, as you read above.

##### PlainTextResponse

```py
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()


@app.get("/", response_class=PlainTextResponse)
async def main():
    return "Hello World"
```

##### JSONResponse

Takes some data and returns an application/json encoded response.

This is the default response used in FastAPI, as you read above.

##### ORJSONResponse

A fast alternative JSON response using orjson, as you read above.

This requires installing orjson for example with `pip install orjson`.

##### UJSONResponse

An alternative JSON response using ujson.

This requires installing ujson for example with pip install ujson.

```py
from fastapi import FastAPI
from fastapi.responses import UJSONResponse

app = FastAPI()


@app.get("/items/", response_class=UJSONResponse)
async def read_items():
    return [{"item_id": "Foo"}]
```

##### RedirectResponse

Returns an HTTP redirect. Uses a 307 status code (Temporary Redirect) by default.

You can return a RedirectResponse directly:

```py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/typer")
async def redirect_typer():
    return RedirectResponse("https://typer.tiangolo.com")
```

Or you can use it in the response_class parameter:

```py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/fastapi", response_class=RedirectResponse)
async def redirect_fastapi():
    return "https://fastapi.tiangolo.com"
```

If you do that, then you can return the URL directly from your path operation function.

In this case, the status_code used will be the default one for the RedirectResponse, which is 307.

You can also use the status_code parameter combined with the response_class parameter:

```py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/pydantic", response_class=RedirectResponse, status_code=302)
async def redirect_pydantic():
    return "https://docs.pydantic.dev/"
```

##### StreamingResponse

Тakes an async generator or a normal generator/iterator and streams the response body.

```py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()


async def fake_video_streamer():
    for i in range(10):
        yield b"some fake video bytes"


@app.get("/")
async def main():
    return StreamingResponse(fake_video_streamer())
```

###### Using StreamingResponse with file-like objects

If you have a file-like object (e.g. the object returned by open()), you can create a generator function to iterate over that file-like object.

That way, you don't have to read it all first in memory, and you can pass that generator function to the StreamingResponse, and return it.

This includes many libraries to interact with cloud storage, video processing, and others.

```py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

some_file_path = "large-video-file.mp4"
app = FastAPI()


@app.get("/")
def main():
    def iterfile():  # (1)
        with open(some_file_path, mode="rb") as file_like:  # (2)
            yield from file_like  # (3)

    return StreamingResponse(iterfile(), media_type="video/mp4")
```

1. This is the generator function. It's a "generator function" because it contains yield statements inside.
2. By using a with block, we make sure that the file-like object is closed after the generator function is done. So, after it finishes sending the response.
3. This yield from tells the function to iterate over that thing named file_like. And then, for each part iterated, yield that part as coming from this generator function (iterfile).

So, it is a generator function that transfers the "generating" work to something else internally.

By doing it this way, we can put it in a with block, and that way, ensure that the file-like object is closed after finishing.

##### FileResponse

Asynchronously streams a file as the response.

Takes a different set of arguments to instantiate than the other response types:

- path - The file path to the file to stream.
- headers - Any custom headers to include, as a dictionary.
- media_type - A string giving the media type. If unset, the filename or path will be used to infer a media type.
- filename - If set, this will be included in the response Content-Disposition.

File responses will include appropriate Content-Length, Last-Modified and ETag headers.

```py
from fastapi import FastAPI
from fastapi.responses import FileResponse

some_file_path = "large-video-file.mp4"
app = FastAPI()


@app.get("/")
async def main():
    return FileResponse(some_file_path)
```

You can also use the response_class parameter:

```py
from fastapi import FastAPI
from fastapi.responses import FileResponse

some_file_path = "large-video-file.mp4"
app = FastAPI()


@app.get("/", response_class=FileResponse)
async def main():
    return some_file_path
```

##### Custom response class

You can create your own custom response class, inheriting from Response and using it.

For example, let's say that you want to use orjson, but with some custom settings not used in the included ORJSONResponse class.

Let's say you want it to return indented and formatted JSON, so you want to use the orjson option orjson.OPT_INDENT_2.

You could create a CustomORJSONResponse. The main thing you have to do is create a Response.render(content) method that returns the content as bytes:

```py
from typing import Any

import orjson
from fastapi import FastAPI, Response

app = FastAPI()


class CustomORJSONResponse(Response):
    media_type = "application/json"

    def render(self, content: Any) -> bytes:
        assert orjson is not None, "orjson must be installed"
        return orjson.dumps(content, option=orjson.OPT_INDENT_2)


@app.get("/", response_class=CustomORJSONResponse)
async def main():
    return {"message": "Hello World"}
```

Now instead of returning:

```json
{"message": "Hello World"}
````

...this response will return:

```json
{
  "message": "Hello World"
}
```

#### Default response class

When creating a FastAPI class instance or an APIRouter you can specify which response class to use by default.

The parameter that defines this is default_response_class.

In the example below, FastAPI will use ORJSONResponse by default, in all path operations, instead of JSONResponse.

```py
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

app = FastAPI(default_response_class=ORJSONResponse)


@app.get("/items/")
async def read_items():
    return [{"item_id": "Foo"}]
```

### Response Cookies

#### Use a Response parameter

You can declare a parameter of type Response in your path operation function.

And then you can set cookies in that temporal response object.

```py
from fastapi import FastAPI, Response

app = FastAPI()


@app.post("/cookie-and-object/")
def create_cookie(response: Response):
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return {"message": "Come to the dark side, we have cookies"}
```

And then you can return any object you need, as you normally would (a dict, a database model, etc).

And if you declared a response_model, it will still be used to filter and convert the object you returned.

FastAPI will use that temporal response to extract the cookies (also headers and status code), and will put them in the final response that contains the value you returned, filtered by any response_model.

You can also declare the Response parameter in dependencies, and set cookies (and headers) in them.

#### Return a Response directly

You can also create cookies when returning a Response directly in your code.

To do that, you can create a response as described in Return a Response Directly.

Then set Cookies in it, and then return it:

```py
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.post("/cookie/")
def create_cookie():
    content = {"message": "Come to the dark side, we have cookies"}
    response = JSONResponse(content=content)
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return response
```

Keep in mind that if you return a response directly instead of using the Response parameter, FastAPI will return it directly.

So, you will have to make sure your data is of the correct type. E.g. it is compatible with JSON, if you are returning a JSONResponse.

And also that you are not sending any data that should have been filtered by a response_model.

### Response Headers

#### Use a Response parameter

You can declare a parameter of type Response in your path operation function (as you can do for cookies).

And then you can set headers in that temporal response object.

```py
from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/headers-and-object/")
def get_headers(response: Response):
    response.headers["X-Cat-Dog"] = "alone in the world"
    return {"message": "Hello World"}
```

And then you can return any object you need, as you normally would (a dict, a database model, etc).

And if you declared a response_model, it will still be used to filter and convert the object you returned.

FastAPI will use that temporal response to extract the headers (also cookies and status code), and will put them in the final response that contains the value you returned, filtered by any response_model.

You can also declare the Response parameter in dependencies, and set headers (and cookies) in them.

#### Return a Response directly

You can also add headers when you return a Response directly.

Create a response as described in Return a Response Directly and pass the headers as an additional parameter:

```py
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/headers/")
def get_headers():
    content = {"message": "Hello World"}
    headers = {"X-Cat-Dog": "alone in the world", "Content-Language": "en-US"}
    return JSONResponse(content=content, headers=headers)
```

#### Custom Headers

Keep in mind that custom proprietary headers can be added using the 'X-' prefix.

But if you have custom headers that you want a client in a browser to be able to see, you need to add them to your CORS configurations (read more in CORS (Cross-Origin Resource Sharing)), using the parameter expose_headers documented in [Starlette's CORS docs](https://www.starlette.io/middleware/#corsmiddleware).

### Response - Change Status Code

You probably read before that you can set a default Response Status Code.

But in some cases you need to return a different status code than the default.

#### Use case

For example, imagine that you want to return an HTTP status code of "OK" 200 by default.

But if the data didn't exist, you want to create it, and return an HTTP status code of "CREATED" 201.

But you still want to be able to filter and convert the data you return with a response_model.

For those cases, you can use a Response parameter.

##### Use a Response parameter

```py
from fastapi import FastAPI, Response, status

app = FastAPI()

tasks = {"foo": "Listen to the Bar Fighters"}


@app.put("/get-or-create-task/{task_id}", status_code=200)
def get_or_create_task(task_id: str, response: Response):
    if task_id not in tasks:
        tasks[task_id] = "This didn't exist before"
        response.status_code = status.HTTP_201_CREATED
    return tasks[task_id]
```

And then you can return any object you need, as you normally would (a dict, a database model, etc).

And if you declared a response_model, it will still be used to filter and convert the object you returned.

FastAPI will use that temporal response to extract the status code (also cookies and headers), and will put them in the final response that contains the value you returned, filtered by any response_model.

You can also declare the Response parameter in dependencies, and set the status code in them. But keep in mind that the last one to be set will win.

### Advanced Dependencies

#### Parameterized dependencies

All the dependencies we have seen are a fixed function or class.

But there could be cases where you want to be able to set parameters on the dependency, without having to declare many different functions or classes.

Let's imagine that we want to have a dependency that checks if the query parameter q contains some fixed content.

But we want to be able to parameterize that fixed content.

#### A "callable" instance

In Python there's a way to make an instance of a class a "callable".

Not the class itself (which is already a callable), but an instance of that class.

To do that, we declare a method `__call__`:

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


class FixedContentQueryChecker:
    def __init__(self, fixed_content: str):
        self.fixed_content = fixed_content

    def __call__(self, q: str = ""):
        if q:
            return self.fixed_content in q
        return False


checker = FixedContentQueryChecker("bar")


@app.get("/query-checker/")
async def read_query_check(fixed_content_included: Annotated[bool, Depends(checker)]):
    return {"fixed_content_in_query": fixed_content_included}
```

#### Parameterize the instance

And now, we can use `__init__` to declare the parameters of the instance that we can use to "parameterize" the dependency:

```py
from typing import Annotated

from fastapi import Depends, FastAPI

app = FastAPI()


class FixedContentQueryChecker:
    def __init__(self, fixed_content: str):
        self.fixed_content = fixed_content

    def __call__(self, q: str = ""):
        if q:
            return self.fixed_content in q
        return False


checker = FixedContentQueryChecker("bar")


@app.get("/query-checker/")
async def read_query_check(fixed_content_included: Annotated[bool, Depends(checker)]):
    return {"fixed_content_in_query": fixed_content_included}
```

### Advanced Security

The next sections assume you already read the main [Tutorial - User Guide: Security](### Security)

#### OAuth2 scopes

```py
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, FastAPI, HTTPException, Security, status
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    SecurityScopes,
)
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel, ValidationError

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Chains",
        "email": "alicechains@example.com",
        "hashed_password": "$2b$12$gSvqqUPvlXP2tfVFaWK1Be7DlH.PKZbv5H8KnzzVgXXbVxpva.pFm",
        "disabled": True,
    },
}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token",
    scopes={"me": "Read information about the current user.", "items": "Read items."},
)

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    security_scopes: SecurityScopes, token: Annotated[str, Depends(oauth2_scheme)]
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (InvalidTokenError, ValidationError):
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


async def get_current_active_user(
    current_user: Annotated[User, Security(get_current_user, scopes=["me"])],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "scopes": form_data.scopes},
        expires_delta=access_token_expires,
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Security(get_current_active_user, scopes=["items"])],
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.get("/status/")
async def read_system_status(current_user: Annotated[User, Depends(get_current_user)]):
    return {"status": "ok"}
```

Dependency tree and scopes¶

Let's review again this dependency tree and the scopes.

As the get_current_active_user dependency has as a sub-dependency on get_current_user, the scope "me" declared at get_current_active_user will be included in the list of required scopes in the security_scopes.scopes passed to get_current_user.

The path operation itself also declares a scope, "items", so this will also be in the list of security_scopes.scopes passed to get_current_user.

Here's how the hierarchy of dependencies and scopes looks like:

- The path operation read_own_items has:
  - Required scopes `["items"]` with the dependency:
  - get_current_active_user:
    - The dependency function get_current_active_user has:
      - Required scopes `["me"]` with the dependency:
      - get_current_user:
        - The dependency function get_current_user has:
            -No scopes required by itself.
          - A dependency using oauth2_scheme.
          - A security_scopes parameter of type SecurityScopes:
            - This security_scopes parameter has a property scopes with a list containing all these scopes declared above, so:
              - security_scopes.scopes will contain `["me", "items"]` for the path operation read_own_items.
              - security_scopes.scopes will contain `["me"]` for the path operation read_users_me, because it is declared in the dependency get_current_active_user.
              - security_scopes.scopes will contain `[]` (nothing) for the path operation read_system_status, because it didn't declare any Security with scopes, and its dependency, get_current_user, doesn't declare any scopes either.

>Tip
>
>The important and "magic" thing here is that get_current_user will have a different list of scopes to check for each path operation.
>
>All depending on the scopes declared in each path operation and each dependency in the dependency tree for that specific path operation.

If you open the API docs, you can authenticate and specify which scopes you want to authorize.

If you don't select any scope, you will be "authenticated", but when you try to access `/users/me/` or `/users/me/items/` you will get an error saying that you don't have enough permissions. You will still be able to access `/status/`.

And if you select the scope me but not the scope items, you will be able to access `/users/me/` but not `/users/me/items/`.

That's what would happen to a third party application that tried to access one of these path operations with a token provided by a user, depending on how many permissions the user gave the application.

##### About third party integrations

In this example we are using the OAuth2 "password" flow.

This is appropriate when we are logging in to our own application, probably with our own frontend.

Because we can trust it to receive the username and password, as we control it.

But if you are building an OAuth2 application that others would connect to (i.e., if you are building an authentication provider equivalent to Facebook, Google, GitHub, etc.) you should use one of the other flows.

The most common is the implicit flow.

The most secure is the code flow, but it's more complex to implement as it requires more steps. As it is more complex, many providers end up suggesting the implicit flow.

#### HTTP Basic Auth

For the simplest cases, you can use HTTP Basic Auth.

In HTTP Basic Auth, the application expects a header that contains a username and a password.

If it doesn't receive it, it returns an HTTP 401 "Unauthorized" error.

And returns a header WWW-Authenticate with a value of Basic, and an optional realm parameter.

That tells the browser to show the integrated prompt for a username and password.

Then, when you type that username and password, the browser sends them in the header automatically.

```py
import secrets
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()

security = HTTPBasic()


def get_current_username(
    credentials: Annotated[HTTPBasicCredentials, Depends(security)],
):
    current_username_bytes = credentials.username.encode("utf8")
    correct_username_bytes = b"stanleyjobson"
    is_correct_username = secrets.compare_digest(
        current_username_bytes, correct_username_bytes
    )
    current_password_bytes = credentials.password.encode("utf8")
    correct_password_bytes = b"swordfish"
    is_correct_password = secrets.compare_digest(
        current_password_bytes, correct_password_bytes
    )
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"}, # WWW-Authenticate to make the browser show the login prompt again
        )
    return credentials.username


@app.get("/users/me")
def read_current_user(username: Annotated[str, Depends(get_current_username)]):
    return {"username": username}
```

secrets.compare_digest() needs to take bytes or a str that only contains ASCII characters (the ones in English), this means it wouldn't work with characters like á, as in Sebastián.

To handle that, we first convert the username and password to bytes encoding them with UTF-8.

Then we can use secrets.compare_digest() to ensure that credentials.username is "stanleyjobson", and that credentials.password is "swordfish".

### Using the Request Directly 

Let's imagine you want to get the client's IP address/host inside of your path operation function.

For that you need to access the request directly.

```py
from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/items/{item_id}")
def read_root(item_id: str, request: Request):
    client_host = request.client.host
    return {"client_host": client_host, "item_id": item_id}
```

>Tip
>
>Note that in this case, we are declaring a path parameter beside the request parameter.
>
>So, the path parameter will be extracted, validated, converted to the specified type and annotated with OpenAPI.
>
>The same way, you can declare any other parameter as normally, and additionally, get the Request too.

You can read more details about the [Request object in the official Starlette documentation site](https://www.starlette.io/requests/)

### Using Dataclasses

[Pydantic docs about dataclasses](https://docs.pydantic.dev/latest/concepts/dataclasses/)

### Advanced Middleware

#### HTTPSRedirectMiddleware

Enforces that all incoming requests must either be https or wss.

Any incoming request to http or ws will be redirected to the secure scheme instead.

```py
from fastapi import FastAPI
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()

app.add_middleware(HTTPSRedirectMiddleware)


@app.get("/")
async def main():
    return {"message": "Hello World"}
```

#### TrustedHostMiddleware

Enforces that all incoming requests have a correctly set Host header, in order to guard against HTTP Host Header attacks.

```py
from fastapi import FastAPI
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI()

app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=["example.com", "*.example.com"]
)


@app.get("/")
async def main():
    return {"message": "Hello World"}
```

#### ZipMiddleware

Handles GZip responses for any request that includes "gzip" in the Accept-Encoding header.

The middleware will handle both standard and streaming responses.

```py
from fastapi import FastAPI
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()

app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)


@app.get("/")
async def main():
    return "somebigcontent"
```

#### Other middlewares

There are many other ASGI middlewares.

For example:

- [Uvicorn's ProxyHeadersMiddleware](https://github.com/encode/uvicorn/blob/master/uvicorn/middleware/proxy_headers.py)
- [MessagePack](https://github.com/florimondmanca/msgpack-asgi)

To see other available middlewares check [Starlette's Middleware docs](https://www.starlette.io/middleware/) and the [ASGI Awesome List](https://github.com/florimondmanca/awesome-asgi).

### Sub Applications - Mounts

If you need to have two independent FastAPI applications, with their own independent OpenAPI and their own docs UIs, you can have a main app and "mount" one (or more) sub-application(s).

<https://fastapi.tiangolo.com/advanced/sub-applications/#sub-applications-mounts>

### Behind a Proxy

<https://fastapi.tiangolo.com/advanced/behind-a-proxy/#behind-a-proxy>

### Templates 

`pip install jinja2` - Install dependencies

```py
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2TemplatesUsing Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates") # 1 Using Jinja2Templates


@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse( # 1 Using Jinja2Templates
        request=request, name="item.html", context={"id": id}
    )
```

```html
<!-- templates/item.html -->
<html>
<head>
    <title>Item Details</title>
    <link href="{{ url_for('static', path='/styles.css') }}" rel="stylesheet">
</head>
<body>
    <h1><a href="{{ url_for('read_item', id=id) }}">Item ID: {{ id }}</a></h1> 
</body>
</html>
```

```css
/* static/styles.css */
h1 {
    color: green;
}
```

#### Template Context Values

In the HTML that contains:

`Item ID: {{ id }}`

...it will show the id taken from the "context" dict you passed:

`{"id": id}
`
For example, with an ID of 42, this would render:

`Item ID: 42`

#### Template url_for Arguments

You can also use url_for() inside of the template, it takes as arguments the same arguments that would be used by your path operation function.

So, the section with:

`<a href="{{ url_for('read_item', id=id) }}">`

...will generate a link to the same URL that would be handled by the path operation function read_item(id=id).

For example, with an ID of 42, this would render:

`<a href="/items/42">`

#### Templates and static files

You can also use url_for() inside of the template, and use it, for example, with the StaticFiles you mounted with the name="static".

`<link href="{{ url_for('static', path='/styles.css') }}" rel="stylesheet">`

#### More details

For more details, including how to test templates, check [Starlette's docs on templates](https://www.starlette.io/templates/)

### WebSockets

`pip install websockets` - Install WebSockets

#### Using Depends and others

In WebSocket endpoints you can import from fastapi and use:

- Depends
- Security
- Cookie
- Header
- Path
- Query

```py
from typing import Annotated

from fastapi import (
    Cookie,
    Depends,
    FastAPI,
    Query,
    WebSocket,
    WebSocketException,
    status,
)
from fastapi.responses import HTMLResponse

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <label>Item ID: <input type="text" id="itemId" autocomplete="off" value="foo"/></label>
            <label>Token: <input type="text" id="token" autocomplete="off" value="some-key-token"/></label>
            <button onclick="connect(event)">Connect</button>
            <hr>
            <label>Message: <input type="text" id="messageText" autocomplete="off"/></label>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
        var ws = null;
            function connect(event) {
                var itemId = document.getElementById("itemId")
                var token = document.getElementById("token")
                ws = new WebSocket("ws://localhost:8000/items/" + itemId.value + "/ws?token=" + token.value);
                ws.onmessage = function(event) {
                    var messages = document.getElementById('messages')
                    var message = document.createElement('li')
                    var content = document.createTextNode(event.data)
                    message.appendChild(content)
                    messages.appendChild(message)
                };
                event.preventDefault()
            }
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@app.get("/")
async def get():
    return HTMLResponse(html)


async def get_cookie_or_token(
    websocket: WebSocket,
    session: Annotated[str | None, Cookie()] = None,
    token: Annotated[str | None, Query()] = None,
):
    if session is None and token is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)
    return session or token


@app.websocket("/items/{item_id}/ws")
async def websocket_endpoint(
    *,
    websocket: WebSocket,
    item_id: str,
    q: int | None = None,
    cookie_or_token: Annotated[str, Depends(get_cookie_or_token)],
):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(
            f"Session cookie or query token value is: {cookie_or_token}"
        )
        if q is not None:
            await websocket.send_text(f"Query parameter q is: {q}")
        await websocket.send_text(f"Message text was: {data}, for item ID: {item_id}")
```

#### Handling disconnections and multiple clients

When a WebSocket connection is closed, the a`wait websocket.receive_text()` will raise a `WebSocketDisconnect` exception, which you can then catch and handle like in this example.

```py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")
```

#### [The WebSocket class](https://www.starlette.io/websockets/)

WebSockets present a mapping interface, so you can use them in the same way as a scope.

For instance: `websocket['path']` will return the ASGI path.

##### URL

The websocket URL is accessed as `websocket.url`.

The property is actually a subclass of str, and also exposes all the components that can be parsed out of the URL.

For example: `websocket.url.path`, `websocket.url.port`, `websocket.url.scheme`.

##### Headers

Headers are exposed as an immutable, case-insensitive, multi-dict.

For example: `websocket.headers['sec-websocket-version']`

##### Query Parameters

Query parameters are exposed as an immutable multi-dict.

For example: `websocket.query_params['search']`

##### Path Parameters

Router path parameters are exposed as a dictionary interface.

For example: `websocket.path_params['username']`

##### Accepting the connection

- `await websocket.accept(subprotocol=None, headers=None)`

##### Sending data

- `await websocket.send_text(data)`
- `await websocket.send_bytes(data)`
- `await websocket.send_json(data)`

JSON messages default to being sent over text data frames, from version 0.10.0 onwards. Use `websocket.send_json(data, mode="binary")` to send JSON over binary data frames.

##### Receiving data

- `await websocket.receive_text()`
- `await websocket.receive_bytes()`
- `await websocket.receive_json()`

May raise `starlette.websockets.WebSocketDisconnect()`.

JSON messages default to being received over text data frames, from version 0.10.0 onwards. Use `websocket.receive_json(data, mode="binary")` to receive JSON over binary data frames.
Iterating data

- `websocket.iter_text()`
- `websocket.iter_bytes()`
- `websocket.iter_json()`

Similar to `receive_text`, `receive_bytes`, and `receive_json` but returns an async iterator.

```py
from starlette.websockets import WebSocket


async def app(scope, receive, send):
    websocket = WebSocket(scope=scope, receive=receive, send=send)
    await websocket.accept()
    async for message in websocket.iter_text():
        await websocket.send_text(f"Message text was: {message}")
    await websocket.close()
```

When `starlette.websockets.WebSocketDisconnect` is raised, the iterator will exit.

##### Closing the connection

- `await websocket.close(code=1000, reason=None)`

##### Sending and receiving messages

If you need to send or receive raw ASGI messages then you should use `websocket.send()` and `websocket.receive()` rather than using the raw send and receive callables. This will ensure that the websocket's state is kept correctly updated.

- `await websocket.send(message)`
- `await websocket.receive()`

##### Send Denial Response

If you call `websocket.close()` before calling `websocket.accept()` then the server will automatically send a HTTP 403 error to the client.

If you want to send a different error response, you can use the `websocket.send_denial_response()` method. This will send the response and then close the connection.

- `await websocket.send_denial_response(response)`

This requires the ASGI server to support the WebSocket Denial Response extension. If it is not supported a RuntimeError will be raised.

#### Class-based WebSocket handling

<https://www.starlette.io/endpoints/#websocketendpoint>

### Lifespan Events

You can define logic (code) that should be executed before the application starts up. This means that this code will be executed once, before the application starts receiving requests.

The same way, you can define logic (code) that should be executed when the application is shutting down. In this case, this code will be executed once, after having handled possibly many requests.

Because this code is executed before the application starts taking requests, and right after it finishes handling requests, it covers the whole application lifespan (the word "lifespan" will be important in a second 😉).

This can be very useful for setting up resources that you need to use for the whole app, and that are shared among requests, and/or that you need to clean up afterwards. For example, a database connection pool, or loading a shared machine learning model.

#### Use Case

Let's start with an example use case and then see how to solve it with this.

Let's imagine that you have some machine learning models that you want to use to handle requests. 🤖

The same models are shared among requests, so, it's not one model per request, or one per user or something similar.

Let's imagine that loading the model can take quite some time, because it has to read a lot of data from disk. So you don't want to do it for every request.

You could load it at the top level of the module/file, but that would also mean that it would load the model even if you are just running a simple automated test, then that test would be slow because it would have to wait for the model to load before being able to run an independent part of the code.

That's what we'll solve, let's load the model before the requests are handled, but only right before the application starts receiving requests, not while the code is being loaded.

##### Lifespan

```py
from contextlib import asynccontextmanager

from fastapi import FastAPI


def fake_answer_to_everything_ml_model(x: float):
    return x * 42


ml_models = {}


@asynccontextmanager # Async Context Manager
async def lifespan(app: FastAPI): # Lifespan function
    # Load the ML model
    ml_models["answer_to_everything"] = fake_answer_to_everything_ml_model
    yield
    # Clean up the ML models and release the resources
    ml_models.clear()


app = FastAPI(lifespan=lifespan)


@app.get("/predict")
async def predict(x: float):
    result = ml_models["answer_to_everything"](x)
    return {"result": result}

```

Here we are simulating the expensive startup operation of loading the model by putting the (fake) model function in the dictionary with machine learning models before the yield. This code will be executed before the application starts taking requests, during the startup.

And then, right after the yield, we unload the model. This code will be executed after the application finishes handling requests, right before the shutdown. This could, for example, release resources like memory or a GPU.

##### Alternative Events (deprecated)

>Warning
>
>The recommended way to handle the startup and shutdown is using the lifespan parameter of the FastAPI app as described above. If you provide a lifespan parameter, startup and shutdown event handlers will no longer be called. It's all lifespan or all events, not both.
>
>You can probably skip this part.


```py
from fastapi import FastAPI

app = FastAPI()


@app.on_event("shutdown")
def shutdown_event():
    with open("log.txt", mode="a") as log:
        log.write("Application shutdown")


@app.get("/items/")
async def read_items():
    return [{"name": "Foo"}]

```

```py
from fastapi import FastAPI

app = FastAPI()

items = {}


@app.on_event("startup")
async def startup_event():
    items["foo"] = {"name": "Fighters"}
    items["bar"] = {"name": "Tenders"}


@app.get("/items/{item_id}")
async def read_items(item_id: str):
    return items[item_id]
```

### Testing WebSockets 

You can use the same TestClient to test WebSockets.

For this, you use the TestClient in a with statement, connecting to the WebSocket:

```py
from fastapi import FastAPI
from fastapi.testclient import TestClient
from fastapi.websockets import WebSocket

app = FastAPI()


@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


@app.websocket("/ws")
async def websocket(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_json({"msg": "Hello WebSocket"})
    await websocket.close()


def test_read_main():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}


def test_websocket():
    client = TestClient(app)
    with client.websocket_connect("/ws") as websocket:
        data = websocket.receive_json()
        assert data == {"msg": "Hello WebSocket"}
```

### Testing Events: startup - shutdown

```py
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

items = {}


@app.on_event("startup")
async def startup_event():
    items["foo"] = {"name": "Fighters"}
    items["bar"] = {"name": "Tenders"}


@app.get("/items/{item_id}")
async def read_items(item_id: str):
    return items[item_id]


def test_read_items():
    with TestClient(app) as client:
        response = client.get("/items/foo")
        assert response.status_code == 200
        assert response.json() == {"name": "Fighters"}
```

### Testing Dependencies with Overrides 

There are some scenarios where you might want to override a dependency during testing.

You don't want the original dependency to run (nor any of the sub-dependencies it might have).

Instead, you want to provide a different dependency that will be used only during tests (possibly only some specific tests), and will provide a value that can be used where the value of the original dependency was used.

```py
from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
    return {"message": "Hello Items!", "params": commons}


@app.get("/users/")
async def read_users(commons: Annotated[dict, Depends(common_parameters)]):
    return {"message": "Hello Users!", "params": commons}


client = TestClient(app)


async def override_dependency(q: str | None = None):
    return {"q": q, "skip": 5, "limit": 10}


app.dependency_overrides[common_parameters] = override_dependency


def test_override_in_items():
    response = client.get("/items/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": None, "skip": 5, "limit": 10},
    }


def test_override_in_items_with_q():
    response = client.get("/items/?q=foo")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": "foo", "skip": 5, "limit": 10},
    }


def test_override_in_items_with_params():
    response = client.get("/items/?q=foo&skip=100&limit=200")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Hello Items!",
        "params": {"q": "foo", "skip": 5, "limit": 10},
    }
```

### Async Tests

<https://fastapi.tiangolo.com/advanced/async-tests/#async-tests>

```sh
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

```py
# main.py
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Tomato"}
```

```py
# test_main.py
import pytest
from httpx import ASGITransport, AsyncClient

from .main import app


@pytest.mark.anyio
async def test_root():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Tomato"}
```

### Settings and Environment Variables 

`pip install pydantic-settings`

```py
from fastapi import FastAPI
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50


settings = Settings()
app = FastAPI()


@app.get("/info")
async def info():
    return {
        "app_name": settings.app_name,
        "admin_email": settings.admin_email,
        "items_per_user": settings.items_per_user,
    }
```

#### Settings in another module

```py
# config.py
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50


settings = Settings()
```

```py
# main.py
from fastapi import FastAPI

from .config import settings

app = FastAPI()


@app.get("/info")
async def info():
    return {
        "app_name": settings.app_name,
        "admin_email": settings.admin_email,
        "items_per_user": settings.items_per_user,
    }
```

#### Settings in a dependency

```py
# main.py
from functools import lru_cache
from typing import Annotated

from fastapi import Depends, FastAPI

from .config import Settings

app = FastAPI()


@lru_cache
def get_settings():
    return Settings()


@app.get("/info")
async def info(settings: Annotated[Settings, Depends(get_settings)]):
    return {
        "app_name": settings.app_name,
        "admin_email": settings.admin_email,
        "items_per_user": settings.items_per_user,
    }
```

#### Settings and testing

```py
from fastapi.testclient import TestClient

from .config import Settings
from .main import app, get_settings

client = TestClient(app)


def get_settings_override():
    return Settings(admin_email="testing_admin@example.com")


app.dependency_overrides[get_settings] = get_settings_override


def test_app():
    response = client.get("/info")
    data = response.json()
    assert data == {
        "app_name": "Awesome API",
        "admin_email": "testing_admin@example.com",
        "items_per_user": 50,
    }
```

#### Reading a .env file

```sh
# .env
ADMIN_EMAIL="deadpool@example.com"
APP_NAME="ChimichangApp"
```

```py
# config.py

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50

    model_config = SettingsConfigDict(env_file=".env")
```

### OpenAPI Callbacks

<https://fastapi.tiangolo.com/advanced/openapi-callbacks/#openapi-callbacks>

#### An app with callbacks

Let's see all this with an example.

Imagine you develop an app that allows creating invoices.

These invoices will have an id, title (optional), customer, and total.

The user of your API (an external developer) will create an invoice in your API with a POST request.

Then your API will (let's imagine):

- Send the invoice to some customer of the external developer.
- Collect the money.
- Send a notification back to the API user (the external developer).
  - This will be done by sending a POST request (from your API) to some external API provided by that external developer (this is the "callback").

```py
from typing import Union

from fastapi import APIRouter, FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()


class Invoice(BaseModel):
    id: str
    title: Union[str, None] = None
    customer: str
    total: float


class InvoiceEvent(BaseModel):
    description: str
    paid: bool


class InvoiceEventReceived(BaseModel):
    ok: bool


invoices_callback_router = APIRouter()


@invoices_callback_router.post(
    "{$callback_url}/invoices/{$request.body.id}", response_model=InvoiceEventReceived
)
def invoice_notification(body: InvoiceEvent):
    pass


@app.post("/invoices/", callbacks=invoices_callback_router.routes)
def create_invoice(invoice: Invoice, callback_url: Union[HttpUrl, None] = None):
    """
    Create an invoice.

    This will (let's imagine) let the API user (some external developer) create an
    invoice.

    And this path operation will:

    * Send the invoice to the client.
    * Collect the money from the client.
    * Send a notification back to the API user (the external developer), as a callback.
        * At this point is that the API will somehow send a POST request to the
            external API with the notification of the invoice event
            (e.g. "payment successful").
    """
    # Send the invoice, collect the money, send the notification (the callback)
    return {"msg": "Invoice received"}
```

### OpenAPI Webhooks

There are cases where you want to tell your API users that your app could call their app (sending a request) with some data, normally to notify of some type of event.

This means that instead of the normal process of your users sending requests to your API, it's your API (or your app) that could send requests to their system (to their API, their app).

This is normally called a webhook.

#### Webhooks steps

The process normally is that you define in your code what is the message that you will send, the body of the request.

You also define in some way at which moments your app will send those requests or events.

And your users define in some way (for example in a web dashboard somewhere) the URL where your app should send those requests.

All the logic about how to register the URLs for webhooks and the code to actually send those requests is up to you. You write it however you want to in your own code.

#### An app with webhooks

```py
from datetime import datetime

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Subscription(BaseModel):
    username: str
    monthly_fee: float
    start_date: datetime


@app.webhooks.post("new-subscription")
def new_subscription(body: Subscription):
    """
    When a new user subscribes to your service we'll send you a POST request with this
    data to the URL that you register for the event `new-subscription` in the dashboard.
    """


@app.get("/users/")
def read_users():
    return ["Rick", "Morty"]
```

### Including WSGI - Flask, Django, others

You can mount WSGI applications as you saw with [Sub Applications- Mounts](https://fastapi.tiangolo.com/advanced/sub-applications/), [Behind a Proxy](https://fastapi.tiangolo.com/advanced/behind-a-proxy/).

For that, you can use the WSGIMiddleware and use it to wrap your WSGI application, for example, Flask, Django, etc.

#### Using WSGIMiddleware

```py
from fastapi import FastAPI
from fastapi.middleware.wsgi import WSGIMiddleware
from flask import Flask, request
from markupsafe import escape

flask_app = Flask(__name__)


@flask_app.route("/")
def flask_main():
    name = request.args.get("name", "World")
    return f"Hello, {escape(name)} from Flask!"


app = FastAPI()


@app.get("/v2")
def read_main():
    return {"message": "Hello World"}


app.mount("/v1", WSGIMiddleware(flask_app))
```

If you run it and go to http://localhost:8000/v1/ you will see the response from Flask:

```txt
Hello, World from Flask!
```

And if you go to http://localhost:8000/v2 you will see the response from FastAPI:

```json
{
    "message": "Hello World"
}
```

### Generate Clients

As FastAPI is based on the OpenAPI specification, you get automatic compatibility with many tools, including the automatic API docs (provided by Swagger UI).

One particular advantage that is not necessarily obvious is that you can generate clients (sometimes called SDKs ) for your API, for many different programming languages.

#### OpenAPI Client Generators

There are many tools to generate clients from OpenAPI.

A common tool is [OpenAPI Generator](https://openapi-generator.tech/).

If you are building a frontend, a very interesting alternative is [openapi-ts](https://github.com/hey-api/openapi-ts).

#### Generate a TypeScript Frontend Client

```py
from fastapi import FastAPI
from fastapi.routing import APIRoute
from pydantic import BaseModel


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(generate_unique_id_function=custom_generate_unique_id)


class Item(BaseModel):
    name: str
    price: float


class ResponseMessage(BaseModel):
    message: str


class User(BaseModel):
    username: str
    email: str


@app.post("/items/", response_model=ResponseMessage, tags=["items"])
async def create_item(item: Item):
    return {"message": "Item received"}


@app.get("/items/", response_model=list[Item], tags=["items"])
async def get_items():
    return [
        {"name": "Plumbus", "price": 3},
        {"name": "Portal Gun", "price": 9001},
    ]


@app.post("/users/", response_model=ResponseMessage, tags=["users"])
async def create_user(user: User):
    return {"message": "User received"}
```

#### Generate a TypeScript Client

```sh
npm install @hey-api/openapi-ts --save-dev # Install openapi-ts
```

package.json file

```json
{
  "name": "frontend-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "generate-client": "openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios"
  },
  "author": "",
  "license": "",
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

```sh
npm run generate-client # Generate Client Code
frontend-app@1.0.0 generate-client /home/user/code/frontend-app
> openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios
```

#### Preprocess the OpenAPI Specification for the Client Generator

```py
import json
from pathlib import Path

file_path = Path("./openapi.json")
openapi_content = json.loads(file_path.read_text())

for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"{tag}-"
        new_operation_id = operation_id[len(to_remove) :]
        operation["operationId"] = new_operation_id

file_path.write_text(json.dumps(openapi_content))
```

package.json

```json
{
  "name": "frontend-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "generate-client": "openapi-ts --input ./openapi.json --output ./src/client --client axios"
  },
  "author": "",
  "license": "",
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

## FastAPI CLI

When you install FastAPI (e.g. with `pip install "fastapi[standard]")`, it includes a package called `fastapi-cli`, this package provides the `fastapi` command in the terminal.

`fastapi dev main.py`

Running fastapi dev initiates development mode.

By default, auto-reload is enabled, automatically reloading the server when you make changes to your code. This is resource-intensive and could be less stable than when it's disabled. You should only use it for development. It also listens on the IP address 127.0.0.1, which is the IP for your machine to communicate with itself alone (localhost).

`fastapi run main.py`

Executing fastapi run starts FastAPI in production mode by default.

By default, auto-reload is disabled. It also listens on the IP address 0.0.0.0, which means all the available IP addresses, this way it will be publicly accessible to anyone that can communicate with the machine. This is how you would normally run it in production, for example, in a container.

In most cases you would (and should) have a "termination proxy" handling HTTPS for you on top, this will depend on how you deploy your application, your provider might do this for you, or you might need to set it up yourself.

## Deployment

### About FastAPI versions

#### Pin your fastapi version

If you use a requirements.txt file you could specify the version with:

`fastapi[standard]==0.112.0`

Or you could also pin it with:

`fastapi[standard]>=0.112.0,<0.113.0`

#### Upgrading the FastAPI versions¶

You should add tests for your app.

With FastAPI it's very easy (thanks to Starlette), check the docs: [Testing](https://fastapi.tiangolo.com/tutorial/testing/)

After you have tests, then you can upgrade the FastAPI version to a more recent one, and make sure that all your code is working correctly by running your tests.

If everything is working, or after you make the necessary changes, and all your tests are passing, then you can pin your `fastapi` to that new recent version.

#### About Starlette

You shouldn't pin the version of starlette.

Different versions of FastAPI will use a specific newer version of Starlette.

So, you can just let FastAPI use the correct Starlette version.

#### About Pydantic

Pydantic includes the tests for FastAPI with its own tests, so new versions of Pydantic (above 1.0.0) are always compatible with FastAPI.

You can pin Pydantic to any version above 1.0.0 that works for you.

For example:

`pydantic>=2.7.0,<3.0.0`

### About HTTPS

<https://fastapi.tiangolo.com/deployment/https/#certificate-renewal>

### Run a Server Manually

`fastapi run main.py`

#### ASGI Servers

- [Uvicorn](https://www.uvicorn.org/): a high performance ASGI server.
- [Hypercorn](https://hypercorn.readthedocs.io/): an ASGI server compatible with HTTP/2 and Trio among other features.
- [Daphne](https://github.com/django/daphne): the ASGI server built for Django Channels.
- [Granian](https://github.com/emmett-framework/granian): A Rust HTTP server for Python applications.
- [NGINX Unit](https://unit.nginx.org/howto/fastapi/): NGINX Unit is a lightweight and versatile web application runtime.

#### Install the Server Program

`pip install "uvicorn[standard]"`

#### Run the Server Program

`uvicorn main:app --host 0.0.0.0 --port 80`

### Deployment Concepts

These examples run the server program (e.g Uvicorn), starting a single process, listening on all the IPs (0.0.0.0) on a predefined port (e.g. 80).

This is the basic idea. But you will probably want to take care of some additional things, like:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (the number of processes running)
- Memory
- Previous steps before starting

<https://fastapi.tiangolo.com/deployment/concepts/#resource-utilization>

### Deploy FastAPI on Cloud Providers

- [Platform.sh](https://docs.platform.sh/languages/python.html?utm_source=fastapi-signup&utm_medium=banner&utm_campaign=FastAPI-signup-June-2023)
- [Porter](https://docs.porter.run/language-specific-guides/fastapi)
- [Coherence](https://www.withcoherence.com/?utm_medium=advertising&utm_source=fastapi&utm_campaign=website)
- [Render](https://docs.render.com/deploy-fastapi?utm_source=deploydoc&utm_medium=referral&utm_campaign=fastapi)

### Server Workers - Uvicorn with Workers

`fastapi run --workers 4 main.py`

`uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4`

### FastAPI in Containers - Docker 

```sh
.
├── app
│   ├── __init__.py
│   └── main.py
├── Dockerfile
└── requirements.txt
```

requirements.txt

```text
fastapi[standard]>=0.113.0,<0.114.0
pydantic>=2.7.0,<3.0.0
```

```sh
pip install -r requirements.txt
```

```py
# main.py

from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

```Dockerfile

FROM python:3.9


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


COPY ./app /code/app


CMD ["fastapi", "run", "app/main.py", "--port", "80"]

# If you are running your container behind a TLS Termination Proxy (load balancer) like Nginx or Traefik, add the option --proxy-headers, this will tell Uvicorn (through the FastAPI CLI) to trust the headers sent by that proxy telling it that the application is running behind HTTPS, etc
# CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"] 
```

```sh
docker build -t myimage . # Build the Docker Image
```

```sh
docker run -d --name mycontainer -p 80:80 myimage # Start the Docker Container
```

```sh
http://192.168.99.100/items/5?q=somequery
{"item_id": 5, "q": "somequery"}
```

#### Containers with Multiple Processes and Special Cases

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app


CMD ["fastapi", "run", "app/main.py", "--port", "80", "--workers", "4"]
```

## How To - Recipes

<https://fastapi.tiangolo.com/how-to/general/>