
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt; 
var opts = {}
const  User  = require('../models/User');
 //通过配置信息来生成jwt的请求，验证这个token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//加密密码 
opts.secretOrKey = 'jiamima';

//header中设置 Authorization
module.exports = passport =>{
    passport.use(new JwtStrategy(opts,function(jwt_payload,next){
        User.findById(jwt_payload.id)
        .then(user=>{
            if(user){
                next(null,user);
            }else{ 
                next(null,false);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }))
}