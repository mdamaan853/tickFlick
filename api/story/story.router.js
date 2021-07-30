const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createStory,getAllStory,getStoryByID,getStoryByUserID,getStoryBYFollower,updateStory,deleteStory} = require('./story.service')

const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/story',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('docUrl')

router.post('/upload',upload,createStory)

router.get('/', getAllStory)

router.get('/:id',getStoryByID)

router.get('/user/:userId',getStoryByUserID)

router.get('/follower/:userId',getStoryBYFollower)

router.patch('/update/:id',upload,updateStory)

router.delete('/delete/:id',deleteStory)

module.exports = router