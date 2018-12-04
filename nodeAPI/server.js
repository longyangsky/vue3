const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
//创建接口文档
const swaggerUi = require('swagger-ui-express'); 
 

const swaggerDocument = require('./routes/swagger.json');
const options={
    swaggerOptions: {
        Authorize : false 
      },
      customCss: '.swagger-ui .topbar { display: none }'
}
//swaggerUi.setup(swaggerDocument,options)
app.use('/api-docs', swaggerUi.serve,  function(req, res) {
    swaggerDocument.host = req.get('host'); // Replace hardcoded host information in Swagger file
    swaggerDocument.schemes = [req.protocol]; // Replace hardcoded protocol information in Swagger file
    swaggerUi.setup(swaggerDocument,options)(req, res);
  });
  

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