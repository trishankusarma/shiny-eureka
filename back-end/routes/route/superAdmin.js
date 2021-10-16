const express = require('express')

const router = new express.Router()

const { superAdminController } = require('../../controllers')

const { createSuperAdmin , loginSuperAdmin , updateSuperAdmin , deleteSuperAdmin , getSuperAdmins , logoutSuperAdmin } = superAdminController

const { superAdminAuth } = require('../../utils')
 
router.post('/create', createSuperAdmin )

router.post('/login' , loginSuperAdmin)

router.patch('/update' , superAdminAuth , updateSuperAdmin)

router.delete('/delete', superAdminAuth , deleteSuperAdmin)

router.get('/', superAdminAuth , getSuperAdmins)

router.get('/logout', superAdminAuth, logoutSuperAdmin )

module.exports = router