const express = require('express');
const app = express();
const port = 5000;

const {User} = require('./model/user.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs');
const { userInfo } = require('os');
const data = fs.readFileSync('secret.json');
const conf = JSON.parse(data);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect(conf.mongoUrl, {
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

app.listen(port, ()=>console.log(`express server sucssesefull connect to http://localhost:${port}`))
