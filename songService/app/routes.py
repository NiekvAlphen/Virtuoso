from app import models

from flask import request, jsonify, abort, Blueprint, send_from_directory
from werkzeug.utils import secure_filename

from app import app

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/songapi/hello')
def home(): 
    messages = []
    messages.append("Hello world!")
    response = jsonify({'messages': messages}), 200
    return response

@routes_blueprint.route('/songapi/a')
def a(): 
    return "Het zal wel."

@routes_blueprint.route('/songapi/songs', methods=['POST', 'GET'])
def songs():
        if request.method == "POST":
            title = str(request.data.get('title', ''))
            if title: 
                song = models.Song(title=title)
                song.save()
                response = jsonify({
                    'id': song.id,
                    'title': song.title,
                    'artist': song.artist,
                    'audio_file': song.audio_file,
                    'genre': song.genre,
                    'date_created': song.date_created,
                    'date_modified': song.date_modified,
                })
                response.status_code = 201
                return response
        else: 
            # GET
            songs = models.Song.get_all()
            results = []
            
            for song in songs:
                obj = {
                    'id': song.id,
                    'title': song.title,
                    'artist': song.artist,
                    'audio_file': song.audio_file,
                    'genre': song.genre,
                    'date_created': song.date_created,
                    'date_modified': song.date_modified
                }
                results.append(obj)
            return jsonify({'songs': results}), 200
    
@routes_blueprint.route('/songapi/songs/<id>', methods=['GET', 'PUT', 'DELETE'])
def song_manipulation(id, **kwargs):
        # retrieve a song using it's ID
        song = models.Song.query.filter_by(id=id).first()
        if not song:
            # Raise an HTTPException with a 404 not found status status_code
            abort(404)
        
        if request.method == 'DELETE':
            song.delete()
            return {
                "message": "song {} deleted succesfully".format(song.id)
            }, 200
        
        elif request.method == 'PUT':
            title = str(request.data.get('title', ''))
            song.title = title
            song.save()
            response = jsonify({
                'id': song.id,
                'title': song.title,
                'artist': song.artist,
                'audio_file': song.audio_file,
                'genre': song.genre,
                'date_created': song.date_created,
                'date_modified': song.date_modified
            })
            response.status_code = 200
            return response
        else: 
            # GET
            response = jsonify({
                'id': song.id,
                'title': song.title,
                'artist': song.artist,
                'audio_file': song.audio_file,
                'genre': song.genre,
                'date_created': song.date_created,
                'date_modified': song.date_modified
            })
            response.status_code = 200
            return response

@routes_blueprint.route("/songapi/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@routes_blueprint.route('/songapi/uploadfile',methods=['GET','POST'])
def uploadfile():
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)

        f.save(app.config['UPLOAD_FOLDER'] + filename)

        with open(app.config['UPLOAD_FOLDER'] + filename,"rb") as f:
            content = f.read()
        return content