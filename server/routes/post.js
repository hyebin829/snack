const express = require('express')
const router = express.Router()
const { Snack, Review, User, Comment } = require('../models')

router.get('/popularsnack', async (req, res) => {
    const popularsnacklist = await snack.getFavorites({
        where : {
            
        }
    })
})
