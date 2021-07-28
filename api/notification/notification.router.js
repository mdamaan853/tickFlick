const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createnotification,getAllnotification,getnotificationByID,getnotificationByUserId,getnotificationByType,updatenotification,deletenotification} = require('./notification.service')

const auth =require('../middleware/auth')

const upload = multer().none()

router.post('/upload',upload,createnotification)

router.get('/',getAllnotification)

router.get('/:id',getnotificationByID)  

router.get('/user/:userId',getnotificationByUserId)

router.get('/type/:type',getnotificationByType)

router.patch('/update/:id',upload,updatenotification)

router.delete('/delete/:id',deletenotification)

module.exports = router