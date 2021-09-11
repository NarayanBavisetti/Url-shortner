const mongoose = require('mongoose')
const shortId = require('shortid')
const urlSchema = mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortId.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})

const shortUrl =  mongoose.model("url-shortner",urlSchema);
module.exports = shortUrl;