const passport = require('passport')
const local = require('./local')
const kakao = require('./kakao')
const { User } = require('../models')

module.exports = () => {
  //router에서 req.login 했을 경우
  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      accessToken: user.accessToken ? user.accessToken : '',
      refreshToken: user.refreshToken ? user.refreshToken : '',
    })
  })
  passport.deserializeUser(async (data, done) => {
    try {
      const user = await User.findOne({
        where: { id: data.id },
      })
      const userWithToken = {
        id: user.id,
        accessToken: data.accessToken ? data.accessToken : '',
        refreshToken: data.refreshToken ? data.refreshToken : '',
      }
      done(null, userWithToken)
    } catch (error) {
      console.error(error)
      done(error)
    }
  })

  local()
  kakao()
}
