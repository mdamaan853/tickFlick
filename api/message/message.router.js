const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createMessage,getAllMessage,getMessageByID,getMessageByToUserID,getMessageByfromUserIdID,updatemessage,deleteMessage} = require('./message.service')

const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/message',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('imageUrl')

router.post('/upload',upload,createMessage)

router.get('/',getAllMessage)

router.get('/:id',getMessageByID)

router.get('/to/:to',getMessageByToUserID)

router.get('/from/:from',getMessageByfromUserIdID)

router.patch('/update/:id',upload,updatemessage)

router.delete('/delete/:id',deleteMessage)

module.exports = router