from app import models

from flask import request, jsonify, abort, Blueprint, send_from_directory
from werkzeug.utils import secure_filename
from azure.storage.blob import BlobServiceClient, BlobClient
from azure.storage.blob import ContentSettings, ContainerClient

from app import app

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/api/songs/hello')
def home(): 
    messages = []
    messages.append("Hello world!")
    response = jsonify({'messages': messages}), 200
    return response

@routes_blueprint.route('/api/songs/a')
def a(): 
    return "Het zal wel."

@routes_blueprint.route('/api/songs', methods=['POST', 'GET'])
def songs():
        if request.method == "POST":
            title = str(request.data.get('title', ''))
            artist = str(request.data.get('artist', ''))
            audio_file = str(request.data.get('audio_file', ''))
            genre = str(request.data.get('genre', ''))
            if title: 
                song = models.Song(title=title, artist=artist, audio_file=audio_file, genre=genre)
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
    
@routes_blueprint.route('/api/songs/<id>', methods=['GET', 'PUT', 'DELETE'])
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

@routes_blueprint.route('/api/songs/search/<term>', methods=['GET', 'PUT', 'DELETE'])
def song_search(term, **kwargs):
        # GET
        # retrieve a song using a term matching it's title
        term = term.replace('%20', ' ')
        song = models.Song.query.filter_by(title=term).first()
        if not song:
            # retrieve a song using a term matching it's artist
            song = models.Song.query.filter_by(artist=term).first()

            if not song:
                # Raise an HTTPException with a 404 not found status status_code
                abort(404)
            else:
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
            arrayResponses = []
            response = {
                'id': song.id,
                'title': song.title,
                'artist': song.artist,
                'audio_file': song.audio_file,
                'genre': song.genre,
                'date_created': song.date_created,
                'date_modified': song.date_modified
            }
            arrayResponses.append(response)
            finalResponse = jsonify(arrayResponses)
            finalResponse.status_code = 200
            return finalResponse

@routes_blueprint.route("/songapi/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@routes_blueprint.route('/api/songs/uploadfile',methods=['GET','POST'])
def init():    

    connect_str = "DefaultEndpointsProtocol=https;AccountName=virtuosoopslag;AccountKey=fmzulsM8DvOn0zueNvTu6sTx6AwwTvnl/PAiH9F/ILPH2BWkEIG107mLeAGxXY7mL5g1rR3FWHXy+AStoUlmWg==;EndpointSuffix=core.windows.net"

    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

    blob_client = blob_service_client.get_blob_client(container='songs', blob=str(request.data.get('filename', ''))+'.mp3')

    print("\nUploading to Azure Storage as blob:\n\t" + str(request.data.get('filename', '')))

    blob_client.upload_blob(request.data.get('file', ''))