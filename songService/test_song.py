# test_song.py
import unittest
import os
import json

from h11 import Data
from app import create_app, db

class SongTestCase(unittest.TestCase):
    """This class represents the song test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="production")
        self.client = self.app.test_client
        self.song = {'title': 'Still alive', 'artist': 'S', 'audio_file': 'test.mp3', 'genre': 'Pop'}

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()
        
    def test_song_creation(self):
        """Test API can create a song (POST request)."""
        res = self.client().post('/api/songs', data=self.song)
        self.assertEqual(res.status_code, 201)
        self.assertIn('Still alive', str(res.data))

    def test_api_can_get_all_songs(self):
        """Test API can get a song (GET request)."""
        res = self.client().post('/api/songs', data=self.song)
        self.assertEqual(res.status_code, 201)
        res = self.client().get('/api/songs')
        self.assertEqual(res.status_code, 200)
        self.assertIn('Still alive', str(res.data))

    def test_api_can_get_song_by_id(self):
        """Test API can get a single song by using it's id."""
        rv = self.client().post('/api/songs', data=self.song)
        self.assertEqual(rv.status_code, 201)
        result_in_json = json.loads(rv.data.decode('utf-8').replace("'", "\""))
        result = self.client().get('/api/songs/{}'.format(result_in_json['id']))
        self.assertEqual(result.status_code, 200)
        self.assertIn('Still alive', str(result.data))

    def test_song_can_be_edited(self):
        """Test API can edit an existing song (PUT request)."""
        rv = self.client().post('/api/songs', data={'title': 'Dont Know Why', 'artist': 'S', 'audio_file': 'test.mp3', 'genre': 'Pop'})
        self.assertEqual(rv.status_code, 201)
        rv = self.client().put('/api/songs/1', data={"title": "Dedicated To You", 'artist': 'S', 'audio_file': 'test.mp3', 'genre': 'Pop'})
        self.assertEqual(rv.status_code, 200)
        results = self.client().get('/api/songs/1')
        self.assertIn('Dedicated To You', str(results.data))

    def test_song_deletion(self):
        """Test API can delete an existing song (DELETE request)."""
        rv = self.client().post('/api/songs', data={'title': 'Dont Know Why', 'artist': 'S', 'audio_file': 'test.mp3', 'genre': 'Pop'})
        self.assertEqual(rv.status_code, 201)
        res = self.client().delete('/api/songs/1')
        self.assertEqual(res.status_code, 200)
        # Test to see if it exists, should return a 404
        result = self.client().get('/api/songs/1')
        self.assertEqual(result.status_code, 404)

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()