const express = require('express')
const router = new express.Router()

const { mcqController } = require('../../controllers');
const { upload , auth , generateAccessToken } = require('../../utils');

const { createMcq , updateMcq , deleteMcq  } = mcqController

//   CreateMcqs
router.post('/create/:_id', 
       auth , 
       createMcq
)

//   Edit_MCQ_Details  
router.patch(
  '/edit/:_id',
  auth,
  upload.single('upload_mcq'),
  generateAccessToken,
  updateMcq
);

//  Delete_MCQ_Details
router.delete(
  '/delete/:_id',
  auth,
  generateAccessToken,
  deleteMcq
);

module.exports = router