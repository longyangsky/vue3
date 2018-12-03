const  express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt= require("bcrypt")

router.post("/register",(req,res)=>{  
    User.findOne({email:req.body.email}).then(aa=>{
        console.log('sss')
        if(aa){ 
            res.status(400).json({err:"已被注册"});
        }else{
            const newUser = new User({
                name:req.body.name, 
                email:'11',
            }) 
            bcrypt.genSalt(10, function(err, salt) {
                console.log(err)
                /*bcrypt.hash(req.body.passwrod, salt, (err, hash)=> {
                     if(err){throw err};
                     Usersxx.password =  hash; 
                     newUser.save().then(user=>{
                         res.json(user);
                     })
                     .catch(err=>res.json('发生错误'))
                });*/
            });

        }
    }) 
})
 

module.exports = router;