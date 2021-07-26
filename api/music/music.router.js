const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createMusic,getAllMusic,getMusicByID,updateMusic,deleteMusic} = require('./music.service')

const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/music',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).fields([{name:"audioFileUrl"},{name:"thumbnailUrl"}])

router.post('/upload',upload,createMusic)

router.get('/', getAllMusic)

router.get('/:id',getMusicByID)

// router.get('/user/:userId',getVideoByUserID)

// router.get('/music/:musicId',getVideoByMusicID)

router.patch('/update/:id',upload, updateMusic)

router.delete('/delete/:id',deleteMusic)

module.exports = router