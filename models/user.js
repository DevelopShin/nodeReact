const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userSchema = mongoose.Schema({
      name:{
            type: String,
            maxlength: 50
      },

      password:{
            type:String,
            minlength:5
      },
      repassword:{
            type: String,
            minlength:5
      },

      email: {
            type: String,
            minlength: 10,
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

userSchema.pre('save', function(next) { 
      let user = this

      if (user.isModified('password')){
            // if(user.password !== user.repassword) return next(err="re비밀번호 불일치")
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash
            user.repassword = hash
            // user.repassword = ""
            next()     
      }else { next() }
})



userSchema.methods.comparePassword = function(plainPassword, cb) {
      bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
            console.log(err)
            if (err) return cb(err)
            cb(null, isMatch)
      })
}
const tokenText = "secretToken"
userSchema.methods.generateToken = function(cb){
      var user = this;
      console.log('user._id dyrl', user._id)
      // 토큰 생성
      const token = jwt.sign(user._id.toHexString(), tokenText)
      user.token = token;
      console.log('token입니다:', token)
      user.save(function(err, user){
            console.log(err)
            if(err) return cb(err)
            cb(null, user)
      })
      // user._id + "secretToken" = token
}


userSchema.statics.findByToken = function(token, cb) {
      let user = this

      jwt.verify(token, tokenText, function(err, decoded){  // 토큰 decoding = userID
            user.findOne({"_id": decoded, "token": token}, function(err, user){
                  if(err) return cb(err);
                  cb(null, user)
            })
      })
}




const User = mongoose.model('User', userSchema)
module.exports = {User}