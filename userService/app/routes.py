from app import models

from flask import request, jsonify, abort, Blueprint, send_from_directory
from werkzeug.utils import secure_filename

from app import app

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/userapi/hello')
def home(): 
    messages = []
    messages.append("Hello world!")
    response = jsonify({'messages': messages}), 200
    return response

@routes_blueprint.route('/userapi/users', methods=['POST', 'GET'])
def songs():
        if request.method == "POST":
            username = str(request.data.get('username', ''))
            if username: 
                user = models.User(username=username)
                user.save()
                response = jsonify({
                    'id': user.id,
                    'username': user.username,
                    'password': user.password,
                    'email': user.email,
                    'image': user.image,
                })
                response.status_code = 201
                return response
        else: 
            # GET
            users = models.User.get_all()
            results = []
            
            for user in users:
                obj = {
                    'id': user.id,
                    'username': user.username,
                    'password': user.password,
                    'email': user.email,
                    'image': user.image,
                }
                results.append(obj)
            return jsonify({'users': results}), 200

@routes_blueprint.route('/userapi/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def user_manipulation(id, **kwargs):
        # retrieve a song using it's ID
        user = models.User.query.filter_by(id=id).first()
        if not user:
            # Raise an HTTPException with a 404 not found status status_code
            abort(404)
        
        if request.method == 'DELETE':
            user.delete()
            return {
                "message": "user {} deleted succesfully".format(user.id)
            }, 200
        
        elif request.method == 'PUT':
            username = str(request.data.get('username', ''))
            user.username = username
            user.save()
            response = jsonify({
                'id': user.id,
                'username': user.username,
                'password': user.password,
                'email': user.email,
                'image': user.image,
            })
            response.status_code = 200
            return response
        else: 
            # GET
            response = jsonify({
                'id': user.id,
                'username': user.username,
                'password': user.password,
                'email': user.email,
                'image': user.image,
            })
            response.status_code = 200
            return response