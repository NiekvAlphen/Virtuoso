# app/__init__.py

from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_cors import CORS

# local importpy
from app import config

# initialize sql-alchemy
db = SQLAlchemy()

app = FlaskAPI(__name__, instance_relative_config=True)
CORS(app)

def create_app(config_name):
    
    app.config.from_object(config.app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["UPLOAD_FOLDER"] = "/static"

    from app import models
    from app import routes

    migrate = Migrate(app)
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(routes.routes_blueprint)

    with app.app_context():
        db.create_all()

    return app