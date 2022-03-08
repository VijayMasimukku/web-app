const mongoose= require('mongoose');
const fs =require('fs')
const path=require('path')
const { Schema } = mongoose;

    const detailSchema = new Schema({
        userId:{type:Number,required:true},
        id:{type:Number,required:true},
        title:{type:String,required:true},
        body:{type:String,required:true}
    })
const Detail =mongoose.model('Detail',detailSchema);
async function uploadingdata(){
    await mongoose.connect('mongodb://localhost:27017/webAppData');
    console.log('connected sucessfully to server ')

    fs.readFile(path.join(__dirname,'data.json'),'utf-8',async (err,jsonString)=> {
        if(err){
            console.log(err)
        }else {
            const element=JSON.parse(jsonString)
            await Detail.create(element)
        }
    })
}
uploadingdata()
module.exports=Detail