import os
class Config(object):
    SECRET_KEY = 'SHVIAM GARG'
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR,'MovieTheator.db')
    