const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const { User } = require('../models')

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_KEY,
        callbackURL: '/user/kakao/login/callback',
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile, accessToken, refreshToken)
        try {
          const exUser = await User.findOne({
            where: { email: profile.id },
          })
          if (exUser) {
            const userWithToken = {
              id: exUser.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            }
            done(null, userWithToken)
          } else {
            const newUser = await User.create({
              email: profile.id,
              nickname: `유저${profile.id}`,
              password: 'kakaologin',
              profileimagesrc: 'snackpedia-profileimage-default.png',
            })
            const newUserwithToken = {
              id: newUser.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            }
            done(null, newUserwithToken)
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
