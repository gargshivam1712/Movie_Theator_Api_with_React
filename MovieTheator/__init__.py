from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)

app.config.from_object(Config)

db = SQLAlchemy(app)

ma = Marshmallow(app)


from MovieTheator import routers