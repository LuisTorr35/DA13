import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()
user_Ref = db.collection('user')

userAPI = Blueprint('userAPI', __name__)

@userAPI.route('/add', methods = ['POST'])
def create():
    try:
        id = uuid.uuid4()
        user_Ref.document(id.hex).set(request.json)
        return jsonify({"Exito": True}), 200
    except Exception as e:
        return f"Sucedio un Error: {e}"
            
@userAPI.route('/list')
def read():
    try:
        usuarios = [doc.to_dict() for doc in user_Ref.stream()]
        return jsonify(usuarios), 200
    except Exception as e:
        return f"Sucedio un Error: {e}"