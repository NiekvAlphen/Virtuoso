# app/models.py

from app import db

class Song(db.Model):
    """This class represents the song table."""

    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    artist = db.Column(db.String(255))
    audio_file = db.Column(db.String(255))
    genre = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __init__(self, title, artist, audio_file, genre):
        """Initialize with title, artist, audio_file, genre."""
        self.title = title
        self.artist = artist
        self.audio_file = audio_file
        self.genre = genre

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def get_all():
        return Song.query.all()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return "".format(self.title)