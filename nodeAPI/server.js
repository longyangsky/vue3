const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const port = process.env.PORT || 9000;

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true }).then(()=>{
    console.log('数据库连接成功');

}).catch((err)=>{
    console.log(`数据库连接失败`+err);
})

app.listen(port,()=>{
    console.log(`服务启动在${port}`);
})
 
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

//引入router
const user= require("./routes/api/user");

app.use("/api/user",user);

app.get('/',(req,res)=>{
    res.json('测试成功')
})