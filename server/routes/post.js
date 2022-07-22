const express = require('express')
const router = express.Router()
const { Snack, Review, User, Comment, sequelize } = require('../models')

router.get('/popularsnack', async (req, res, next) => {
  const query = `
    SELECT COUNT(*) as count, SnackId
    FROM Favorite
    GROUP BY SnackId
    ORDER BY count DESC
    LIMIT 10`
  try {
    const selectedSnack = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    const idList = selectedSnack.map((x) => x.SnackId)
    const countList = selectedSnack.map((x) => x.count)

    const popularSnackList = await Snack.findAll({
      where: {
        id: idList.map((x) => x),
      },
      attributes: ['id', 'name', 'brand', 'imagesrc', 'country'],
      raw: true,
    })

    for (let i = 0; i < popularSnackList.length; i++) {
      popularSnackList[i].count = countList[i]
    }

    res.status(201).json(popularSnackList)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
