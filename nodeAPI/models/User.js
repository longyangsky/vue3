const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avator:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        default:Date.now
    }

});

module.exports =mongoose.model("users",UserSchema);