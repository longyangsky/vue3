const Validator = require('validator');
const isEmpty  =require('./isEmpty');
module.exports = (data)=>{
    let errors={};
    if(!Validator.isLength(data.name,{min:2,max:30})){
		errors.name="名字的长度不能小于2位并且不能大于30位！";
	} 
	if(isEmpty(data.name)){
		errors.name = "名字不能为空！";
	}
 
	if(isEmpty(data.email)){
		errors.email = "邮箱不能为空！";
	}
 
	if(!Validator.isEmail(data.email)){
		errors.email = "邮箱不合法！";
	}
 
	if(isEmpty(data.password)){
		errors.password = "密码不能为空！";
    }else{
        if(Validator.isLength(data.password,{min:6,max:30})){
            errors.password = "密码的长度不能小于6位并且不能大于30位！";
        }  
    }
	if(isEmpty(data.password2)){
		errors.password2 = "确认密码不能为空！";
	}else{ 
        if(!Validator.equals(data.password,data.password2)){
            errors.password2 = "两次密码不一致！";
        }
    }
 
	return{
		errors:errors,
		isValid:isEmpty(errors)  //写一个isEmpty方法，判断当前errors里面有没有内容
	}; 
}