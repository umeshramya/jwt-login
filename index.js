var curCrypt = require("crypto-js");
var secretKey='PasswordPradyu';//defualt secret key change this in  your application
var moment = require("moment"); //for manging date
var httpMsgs = require("http-msgs");


var encode_base64 = function(rawStr) {//converts raw string 
    var wordArray = curCrypt.enc.Utf8.parse(JSON.stringify(rawStr));
    var result = curCrypt.enc.Base64.stringify(wordArray);
    return result;
}
var decode_base64 = function(encStr) {// this decode the base64
    var wordArray = curCrypt.enc.Base64.parse(encStr);
    var result = wordArray.toString(curCrypt.enc.Utf8);
    return result;
}


var setSecretKey = function(secret){//setting secrete key
    /*
        use this method before starting the application
    */ 
    secretKey = secret;
}
exports.setSecretKey = setSecretKey;

var createJWT = function (payload, header = {"alg": "HS256", "typ": "JWT" }) {
    var secret = secretKey;// this accesed from modulewide secrete key
    var base64Header = encode_base64(header);
    var base64Payload = encode_base64(payload);
   
    var signeture = curCrypt.HmacSHA256(base64Header + "." + base64Payload, secret);
    
    // var base64Signeture = curCrypt.enc.Base64.stringify(signeture);
    var base64Signeture = encode_base64(signeture);

    return base64Header + "." + base64Payload + "." + base64Signeture;
}

exports.createJWT = createJWT;


var validateJWT= function(jwt){
    // this method validates the JWT recived
    try {
        var jwtArray = jwt.split(".");
        var headerDecoded = decode_base64(jwtArray[0]);
        var payloadDecoded = decode_base64(jwtArray[1]);
        var checkJWT = createJWT(JSON.parse(payloadDecoded), JSON.parse(headerDecoded));
    
        if(checkJWT == jwt){
            return payloadDecoded;
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }

    
}
exports.validateJWT = validateJWT;

var sign = function(req, res, user, secret, expireInMinutes=0, https=false){
    // this creates the jwttoken cookie in client
    /*
        user is username
        secrete is secretkey for jwttoken
        expireinminutes set jwttoken invalid set period 0 never expires offcouse cookie expire is deffeb=rent
        https boolen is for check type of serve true create secure cookie
    */ 
    if (https == true){
        var secure  = secure
    }else{
        var secure = '';
    }
    var curDate = moment();
   var payload = {"user" : user, "createdDate" : curDate, "expireInMinutes" : expireInMinutes};// creates the payload for JWT
   setSecretKey(secret);// setting secret key
   createJWT(payload);//create JWT  with payload
   var token = httpMsgs.setCookieString(req, res, "JWTtoken",  createJWT(payload),'', 86400,true, secure ); 
   httpMsgs.setCookie(req, res,token, "Login Successful",true);//res.end() is triggerd by setcooke method 

}
exports.sign = sign;

var signout = function(req, res, https=false){
    if (https == true){
        var secure  = secure
    }else{
        var secure = '';
    }
    var token = httpMsgs.setCookieString(req, res, "JWTtoken",  "",'', 86400,true, secure );
    httpMsgs.setCookie(req, res,token, "Loged out",true);//res.end() is triggerd by setcooke method 
}
exports.signout = signout;


// validate_login middle ware
var validate_login = function(req, res){
    // this method varifies the JWT and expire time
    
    var JWTtoken = httpMsgs.getCookie(req, res, "JWTtoken");// gets the cookie JWTtoken
    if(JWTtoken == ""){// not allowed if JWTtoken is undefined
        //write code for forbidden 
        throw "Not allowed access this content";
    }else{
        var JWTtoken = httpMsgs.getCookie(req, res, "JWTtoken");// gets the cookie JWTtoken
        var validJWT = validateJWT(JWTtoken);// check the authenticity of JET token
        if (validJWT == false){// not allowed if invalid
            //write code for forbidden
            throw "Not allowed access this content";
        }else{// valid JWT token then
            var createdDate = JSON.parse(validJWT).createdDate;// access carted time
            var expireInMinutes = JSON.parse(validJWT).expireInMinutes; //  access expires durration in minutes

            var ftime = moment(createdDate);// created time
            var nowTime = moment();// now time 
            var gapTime = moment(nowTime).diff(ftime, "minutes");// gaptime to compare event from created time

            if ((gapTime > expireInMinutes) && (expireInMinutes > 0 )){
                // if time si more or if expireInMinutes is set more than zero "zero and less means infinate expire time"
                return false;
            }
           return JSON.parse(validJWT)// passe it route with user name careted time and expire
        }
    }
}    
exports.validate_login = validate_login;  
