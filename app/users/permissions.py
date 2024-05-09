import jwt
import datetime

def generate_tokens(user):
    loadjwt = {
        "email": user[0].email,
        "expire": (
            datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
        ).isoformat(),
        "timestart": (datetime.datetime.utcnow()).isoformat(),   
    }
    token = jwt.encode(loadjwt, "secret", algorithm="HS256")
    return token


def generate_refreshtokens(user):
    loadjwt = {
        "email": user[0].email,
        "expire": (
            datetime.datetime.utcnow() + datetime.timedelta(days=365)
        ).isoformat(),
        "timestart": (datetime.datetime.utcnow()).isoformat(),   
    }
    token = jwt.encode(loadjwt, "secret", algorithm="HS256")
    return token

def verify_token(token , email):
    if token :
        bearer_token = token.split(" ")[1]
        token_ref = jwt.decode(bearer_token, "secret",  algorithms=["HS256"])
        if email == token_ref['email']: 
            return True
        else : 
            return False  
    else:
        return False
        
    
