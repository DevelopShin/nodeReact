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
            type:String,
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
      // bcrypt.compare(user.repassword, user.password, function(err, isMatch){
      //       console.log(isMatch)
      //       if(!isMatch) return next(err="비밀번호가 일치하지 않습니다.")
            
      // })

      if (user.isModified('repassword')){
            if(user.password !== user.repassword) return next(err="re비밀번호 불일치")
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash
            user.repassword = hash
            next()     
      }else { next() }
})


// userSchema.pre('save', function(next) {

//       let user = this
//       //비밀번호 암호화
//       if (user.isModified('password')){
//             bcrypt.genSalt(saltRounds, function(err, salt){
//                   if (err) return next(err)
//                   bcrypt.hash(user.password, salt, function(err, hash){
//                         if(err) return next(err)
//                         user.password = hash
//                         next()
                  
//                   })
      
//             })
//       }
// });

userSchema.methods.comparePassword = function(plainPassword, cb) {
      bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
            console.log(err)
            if (err) return cb(err)
            cb(err, isMatch)
      })
}

userSchema.methods.generateToken = function(cb){
      var user = this;
      console.log('user._id', user._id)
      // 토큰 생성
      const token = jwt.sign(user._id.toHexString(), 'secretToken')
      user.token = token;
      user.save(function(err, user){
            if(err) return cb(err)
            cb(null, user)
      })
      // user._id + "secretToken" = token
}

const User = mongoose.model('User', userSchema)
module.exports = {User}