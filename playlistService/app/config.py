# /instance/config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    #SQLALCHEMY_DATABASE_URI = os.getenv('SQLAZURECONNSTR__WWIF')
    STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/static"

class DevelopmentConfig(object):
    """Configurations for development."""
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@playlist_db:5432/playlist_db'
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
    DEBUG = False
    TESTING = False

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'production': ProductionConfig,
}