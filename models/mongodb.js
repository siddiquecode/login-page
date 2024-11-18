const mongoose =require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/demidatabase').then(()=>{
    console.log('mongodb had connected');
}).catch(()=>{
    console.log('mongodb has not connected');
})

const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collectionModel = mongoose.model("demi",schema);
module.exports =collectionModel;