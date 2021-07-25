const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createVideo,getAllVideo,getVideoByID,getVideoByMusicID,getVideoByUserID,updateVideo,deleteVideo} = require('./video.service')

const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/video',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).fields([{name:'videoUrl'},{name:"thumbnailUrl"},{name:"musicThumbNailUrl"}])

router.post('/upload',upload,createVideo)

router.get('/', getAllVideo)

router.get('/:id',getVideoByID)

router.get('/user/:userId',getVideoByUserID)

router.get('/music/:musicId',getVideoByMusicID)

router.patch('/update/:id',upload,updateVideo)

router.delete('/delete/:id',deleteVideo)

module.exports = router