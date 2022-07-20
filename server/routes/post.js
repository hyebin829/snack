const express = require('express')
const router = express.Router()
const { Snack, Review, User, Comment, sequelize } = require('../models')

// "SELECT COUNT(*), SnackId
// FROM Favorite GROUP BY SnackId ORDER BY COUNT(*) DESC"

router.get('/popularsnack', async (req, res) => {
  const query = `
    SELECT COUNT(*) as count, SnackId
    FROM Favorite
    GROUP BY SnackId
    ORDER BY count DESC`
  try {
    const popularsnacklist = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(200).json(popularsnacklist)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
