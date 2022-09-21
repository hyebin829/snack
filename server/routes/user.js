const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const axios = require('axios')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const { User, Review, Image, Comment, Snack } = require('../models')

try {
  fs.accessSync('profileimage')
} catch (error) {
  fs.mkdirSync('profileimage')
}

const filesizeErrorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).send('20mb 이하의 이미지만 가능합니다. 사진을 다시 선택해주세요.')
    return
  } else {
    next()
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'profileimage')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext)
      done(null, basename + new Date().getTime() + ext)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
})

router.patch('/profileimage', upload.none('profileimage'), async (req, res, error) => {
  try {
    await User.update(
      {
        profileimagesrc: req.body.imagesrc,
      },
      {
        where: { id: req.user.id },
      }
    )
    res.status(200).json(req.body.imagesrc)
  } catch (error) {
    console.error(error)
  }
})

router.post('/image', upload.single('profileimage'), filesizeErrorHandler, async (req, res, error) => {
  res.json(req.file.filename)
})

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

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.')
    }
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    })
    if (exNickname) {
      return res.status(403).send('이미 사용중인 닉네임입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    })
    res.status(201).send('ok')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }

    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }

      const userInfoWithoutPassword = await User.findOne({
        where: { id: user.id },
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
      return res.status(200).json(userInfoWithoutPassword)
    })
  })(req, res, next)
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
  if (req.user.accessToken && req.user.refreshToken) {
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

router.patch('/:snackId/favorite', async (req, res, next) => {
  try {
    const snack = await Snack.findOne({
      where: { id: req.params.snackId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    if (!snack) {
      res.status(403).send('존재하지 않는 과자입니다.')
    }
    await snack.addFavorites(req.user.id)
    console.log(snack)
    res.status(201).json(snack)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:snackId/favorite', async (req, res, next) => {
  try {
    const snack = await Snack.findOne({
      where: { id: req.params.snackId },
    })
    if (!snack) {
      res.status(403).send('존재하지 않는 과자입니다.')
    }
    await snack.removeFavorites(req.user.id)
    res.status(201).json(snack)
  } catch (error) {
    console.error(error)
  }
})

router.patch('/nickname', async (req, res, next) => {
  try {
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    })
    if (exNickname) {
      return res.status(403).send('이미 사용중인 닉네임입니다.')
    }
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    )
    res.status(201).json({ nickname: req.body.nickname })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
