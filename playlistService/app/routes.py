from app import models

from flask import request, jsonify, abort, Blueprint, send_from_directory

from app import app

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/api/playlists/hello')
def home(): 
    messages = []
    messages.append("Hello world!")
    response = jsonify({'messages': messages}), 200
    return response

@routes_blueprint.route('/api/playlists/a')
def a(): 
    return "Het zal wel."

@routes_blueprint.route('/api/playlists', methods=['POST', 'GET'])
def playlists():
        if request.method == "POST":
            title = str(request.data.get('title', ''))
            creator = str(request.data.get('creator', ''))

            if title: 
                playlist = models.Playlist(title=title, creator=creator)
                playlist.save()
                response = jsonify({
                    'id': playlist.id,
                    'title': playlist.title,
                    'creator': playlist.creator,
                    'songs_array': playlist.songs_array,
                    'date_created': playlist.date_created,
                    'date_modified': playlist.date_modified,
                })
                response.status_code = 201
                return response
        else: 
            # GET
            playlists = models.Playlist.get_all()
            results = []
            
            for playlist in playlists:
                obj = {
                    'id': playlist.id,
                    'title': playlist.title,
                    'creator': playlist.creator,
                    'songs_array': playlist.songs_array,
                    'date_created': playlist.date_created,
                    'date_modified': playlist.date_modified
                }
                results.append(obj)
            return jsonify({'playlists': results}), 200
    
@routes_blueprint.route('/api/playlists/<id>', methods=['GET', 'PUT', 'DELETE'])
def song_manipulation(id, **kwargs):
        # retrieve a playlist using it's ID
        playlist = models.Playlist.query.filter_by(id=id).first()
        if not playlist:
            # Raise an HTTPException with a 404 not found status status_code
            abort(404)
        
        if request.method == 'DELETE':
            playlist.delete()
            return {
                "message": "playlist {} deleted succesfully".format(playlist.id)
            }, 200
        
        elif request.method == 'PUT':
            title = str(request.data.get('title', ''))
            playlist.title = title
            playlist.save()
            response = jsonify({
                'id': playlist.id,
                'title': playlist.title,
                'creator': playlist.creator,
                'songs_array': playlist.songs_array,
                'date_created': playlist.date_created,
                'date_modified': playlist.date_modified
            })
            response.status_code = 200
            return response
        else: 
            # GET
            response = jsonify({
                'id': playlist.id,
                'title': playlist.title,
                'creator': playlist.creator,
                'songs_array': playlist.songs_array,
                'date_created': playlist.date_created,
                'date_modified': playlist.date_modified
            })
            response.status_code = 200
            return response

@routes_blueprint.route('/api/playlists/search/<user_id>', methods=['GET', 'PUT', 'DELETE'])
def playlist_search(user_id, **kwargs):
        # retrieve a playlist using it's ID
        playlist = models.Playlist.query.filter_by(creator=user_id).first()
        if not playlist:
            # Raise an HTTPException with a 404 not found status status_code
            abort(404)
        else: 
            # GET
            response = jsonify({
                'id': playlist.id,
                'title': playlist.title,
                'creator': playlist.creator,
                'songs_array': playlist.songs_array,
                'date_created': playlist.date_created,
                'date_modified': playlist.date_modified
            })
            response.status_code = 200
            return response