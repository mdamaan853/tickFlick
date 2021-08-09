const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createPost,getAllPost,getPostByID,getPostByUserID,updatePost,deletePost} = require('./post.service')

const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/post',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('postImage')

router.post('/upload',upload,createPost)

router.get('/', getAllPost)

router.get('/:id',getPostByID)

router.get('/user/:id',getPostByUserID)

router.patch('/update/:id',auth,upload, updatePost)

router.delete('/delete/:id',auth,deletePost)

module.exports = router