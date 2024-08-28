# PYTEST How-to guides

## Core pytest functionality

### How to invoke pytest

#### Specifying which tests to run

Run tests in a module

`pytest test_mod.py`

Run tests in a directory

`pytest testing/`

Run tests by keyword expressions

`pytest -k 'MyClass and not method'`

Run tests by collection arguments

To run a specific test within a module:

`pytest tests/test_mod.py::test_func`

To run all tests in a class:

`pytest tests/test_mod.py::TestClass`

Specifying a specific test method:

`pytest tests/test_mod.py::TestClass::test_method`

Specifying a specific parametrization of a test:

`pytest tests/test_mod.py::test_func[x1,y2]`

Run tests by marker expressions

To run all tests which are decorated with the @pytest.mark.slow decorator:

`pytest -m slow`

To run all tests which are decorated with the annotated @pytest.mark.slow(phase=1) decorator, with the phase keyword argument set to 1:

`pytest -m "slow(phase=1)"`

Run tests from packages

`pytest --pyargs pkg.testing`

This will import pkg.testing and use its filesystem location to find and run tests from.

Read arguments from file

All of the above can be read from a file using the @ prefix:

`pytest @tests_to_run.txt`

#### Getting help on version, option names, environment variables

`pytest --version   # shows where pytest was imported from`
`pytest --fixtures  # show available builtin function arguments`
`pytest -h | --help # show help on command line and config file options`

#### Profiling test execution duration

To get a list of the slowest 10 test durations over 1.0s long:

`pytest --durations=10 --durations-min=1.0`

By default, pytest will not show test durations that are too small (<0.005s) unless -vv is passed on the command-line.

#### Managing loading of plugins

Early loading plugins

`pytest -p mypluginmodule`

Disabling plugins

`pytest -p no:doctest`

#### Other ways of calling pytest

Calling pytest through python -m pytest

`python -m pytest [...]`

Calling pytest from Python code

`retcode = pytest.main()`

`retcode = pytest.main(["-x", "mytestdir"])`

You can specify additional plugins to pytest.main:

        # content of myinvoke.py
        import sys

        import pytest


        class MyPlugin:
            def pytest_sessionfinish(self):
                print("*** test run reporting finishing")


        if __name__ == "__main__":
            sys.exit(pytest.main(["-qq"], plugins=[MyPlugin()]))

Running it will show that MyPlugin was added and its hook was invoked:

`$ python myinvoke.py`
`*** test run reporting finishing`

### How to write and report assertions in tests

#### Asserting with the assert statement

        content of test_assert1.py

        def f():
            return 3


        def test_function():
            assert f() == 4

#### Assertions about expected exceptions

        import pytest


        def test_zero_division():
            with pytest.raises(ZeroDivisionError):
                1 / 0

        def test_recursion_depth():
            with pytest.raises(RuntimeError) as excinfo:

                def f():
                    f()

                f()
            assert "maximum recursion" in str(excinfo.value)

        def test_foo_not_implemented():
            def foo():
                raise NotImplementedError

            with pytest.raises(RuntimeError) as excinfo:
                foo()
            assert excinfo.type is RuntimeError

##### Matching exception messages

        import pytest


        def myfunc():
            raise ValueError("Exception 123 raised")


        def test_match():
            with pytest.raises(ValueError, match=r".* 123 .*"):
                myfunc()

##### Matching exception groups

        def test_exception_in_group():
            with pytest.raises(ExceptionGroup) as excinfo:
                raise ExceptionGroup(
                    "Group message",
                    [
                        RuntimeError("Exception 123 raised"),
                    ],
                )
            assert excinfo.group_contains(RuntimeError, match=r".* 123 .*")
            assert not excinfo.group_contains(TypeError)

        def test_exception_in_group_at_given_depth():
            with pytest.raises(ExceptionGroup) as excinfo:
                raise ExceptionGroup(
                    "Group message",
                    [
                        RuntimeError(),
                        ExceptionGroup(
                            "Nested group",
                            [
                                TypeError(),
                            ],
                        ),
                    ],
                )
            assert excinfo.group_contains(RuntimeError, depth=1)
            assert excinfo.group_contains(TypeError, depth=2)
            assert not excinfo.group_contains(RuntimeError, depth=2)
            assert not excinfo.group_contains(TypeError, depth=1)

#### Assertions about expected warnings

<https://docs.pytest.org/en/stable/how-to/capture-warnings.html#warns>

#### Making use of context-sensitive comparisons

        # content of test_assert2.py
        def test_set_comparison():
            set1 = set("1308")
            set2 = set("8035")
            assert set1 == set2

#### Defining your own explanation for failed assertions

<https://docs.pytest.org/en/stable/how-to/assert.html#defining-your-own-explanation-for-failed-assertions>

#### Assertion introspection details

<https://docs.pytest.org/en/stable/how-to/assert.html#assertion-introspection-details>

### How to use fixtures

<https://docs.pytest.org/en/stable/how-to/fixtures.html#how-to-use-fixtures>

- Fixtures can request other fixtures
- Fixtures are reusable
- A test/fixture can request more than one fixture at a time
- Fixtures can be requested more than once per test (return values are cached)

      # contents of test_append.py
      import pytest


      # Arrange
      @pytest.fixture
      def first_entry():
          return "a"


      # Arrange
      @pytest.fixture
      def order():
          return []


      # Act
      @pytest.fixture
      def append_first(order, first_entry):
          return order.append(first_entry)


      def test_string_only(append_first, order, first_entry):
          # Assert
          assert order == [first_entry]

#### Autouse fixtures (fixtures you don’t have to request)

    # contents of test_append.py
    import pytest


    @pytest.fixture
    def first_entry():
        return "a"


    @pytest.fixture
    def order(first_entry):
        return []


    @pytest.fixture(autouse=True)
    def append_first(order, first_entry):
        return order.append(first_entry)


    def test_string_only(order, first_entry):
        assert order == [first_entry]


    def test_string_and_int(order, first_entry):
        order.append(2)
        assert order == [first_entry, 2]

#### Scope: sharing fixtures across classes, modules, packages or session

    # content of conftest.py
    import smtplib

    import pytest


    @pytest.fixture(scope="module")
    def smtp_connection():
        return smtplib.SMTP("smtp.gmail.com", 587, timeout=5)

    # content of test_module.py


    def test_ehlo(smtp_connection):
        response, msg = smtp_connection.ehlo()
        assert response == 250
        assert b"smtp.gmail.com" in msg
        assert 0  # for demo purposes


    def test_noop(smtp_connection):
        response, msg = smtp_connection.noop()
        assert response == 250
        assert 0  # for demo purposes

#### Fixture scopes

Fixtures are created when first requested by a test, and are destroyed based on their scope:

- **function**: the default scope, the fixture is destroyed at the end of the test.

- **class**: the fixture is destroyed during teardown of the last test in the class.

- **module**: the fixture is destroyed during teardown of the last test in the module.

- **package**: the fixture is destroyed during teardown of the last test in the package where the fixture is defined, including sub-packages and sub-directories within it.

    session: the fixture is destroyed at the end of the test session.

    <https://docs.pytest.org/en/stable/how-to/fixtures.html#fixture-scopes>
