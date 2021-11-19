const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
      mame:{
            type: String,
            maxlength: 50
      },
      email: {
            type: String,
            minlength: 5,
            unique: 1
      },
      lastname: {
            type: String,
            maxlength: 50,
            
      },
      role: {
            type: Number,
            default: 0
      },
      image: String,
      token: {
            type: String
      },
      tokenExp: {
            type:Number
      }
})

const User = mongoose.model('User', userSchema)
module.exports = {User}