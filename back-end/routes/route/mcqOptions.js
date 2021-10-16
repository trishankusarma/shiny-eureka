const express = require('express')
const router = new express.Router()

const { mcqOptionsController } = require('../../controllers');
const { upload , auth , generateAccessToken } = require('../../utils');

const { createOption , updateOption , deleteOption  } = mcqOptionsController

//   CreateOptions
router.post('/create/:_id', 
    auth , 
    upload.single('upload_option'),
    generateAccessToken,
    createOption
)

//   Edit_Options  
router.patch(
  '/edit/:_id',
  auth,
  upload.single('upload_option'),
  generateAccessToken,
  updateOption
)

//  Delete_Options
router.delete(
  '/delete/:_id',
  auth,
  generateAccessToken,
  deleteOption
)

module.exports = router