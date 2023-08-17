const mongoose = require("mongoose")

const newSchema = mongoose.Schema({
    name:String,
    email:String,
    password :String
})
module.exports = mongoose.model('users',newSchema)