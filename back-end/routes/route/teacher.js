const express = require('express')

const router = new express.Router()

const { teacherController } = require('../../controllers')

const { googleAuthUrl , googleCallBack , register , login , update , profile , logout } = teacherController

const { auth } = require('../../utils')

//get google auth url
// 1)
router.get('/googleAuthUrl' , googleAuthUrl)

//get google callback
// 2)
router.get("/google/callback", googleCallBack )

//patch routes
// 3)
router.patch('/update', auth , update)

// get routes
// 4)
router.get('/profile', auth , profile)

//5)
router.get('/logout', auth , logout)

module.exports = router