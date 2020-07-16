from MovieTheator import app,db,ma
from MovieTheator.serializers import UserSerializer
from MovieTheator.models import User

from flask import jsonify,request,make_response,session
import jwt
import datetime
from functools import wraps

@app.route('/')
def index():
    return jsonify({"message":"Welcome here..."})

@app.cli.command('db_create')
def db_create():
    db.create_all()
    print("database created successfully")

@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print("database droped successfully")

########################################
# user authentication

@app.route('/login',methods=['POST'])
def login():
    auth = request.authorization
    print(auth)
    if not auth or not auth.username or not auth.password:
        return make_response("All details Fields necessary",401,{'www-Authentication':'Basic realm="login required"'})
    user = User.query.filter_by(user_id = auth.username).first()
    if not user:
        return make_response("Invalid Username and Password",401,{'www-Authentication':'Basic realm="login required"'})
    if user.get_password(auth.password):
        token = jwt.encode({'public_id':user.public_id,'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
        return jsonify({"token":token.decode('UTF-8'),"user":user_serializer_object.dump(user)})
    return make_response("Invalid Username and Password",401,{'www-Authentication':'Basic realm="login required"'})



def token_required(f):
    @wraps(f)
    def decoratored(*args,**kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({"message":"Token is missing"}),401
        try:
            data = jwt.decode(token,app.config['SECRET_KEY'])
            
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({"message":"Token is invalid"}),401
        return f(current_user,*args,**kwargs)
    return decoratored

@app.route('/logout',methods=['GET'])
@token_required
def logout(current_user):
    config = {
        'headers':{
            'Content-Type':'applications/json',
            'x-access-token':None
        }
    }
    return make_response("Logout Successfully",200,config)
        
########################################
# User Api

user_serializer_object = UserSerializer()
users_serializer_object = UserSerializer(many=True)

@app.route('/user',methods=['GET'])
@token_required
def user_get_all(current_user):
    if not current_user.admin:
        return jsonify({"message":"You are not authorized"}),401
    users = User.query.all()
    return jsonify(users_serializer_object.dump(users))

@app.route('/profile',methods=['GET'])
@token_required
def profile(current_user):
    return jsonify(user_serializer_object.dump(current_user))


@app.route('/user',methods=['POST'])
def user_set():
    data = request.get_json()
    is_user = User.query.filter((User.user_id==data['user_id']) |  (User.email == data['email']) | ( User.phone_no==int(data['phone_no']))).first()
    #is_user = User.query.filter((User.user_id==data['user_id']) or (User.phone_no==int(data['phone_no'])) or (User.email==data['email'])).first()
    if is_user:
        return jsonify({"message":"User is already exist"})

    user = User(user_id = data['user_id'],name = data['name'],email=data['email'],phone_no=data['phone_no'],admin=False)
    user.set_password(data['password'])
    user.set_public_id()
    db.session.add(user)
    db.session.commit()
    return jsonify(user_serializer_object.dump(user))

@app.route('/user/<user_id>',methods=['GET'])
@token_required
def user_get_single(current_user,user_id):
    is_user = User.query.filter_by(user_id=user_id).first()
    if is_user:
        return jsonify(user_serializer_object.dump(is_user))
    else:
        return jsonify({"message":"User Id doesn't exist"})

@app.route('/user/<user_id>',methods=['PUT'])
@token_required
def user_update(current_user,user_id):
    is_user = User.query.filter_by(user_id=user_id).first()
    if not is_user:
        return jsonify({"message":"User Id doesn't exist"}) 
    else:
        data = request.get_json()
        if data['name']:
            is_user.name=data['name']
        if data['email']:
            is_user.email=data['email']
        if data['phone_no']:
            is_user.phone_no = data['phone_no']
        if data['password']:
            is_user.set_password(data['password'])
        db.session.add(is_user)
        db.session.commit()
        new_user = User.query.filter_by(user_id=user_id).first()
        return jsonify(user_serializer_object.dump(new_user))

@app.route('/user/<user_id>',methods=['DELETE'])
@token_required
def user_delete(current_user,user_id):
    is_user = User.query.filter_by(user_id=user_id).first()
    if not is_user:
        return jsonify({"message":"User Id doesn't exist"}) 
    else:
        db.session.delete(is_user)
        db.session.commit()
        
        return jsonify({"message":"Deleted successfully"})

##########################################################