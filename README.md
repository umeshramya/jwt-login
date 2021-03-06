# jwt-login

![verson](https://img.shields.io/badge/version-0.0.3-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)



This javascript node module. It is for creating javascript web token and also validating it.
under the hood it uses crypto-js 
## Usage

### Following are the Methods in this module
1. setSecretKey
2. createJWT
3. validateJWT
4. sign
5. signout
6. validate_login


### include in your project
``` javascript
    var JWT = require("jwt-login")
```

### setSecretKey Method
1. It sets the secrete key. if not set, it uses defualt one
2. Always set secreate key before createJWT method. Do not change it later in your code

``` javascript
    JWT.setSecretKey();// this sets new secret key 
```

### createJWT Method
1. This methods creates the JWT token
2. it uses secret key 
3. payload argument has to be passed
4. header argument is optional

``` javascript
    var payload = {"user" : username, "expDate" : Date}
    //header second is optional.
    var token = JWT.createJWT(payload, header)// returns the JWTtoken
```

### validateJWT Method
1. This returns the payload in case validation was sucusseful.
2. for unsuccessful validatation it returns false.
3. Argument is JWT. This JWT token is the one recived from client application.
``` javascript
    var valid = validateJWT(JWT);
    
```

### express js example
``` javascript
const express = require("express")
const httpMsgs = require("http-msgs");
const jwtLogin = require("jwt-login");
const bodyparser = require("body-parser");
const app = express();

app.listen(9000);

app.use(bodyparser.urlencoded({extended : false}));

//login html file
app.get("/login", function(req, res){
    res.sendFile(__dirname + "/login.html");
});

//login
app.post("/login",  function(req, res){
    var user = req.body.user
    var password = req.body.password
    if (user == password){
        jwtLogin.sign(req, res, user,"topsecret", 1, false);  
    }else{
        httpMsgs.send500(req, res, "invalid user");
    }
    
});
// logout
app.get("/logout", function(req, res){
    jwtLogin.signout(req, res, false);
});

var valid_login = function(req, res, next){
    try {
        req.jwt = jwtLogin.validate_login(req, res);
        next();
    } catch (error) {
        httpMsgs.send500(req, res, error);
        
    }

}


/*
===============================
    routes 
==============================

*/ 

app.get("/article", valid_login, function(req, res){
    var user = req.jwt.user//this the user 
    httpMsgs.sendJSON(req, res,{
        from    : "get"
    });
});

app.post("/article", function(req, res){
    httpMsgs.sendJSON(req, res,{
        from    : "post"
    });
});
```
