from MovieTheator import app,db

@app.route('/')
def index():
    return "welcome here"