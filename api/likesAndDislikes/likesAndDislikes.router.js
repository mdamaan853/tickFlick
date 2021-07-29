const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createlikesAndDislike,getAllLikesAndDislike,getlikesAndDislikeByID,getlikesAndDislikeByUserID,updatelikesAndDislikes,deleteLikesAndDislikes,getlikesDlikeBycontentId} = require('./likesAndDislikes.service')

const auth =require('../middleware/auth')
const {checkLike} =require('../middleware/findAlreadyLike')

const upload = multer({
}).none()

router.post('/upload',upload,checkLike,createlikesAndDislike)

router.get('/',getAllLikesAndDislike)

router.get('/:id',getlikesAndDislikeByID)

router.get('/user/:userId',getlikesAndDislikeByUserID)

router.get('/content/:contentId',getlikesDlikeBycontentId)

router.patch('/update/:id',upload, updatelikesAndDislikes)

router.delete('/delete/:id',deleteLikesAndDislikes)

module.exports = router