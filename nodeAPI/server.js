const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

app.listen(port,()=>{
    console.log(`服务启动在${port}`);
})

app.get('/',(req,res)=>{
    res.json('测试成功')
})