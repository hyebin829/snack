const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')

const { User, Review, Image, Comment, Snack } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Review,
            attributes: ['id', 'UserId'],
          },
          {
            model: Snack,
            as: 'Favorited',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      })
      res.status(200).json(userWithoutPassword)
    } else {
      res.status(200).json(null)
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/kakao/login', passport.authenticate('kakao'))

router.get(
  '/kakao/login/callback',
  passport.authenticate('kakao', {
    failureMessage: true,
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/',
  })
)

router.post('/logout', async (req, res) => {
  try {
    const LOGOUT_REDIRECT_URI = 'http://localhost:3065/user/kakao/logout'
    const REST_API_KEY = process.env.KAKAO_KEY
    const logout = await axios({
      method: 'GET',
      url: `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`,
    })
  } catch (error) {
    console.error(error)
  }

  req.logout()
  req.session.destroy()
  res.send('logoutDone')
})

router.get('/kakao/logout', async (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('http://localhost:3000')
})

module.exports = router
