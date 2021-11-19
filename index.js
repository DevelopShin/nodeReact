const bodyParser = require('body-parser');
const {User} = require('./model/user.js'); //user schema
const mongoose = require('mongoose');
const config = require('./config/key');

// const fs = require('fs');
// const data = fs.readFileSync('secret.json');
// const conf = JSON.parse(data);



const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

app.listen(port, ()=>console.log(`express server sucssesefull connect to http://localhost:${port}`))
