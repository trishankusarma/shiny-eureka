const express = require('express');
const router = new express.Router();

const {  fillUpController } = require('../../controllers');
const { upload , auth , generateAccessToken } = require('../../utils')

const { createFillUp , updateFillUp , deleteFillUp } = fillUpController

// create
router.post(
    '/create/:_id',
    auth,
    upload.single('upload_fill_up'),
    generateAccessToken,
    createFillUp
)

// Edit_Fill_Up_Details 
router.patch(
    '/edit/:_id',
    auth,
    upload.single('upload_fill_up'),
    generateAccessToken,
    updateFillUp
)

// Delete_Fill_Up_Details 
router.delete(
    '/delete/:_id',
    auth,
    generateAccessToken,
    deleteFillUp
)

module.exports = router;