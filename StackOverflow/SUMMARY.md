# Stack Overflow

## SQLAlchemy

### Group by hour

This works for PostgreSQL:

    .group_by(func.date_trunc('hour', date_col))

extract the hour from your timestamp and then you can group by that.

    query(extract('hour', timeStamp).label('h')).group_by('h')

group by hour, minute, second. To only group by hour it would be '%H' instead of '%H:%I:%s'

    .group_by(func.date_format(date_col, '%H:%i:%s'))