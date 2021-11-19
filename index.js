const {User} = require('./models/user.js'); //user schema
const mongoose = require('mongoose');
const config = require('./config/key');
const cookieParser = require('cookie-parser')

// const fs = require('fs');
// const data = fs.readFileSync('secret.json');
// const conf = JSON.parse(data);



const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
} ).then(() => console.log('MongoDB Connected...'))
      .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello world!!!'))

app.post('/registeer', (req, res) => {
      //get client info
      const user = new User(req.body)

      user.save((err, userInfo) => {
            if(err) return res.json({success:false, err})
            return res.status(200).json({success:true })
      })

})

app.post('/login',(req, res) =>{
      //1 DB에서 입력된 정보를 찾는다.
      // 2 DB비밀번호와 입력 비밀번호 일치 여부 확인
      // 3 일치시 토큰 생성 else, 가입요청 메시지
      User.findOne({email: req.body.email}, (err,user) =>{
            if(!user) {
                  return res.json({
                        loginSuccess: false,
                        message: "일치하는 정보가 없습니다."
                  })
            }
            // 비밀번호 일치체크
            user.comparePassword(req.body.password, (err, isMatch) =>{
                  if(!isMatch)
                        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
                  
                  user.generateToken((err, user) =>{
                        console.log('generatetoken: ', user)
                        if (err) return res.status(400).send(err);
                        //토큰 저장 (쿠키, 로컬스토리지)
                        res.cookie("x_auth", user.token)
                        .status(200)
                        .json({loginSuccess: true, userId: user._id, message:"로그인성공"})

                  })
            })

      })

})




app.listen(port, ()=>console.log(`express server sucssesefull connect to http://localhost:${port}`))
