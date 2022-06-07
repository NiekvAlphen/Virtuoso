# /instance/config.py

import os
from dotenv import load_dotenv
import urllib
from sqlalchemy import create_engine
import pymssql

load_dotenv()

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')
    #SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    #SQLALCHEMY_DATABASE_URI = os.getenv('SQLAZURECONNSTR__WWIF')

class DevelopmentConfig(object):
    """Configurations for development."""
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@user_db:5432/user_db'
    DEBUG = True

class TestingConfig(object):
    """Configurations for Testing, with a seperate test database."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/test_db'
    DEBUG = True

class StagingConfig(object):
    """Configurations for Staging."""
    DEBUG = True

class ProductionConfig(object):
    """Configurations for Production."""
    #params = urllib.parse.quote_plus("Driver={ODBC Driver 13 for SQL Server};Server=tcp:virtuosodb.database.windows.net,1433;Database=virtuoso-user-db;Uid=niekva;Pwd=*Ws>C+7jT=5bLTc>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;")
    #SQLALCHEMY_DATABASE_URI = "mssql+pyodbc:///?odbc_connect=%s" % params
    SQLALCHEMY_DATABASE_URI = "mssql+pymssql://niekva:*Ws>C+7jT=5bLTc>@virtuosodb.database.windows.net/virtuoso-user-db"
    DEBUG = False
    TESTING = False

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'production': ProductionConfig,
}