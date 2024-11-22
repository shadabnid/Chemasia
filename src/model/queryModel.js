const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type:String
   },
   phone:{
    type:String,
   },
   message:{
    type:String,
   }
},{
    timestamps:true
})

export const QueryModel = mongoose.models.queries||mongoose.model('queries',QuerySchema)