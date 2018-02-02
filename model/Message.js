var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PostSchema=new Schema({
    sender: String,
    date: String,
    value:String


});
var Message=mongoose.model("messages",PostSchema);
module.exports=Message;
