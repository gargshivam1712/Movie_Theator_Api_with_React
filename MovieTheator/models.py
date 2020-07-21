from MovieTheator import db
from sqlalchemy import Column,Integer,Boolean,Date,String
from werkzeug.security import generate_password_hash,check_password_hash
import random
import string

class User(db.Model):
    id = Column(Integer,primary_key=True)
    public_id = Column(Integer,unique=True)
    user_id = Column(String,unique = True)
    name = Column(String)
    email = Column(String,unique = True)
    phone_no = Column(Integer,unique = True)
    admin = Column(Boolean)
    confirm = Column(Boolean,default=False)
    password = Column(String(150))
    

    def set_password(self,password):
        self.password = generate_password_hash(password)
    
    def get_password(self,password):
        return check_password_hash(self.password,password)

    def set_public_id(self,length=50):
        letters_and_digits = string.ascii_letters + string.digits
        public_id = ''.join((random.choice(letters_and_digits) for i in range(length)))
        is_user = User.query.filter_by(public_id=public_id).first()
        if is_user:
            self.set_public_id()
        else:
            self.public_id = public_id
            
        


