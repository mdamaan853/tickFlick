const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createFavSong,getAllFavSong,getFavSongByID,getFavSongByUserID,getFavSongBysongId,updateFavSong,deleteFavSong} = require('./favSong.service')

const auth =require('../middleware/auth')

const upload = multer().none()

router.post('/upload',upload,createFavSong)

router.get('/', getAllFavSong)

router.get('/:id',getFavSongByID)

router.get('/user/:userId',getFavSongByUserID)

router.get('/song/:songId',getFavSongBysongId)

router.patch('/update/:id',upload, updateFavSong)

router.delete('/delete/:id',deleteFavSong)

module.exports = router