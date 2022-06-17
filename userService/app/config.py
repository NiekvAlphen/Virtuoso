# /instance/config.py

import os
from dotenv import load_dotenv
from pathlib import Path
import pymssql

dotenv_path = Path('../.env')
load_dotenv(dotenv_path=dotenv_path)

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')

class DevelopmentConfig(object):
    """Configurations for development."""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    DEBUG = True

class TestingConfig(object):
    """Configurations for Testing, with a seperate test database."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL')
    DEBUG = True

class StagingConfig(object):
    """Configurations for Staging."""
    DEBUG = True

class ProductionConfig(object):
    """Configurations for Production."""
    SQLALCHEMY_DATABASE_URI = "mssql+pymssql://niekva:niek1234$"+"@virtuososerver.database.windows.net/virtuosoUsers"
    DEBUG = False
    TESTING = False

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'production': ProductionConfig,
}