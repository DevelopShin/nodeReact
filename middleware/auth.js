
const { User } = require('../models/User')
const auth = (req, res, next) => {

      //인증 처리 모듈

      //클라이언트에서 쿠키를 가져온다
      let token = req.cookies.x_auth

      // 토큰을 복호화 한후 유저를 찾는다
      User.findByToken(token, (err, user) => {
            // console.log('auth user: ', user)
            if (err) throw err
            if (!user) return res.json({ isAuth: false, message: '접근제한', error: ture })
            req.token = token;
            req.user = user;
            next()
      })
}

module.exports = { auth };