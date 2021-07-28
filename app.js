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
const favSongRouter =require('./api/favSong/favSong.router')
const messageRouter =require('./api/message/message.router')
const notificationRouter =require('./api/notification/notification.router')

app.use('/upload/message/:id',(req,res)=> res.sendFile(__dirname + '/upload/message/'+req.params.id));
app.use('/upload/music/:id',(req,res)=> res.sendFile(__dirname + '/upload/music/'+req.params.id));
app.use('/upload/post/:id',(req,res)=> res.sendFile(__dirname + '/upload/post/'+req.params.id));
app.use('/upload/video/:id',(req,res)=> res.sendFile(__dirname + '/upload/video/'+req.params.id));

app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)
app.use('/video',videoRouter)
app.use('/song',musicRouter)
app.use('/favsong',favSongRouter)
app.use('/message',messageRouter)
app.use('/notification',notificationRouter)

app.listen(4000, () => {
    console.log('HTTPS Server running on port 4000');
});
  