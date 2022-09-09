const express = require('express')
const router = express.Router()
const { sequelize, Review, Snack, Comment, User } = require('../models')
const { Op } = require('sequelize')

router.get('/searchresult', async (req, res, next) => {
  const query = `
  SELECT id,name,brand,imagesrc,country FROM snacks 
  WHERE name LIKE "%${req.query.word}%"
  `
  try {
    const searchResult = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(201).json(searchResult)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/popularsnack', async (req, res, next) => {
  const query = `
    WITH CNT as (
      SELECT COUNT(*) as count, SnackId
      FROM Favorite
      GROUP BY SnackId
      )
      SELECT id,name,brand,imagesrc,country,count FROM snacks
      LEFT JOIN CNT
      ON CNT.SnackId = snacks.id
      WHERE SnackId > 0
      ORDER BY count DESC
      LIMIT 10
      `
  try {
    const popularSnackList = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(201).json(popularSnackList)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/topratingsnack', async (req, res, next) => {
  const query = `
  WITH CNT as (
    SELECT AVG(rating) as rating , SnackId FROM reviews
    GROUP BY SnackId
    )
    SELECT id,name,brand,imagesrc,country,rating FROM snacks
    LEFT JOIN CNT
    ON CNT.SnackId = snacks.id
    WHERE rating >= 4
    ORDER BY rating DESC
    LIMIT 10
    `

  try {
    const topRatingSnackList = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(201).json(topRatingSnackList)
  } catch (error) {
    console.error(error)
  }
})

router.get('/topreview', async (req, res, next) => {
  const query = `
  WITH CNT as (
    SELECT COUNT(*) as count, SnackId
    FROM reviews
    GROUP BY SnackId
    )
    SELECT id,name,brand,imagesrc,country,count FROM snacks
    LEFT JOIN CNT
    ON CNT.SnackId = snacks.id
    WHERE SnackId > 0
    ORDER BY count DESC
    LIMIT 10`

  try {
    const topreviewList = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(201).json(topreviewList)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/loadsnackinfo/:id', async (req, res, next) => {
  try {
    const snackInfo = await Snack.findAll({
      where: { id: req.params.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Review,
          attributes: ['id', 'SnackId', 'content', 'rating', 'UserId', 'createdAt'],
        },
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Favorites',
          attributes: ['id'],
        },
      ],
    })
    console.log(snackInfo)
    res.status(201).json(snackInfo)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/:snackId/review', async (req, res, next) => {
  try {
    const snack = await Snack.findOne({
      where: { id: req.params.snackId },
    })
    const review = await Review.create({
      content: req.body.content,
      SnackId: parseInt(req.params.snackId, 10),
      UserId: req.body.userId,
      rating: req.body.rating,
    })

    if (!snack) {
      return res.status(403).send('과자 정보가 없습니다.')
    }
    const snackInfo = await Snack.findAll({
      where: { id: req.params.snackId },
      attributes: ['name', 'brand', 'imagesrc'],
      raw: true,
    })

    const userInfo = await User.findAll({
      where: { id: req.body.userId },
      attributes: ['id', 'nickname', 'profileimagesrc'],
      raw: true,
    })

    const reviewObj = { ...review.dataValues, Snack: { ...snackInfo[0] }, User: { ...userInfo[0] } }

    res.status(201).json(reviewObj)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/:snackId/review', async (req, res, next) => {
  const where = { snackId: parseInt(req.params.snackId, 10) }
  try {
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
      console.log(where)
    }
    const reviews = await Review.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        { model: Snack, attributes: ['name', 'brand', 'imagesrc'] },
        { model: User, attributes: ['id', 'nickname', 'profileimagesrc'] },
      ],
    })
    res.status(201).json(reviews)
    console.log(reviews)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:userId/myreview', async (req, res, next) => {
  const where = { UserId: parseInt(req.params.userId, 10) }
  console.log(req.query.lastId)
  try {
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const reviews = await Review.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        { model: Snack, attributes: ['name', 'brand', 'imagesrc'] },
      ],
    })
    console.log(req.query.lastId)
    res.status(201).json(reviews)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  console.log(req.user)
  try {
    await Review.destroy({
      where: {
        id: req.params.reviewId,
        UserId: req.user.id,
      },
    })
    res.status(200).json({ reviewId: parseInt(req.params.reviewId, 10) })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
