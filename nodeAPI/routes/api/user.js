const  express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport"); 
//验证
const validatorRegisterInput =require("../../validator/register");
/*const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../routes/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));*/

router.post("/register",(req,res)=>{  
    User.findOne({email:req.body.email}).then(user=>{  
        if(user){ 
            return res.status(400).json({err:"已被注册"});
        }else{ 
            const{errors,isValid} =validatorRegisterInput(req.body);
           if(!isValid){
                return res.json(errors);
            }
            const newUser = new User({
                name:req.body.name, 
                password:req.body.password,
                email:req.body.email
            })  
            bcrypt.genSalt(10, function(err, salt) { 
                bcrypt.hash(newUser.password, salt, (err, hash)=> { 
                     if(err){
                         res.json(err)
                     };
                     newUser.password =  hash; 
                     newUser.save().then(user=>{
                           res.json(user); 
                     })
                     .catch(err=>res.json('发生错误'))
                });
            });

        }
    }) 
})


router.post("/login",(req,res)=>{
    const  email = req.body.email;
    const password = req.body.password;  
    
    User.findOne({email:email})
    .then((user)=>{ 
        if(!user){
         res.status(404).json({user:"用户不存在"});
        }else{ 
            bcrypt.compare(password, user.password)
            .then(ismatch=>{ 
                    if(ismatch){ 
                        const rule={
                            id:user.id,
                            name:user.name,
                            identity:user.identity
                        } 
                        jwt.sign(rule,"jiamima", { expiresIn: 60 * 60 },(err,token)=>{
                            if(err){
                                res.json({success:false,msg:'生成token错误'})
                            }else{
                                res.json({
                                    success:true,
                                    msg:'访问正确',
                                    //因为passport-jwt加密的前面带有bearer
                                    token:`bearer ${token}`
                                }) 
                            }
                        })
                    }else{
                        res.json({success:false,msg:'密码错误'});
                    }
            })
        }
    })
})


router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    }); 
})

module.exports = router;