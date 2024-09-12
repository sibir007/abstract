# Stack Overflow

## SQLAlchemy

### Group by hour

This works for PostgreSQL:

    .group_by(func.date_trunc('hour', date_col))

extract the hour from your timestamp and then you can group by that.

    query(extract('hour', timeStamp).label('h')).group_by('h')

group by hour, minute, second. To only group by hour it would be '%H' instead of '%H:%I:%s'

    .group_by(func.date_format(date_col, '%H:%i:%s'))

## Pytest

`pytest -vv --capture=tee-sys    tests/adminproject/analytics/views_analytics`

### How do I disable a test using pytest?

        @pytest.mark.skip(reason="no way of currently testing this")
        def test_the_unknown():
            ...

        import sys
        @pytest.mark.skipif(sys.version_info < (3,3), reason="requires python3.3")
        def test_function():
            ...

        @pytest.mark.skipif(
            not importlib.util.find_spec("pandas"), reason="requires the Pandas library"
        )
        def test_pandas_function():
            import pandas
            ...