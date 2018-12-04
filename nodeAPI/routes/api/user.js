const  express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt= require("bcrypt");
/*const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../routes/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));*/

router.post("/register",(req,res)=>{  
    User.findOne({email:req.body.email}).then(user=>{  
        if(user){ 
            return res.status(400).json({err:"已被注册"});
        }else{
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
                        res.json('匹配正确');
                    }else{
                        res.json('密码错误');
                    }
            })
        }
    })
})

module.exports = router;