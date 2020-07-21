from MovieTheator import ma

class UserSerializer(ma.Schema):
    class Meta:
        fields = ['id','public_id','user_id','name','email','phone_no','admin','confirm','password']