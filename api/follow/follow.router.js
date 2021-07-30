const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createFollow,getAllFollow,getFollowByUserID,getFollowByfollowedUID,getFollowgByID,updateFollow,deleteFollow} = require('./follow.service')

const auth =require('../middleware/auth')

const upload = multer().none()

router.post('/upload',upload,createFollow)

router.get('/', getAllFollow)

router.get('/:id',getFollowgByID)

router.get('/user/:userId',getFollowByUserID)

router.get('/follow/followedUID',getFollowByfollowedUID)

router.patch('/update/:id',upload, updateFollow)

router.delete('/delete/:id',deleteFollow)

module.exports = router