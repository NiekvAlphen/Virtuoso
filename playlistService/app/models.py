# app/models.py

from app import db

class Playlist(db.Model):
    """This class represents the playlist table."""

    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    creator = db.Column(db.Integer)
    songs_array = db.Column(db.JSON)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __init__(self, title, songs_array):
        """Initialize with title."""
        self.title = title
        self.songs_array = songs_array

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def get_all():
        return Playlist.query.all()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return "".format(self.title)