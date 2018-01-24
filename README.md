# jwt-login
![version 0.0.0]()


This javascript node module is for creates javascript web token and also validating it.
under the hood it uses crypto-js 
## Usage

### Following the Methods in this module
1. setSecretKey
2. createJWT
3. validateJWT



### include in your project
```
    var JWT = require("jwt-login")
```

### setSecretKey Method
1. It sets the secrete key. if not set it uses defualt one
2. Always set secreate key before createJWT method. do not change it later in your code

```
    JWT.setSecretKey();// this sets new secret key 
```

### createJWT Method
1. This s
```
    var token = JWT.createJWT()// returns the JWTtoken
```

### validateJWT Method
1. This returns the payload in case validation was sucusseful.
2. for unsuccessful validatation it returns false.
3. Argument is JWT. This JWT token recived from client application.
```
    var valid = validateJWT(JWT);
    
```