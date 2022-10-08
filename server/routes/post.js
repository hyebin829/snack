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

router.get('/:id/bestreview', async (req, res, next) => {
  const query = `
    WITH CNT as (
      SELECT COUNT(*) as count, ReviewId
      FROM snack.Like
      GROUP BY ReviewId
      ),
      LIKERS as (
        SELECT ReviewId, JSON_ARRAYAGG(JSON_OBJECT("id",UserId)) as Likers FROM snack.Like GROUP BY ReviewId
        ),
        USERS as (SELECT id,nickname,profileimagesrc FROM users)
      SELECT reviews.id,content,createdAt,updatedAt,UserId,SnackId,rating,count,Likers,nickname,profileimagesrc FROM reviews
      LEFT JOIN CNT
      ON CNT.ReviewId = reviews.id
      LEFT JOIN LIKERS
      ON LIKERS.ReviewId = reviews.id
      LEFT JOIN USERS
      ON USERS.id = reviews.UserId
      WHERE CNT.ReviewId > 0 AND SnackId = ${req.params.id}
      ORDER BY count DESC
      LIMIT 3
      `
  try {
    const bestReviewList = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(201).json(bestReviewList)
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
              attributes: ['id', 'nickname', 'profileimagesrc'],
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

    if (!snack) {
      return res.status(403).send('과자 정보가 없습니다.')
    }

    const review = await Review.create({
      content: req.body.content,
      SnackId: parseInt(req.params.snackId, 10),
      UserId: req.body.userId,
      rating: req.body.rating,
    })

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

    const reviewObj = { ...review.dataValues, Snack: { ...snackInfo[0] }, User: { ...userInfo[0] }, Likers: [] }

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
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    })
    res.status(201).json(reviews)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:userId/myreview', async (req, res, next) => {
  const where = { UserId: parseInt(req.params.userId, 10) }
  console.log(req.query.lastId)
  try {
    const reviews = await Review.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        { model: Snack, attributes: ['name', 'brand', 'imagesrc'] },
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    })
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

router.patch('/:reviewId/like', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.reviewId },
      attributes: { exclude: ['updatedAt'] },
    })
    if (!review) {
      res.status(403).send('존재하지 않는 리뷰입니다.')
    }
    await review.addLikers(req.user.id)
    res.status(201).json({ reviewId: parseInt(req.params.reviewId, 10), userId: req.user.id })
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:reviewId/like', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.reviewId },
    })
    if (!review) {
      res.status(403).send('존재하지 않는 리뷰입니다.')
    }
    await review.removeLikers(req.user.id)
    res.status(201).json({ reviewId: parseInt(req.params.reviewId, 10), userId: req.user.id })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
