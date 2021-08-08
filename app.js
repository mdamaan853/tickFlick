const express = require('express');
const cors =require('cors')
var fs = require('fs');
const https = require("http")
const app = express()

const key = fs.readFileSync('./private.pem');
const cert = fs.readFileSync('./cert.pem');


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
const likesAndDislikesRouter =require('./api/likesAndDislikes/likesAndDislikes.router')
const followRouter =require('./api/follow/follow.router')
const storyRouter =require('./api/story/story.router')

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
app.use('/likesanddislikes',likesAndDislikesRouter)
app.use('/follow',followRouter)
app.use('/story',storyRouter)

const server = https.createServer({key: key, cert: cert }, app);

server.listen(4000, () => { console.log('listening on 4000') });
  