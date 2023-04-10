"""
Set of SQLAlchemy database schemas supported in MLflow for tracking server backends.
"""

POSTGRES = "postgresql"
MYSQL = "mysql"
SQLITE = "sqlite"
MSSQL = "mssql"
ORACLE = "oracle"

DATABASE_ENGINES = [POSTGRES, MYSQL, SQLITE, MSSQL, ORACLE]
