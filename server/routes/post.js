const express = require('express')
const router = express.Router()
const { sequelize } = require('../models')
const { Op } = require('sequelize')

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

module.exports = router
