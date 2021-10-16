const express = require('express')
const router = new express.Router()

const { studentController } = require('../../controllers')

const { googleAuthUrl , googleCallBack , updateStudent , deleteStudent , postReview } = studentController

const { auth } = require('../../utils')

//get google auth url
// 1)
router.get('/googleAuthUrl' , googleAuthUrl)

//get google callback
// 2)
router.get("/google/callback", googleCallBack )

//student update
router.patch('/:_id' , auth , updateStudent)

//student delete
router.delete('/:_id' , auth , deleteStudent)

//post review
router.post('/review', postReview)

module.exports = router