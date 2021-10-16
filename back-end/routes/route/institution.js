const express = require('express')

const router = new express.Router()

const { institutionController } = require('../../controllers')

const { superAdminAuth } = require('../../utils')

const {
  createInstitution,
  updateInstitution,
  deleteInstitution,
  getInstitutions,
  getInstitution,
  getPaidInstitutions
} = institutionController;

//post methods
// 1)
router.post('/create', createInstitution);

//Patch
// 2)
router.patch('/update/:_id' ,superAdminAuth , updateInstitution)

//delete routes
// 3)
router.delete('/delete/:_id', superAdminAuth , deleteInstitution)

router.get('/paidInstitutions', getPaidInstitutions);

// get routes
// 4)
router.get('/' , superAdminAuth, getInstitutions)

// get routes
// 5)
router.get('/:_id', superAdminAuth , getInstitution)


module.exports = router