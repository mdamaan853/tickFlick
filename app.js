const express = require('express');
const cors =require('cors')
const app = express()
const https = require("https")

app.use(cors());
// app.use(express.json())

const userRouter =require('./api/user/user.router')
const postRouter =require('./api/post/post.router')
const commentRouter =require('./api/comments/comments.router')
const videoRouter =require('./api/video/video.router')
const musicRouter =require('./api/music/music.router')

app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)
app.use('/video',videoRouter)
app.use('/music',musicRouter)

app.listen(4000, () => {
    console.log('HTTPS Server running on port 4000');
});
  