# jwt-login

![verson](https://img.shields.io/badge/version-0.0.1-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)



This javascript node module. It is for creating javascript web token and also validating it.
under the hood it uses crypto-js 
## Usage

### Following are the Methods in this module
1. setSecretKey
2. createJWT
3. validateJWT


### include in your project
```
    var JWT = require("jwt-login")
```

### setSecretKey Method
1. It sets the secrete key. if not set, it uses defualt one
2. Always set secreate key before createJWT method. Do not change it later in your code

```
    JWT.setSecretKey();// this sets new secret key 
```

### createJWT Method
1. This methods creates the JWT token
2. it uses secret key 
3. payload argument has to be passed
4. header argument is optional

```
    var payload = {"user" : username, "expDate" : Date}
    //header second is optional.
    var token = JWT.createJWT(payload, header)// returns the JWTtoken
```

### validateJWT Method
1. This returns the payload in case validation was sucusseful.
2. for unsuccessful validatation it returns false.
3. Argument is JWT. This JWT token is the one recived from client application.
```
    var valid = validateJWT(JWT);
    
```
