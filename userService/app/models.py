# app/models.py

from app import db
from flask_bcrypt import Bcrypt

class User(db.Model):
    """This class represents the song table."""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    image = db.Column(db.String(255))

    def __init__(self, username, password, email, image):
        """Initialize with name, password, email, image."""
        self.username = username
        self.password = Bcrypt().generate_password_hash(password).decode()
        self.email = email
        self.image = image
    
    def password_is_valid(self, password):
        return Bcrypt().check_password_hash(self.password, password)
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def get_all():
        return User.query.all()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return "".format(self.title)