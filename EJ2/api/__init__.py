from flask import Flask
from firebase_admin import credentials, initialize_app

cred = credentials.Certificate("api\da13-1eee0-firebase-adminsdk-ocyuv-858218ced6.json")
default_app = initialize_app(cred)

def create_app():
    app = Flask(__name__)
    
    from .userAPI import userAPI
    
    app.register_blueprint(userAPI, url_prefix = '/user')
    
    return app