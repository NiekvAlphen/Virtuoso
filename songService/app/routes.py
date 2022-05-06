from app import models

from flask import request, jsonify, abort, Blueprint, send_from_directory

from app import app

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/')
def home(): 
    messages = []
    messages.append("Hello world!")
    return jsonify({'messages': messages}), 200

@routes_blueprint.route('/a')
def a(): 
    return "Het zal wel."

@routes_blueprint.route('/songs/', methods=['POST', 'GET'])
def songs():
        if request.method == "POST":
            name = str(request.data.get('name', ''))
            if name: 
                song = models.Song(name=name)
                song.save()
                response = jsonify({
                    'id': song.id,
                    'name': song.name,
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
                    'name': song.name,
                    'date_created': song.date_created,
                    'date_modified': song.date_modified
                }
                results.append(obj)
            return jsonify({'songs': results}), 200
    
@routes_blueprint.route('/songs/<id>', methods=['GET', 'PUT', 'DELETE'])
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
            name = str(request.data.get('name', ''))
            song.name = name
            song.save()
            response = jsonify({
                'id': song.id,
                'name': song.name,
                'date_created': song.date_created,
                'date_modified': song.date_modified
            })
            response.status_code = 200
            return response
        else: 
            # GET
            response = jsonify({
                'id': song.id,
                'name': song.name,
                'date_created': song.date_created,
                'date_modified': song.date_modified
            })
            response.status_code = 200
            return response

@routes_blueprint.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)