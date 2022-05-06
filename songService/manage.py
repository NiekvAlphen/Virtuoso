# manage.py

import os
from flask_script import Manager # class for handling a set of commands
from flask_migrate import Migrate
from app import db, create_app
from app.models import Song, Song

app = create_app(config_name=os.getenv('APP_SETTINGS'))

migrate = Migrate(app, db)
manager = Manager(app)

if __name__ == '__main__':
    manager.run()