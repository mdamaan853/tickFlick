const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createCommment,getAllCommment,getCommmentByID,updateCommments,getCommmentByPostID,getCommmentByUserID,deleteComment} = require('./comments.service')

const auth =require('../middleware/auth')

const upload = multer({
}).none()

router.post('/upload',auth,upload,createCommment)

router.get('/',getAllCommment)

router.get('/:id',getCommmentByID)

router.get('/user/:userId',getCommmentByUserID)

router.get('/post/:postId',getCommmentByPostID)

router.patch('/update/:id',auth,upload, updateCommments)

router.delete('/delete/:id',auth,deleteComment)

module.exports = router