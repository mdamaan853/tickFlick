
const express = require('express')
const router = express.Router()
const multer = require('multer')



const { createUser,loginUser,getAllUser,getUserByID,updateUser,deleteUser} = require('./user.service')
const {checkMobile} =require('../middleware/uniquePhone')

const upload = multer()

router.post('/signup',upload.none(),checkMobile,createUser)

router.post('/login', upload.none(), loginUser)

router.get('/', getAllUser)

router.get('/:id',getUserByID)

router.patch('/update/:id',upload.none(), updateUser)

router.delete('/delete/:id',deleteUser)

module.exports = router