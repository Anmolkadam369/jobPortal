const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({

officeNumber:{
    type:String,
    required:true,
    unique: true
},
whatsapp :{
    type:String
},
linkedIn:{
    type:String
},
instagram:{
    type:String,
},
facebook:{
    type:String,
},
twitter:{
    type:String,
},
snapChat : {
    type:String
},
telegram : {
    type:String
},
isDeleted : {
    type:Boolean,
    default:false
}
},{timestamps:true})

module.exports = mongoose.model("Link", linkSchema);
