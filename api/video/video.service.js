var fs = require("fs");
var JSZip = require("jszip");
const mysql = require('../../database')
module.exports = ({
    createVideo: (req, res) => {
        if(req.files){
            console.log(req.files)
            if(req.files.videoUrl){
                req.body.videoUrl= req.files.videoUrl[0].destination+"/"+req.files.videoUrl[0].filename
               
            }
            if(req.files.thumbnailUrl){
                req.body.thumbnailUrl= req.files.thumbnailUrl[0].destination+"/"+req.files.thumbnailUrl[0].filename
            }
            if(req.files.musicThumbNailUrl){
                req.body.musicThumbNailUrl= req.files.musicThumbNailUrl[0].destination+"/"+req.files.musicThumbNailUrl[0].filename
            }
        }
        mysql.query(`INSERT INTO video (userId,canCommnet,videoUrl,thumbnailUrl,status,musicId,musicThumbNailUrl,hasTags,descrition,category,location,isLong) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`, [req.body.userId,req.body.canCommnet,req.body.videoUrl,req.body.thumbnailUrl,req.body.status,req.body.musicId,req.body.musicThumbNailUrl,req.body.hasTags,req.body.descrition,req.body.category,req.body.location,req.body.isLong], (err, data) => {
            if (err) {
                console.log(err)
                res.json({
                    success:false,
                    msg:"error",
                    error:err.sqlMessage
                })
            } else {
                res.json({
                    success: true,
                    msg: "Video uploaded",
                    data:data
                })
            }
        })
    },
    getAllVideo: (req,res) => {
        mysql.query(`SELECT * FROM video ORDER BY id DESC`, [], (err, data) => {
            if (err) {
                 res.json({
                    success:false,
                    error:err
                })
            }
            res.json({
                success:true,
                data:data
            })
        })
    },

    // // get user by id 

    getVideoByID: (req, res) => {
        mysql.query("select * from `video` where `id`=?", [req.params.id], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no user found",
                    data:data
                })
            }else{
            res.json({
                success:true,
                data:data
            })
        }
        })
    },
    getVideoByUserID: (req, res) => {
        mysql.query("select * from `video` where `userId`=?", [req.params.userId], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no Post found",
                    data:data
                })
            }else{
            res.json({
                success:true,
                data:data
            })
        }
        })
    },
    getVideoByShortOrLong: (req, res) => {
        mysql.query("select * from `video` where `isLong`=?", [req.params.isLong], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no Post found",
                    data:data
                })
            }else{
            res.json({
                success:true,
                data:data
            })
        }
        })
    },
    getVideoByMusicID: (req, res) => {
        mysql.query("select * from `video` where `musicId`=?", [req.params.musicId], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no Post found",
                    data:data
                })
            }else{
            res.json({
                success:true,
                data:data
            })
        }
        })
    },
    updateVideo: (req, res) => {
        if(req.body && req.files == null){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        if(req.files){
            console.log(req.files)
            if(req.files.videoUrl){
                req.body.videoUrl=req.files.videoUrl[0].path
            }
            if(req.files.thumbnailUrl){
                req.body.thumbnailUrl=req.files.thumbnailUrl[0].path
            }
            if(req.files.musicThumbNailUrl){
                req.body.musicThumbNailUrl=req.files.musicThumbNailUrl[0].             path
            }
        }
        mysql.query(`update video set ? where id = ?`, [
                req.body, req.params.id
            ],
            (err, data) => {
                if (err) {
                     res.json({
                        success:false,
                        error:err
                    })
                }
                res.json({
                    success:true,
                    data:data
                })
            }
        );
    },
    deleteVideo: (req, res) => {
        mysql.query(
            `delete from posts where id = ? `, [req.params.id],
            (err, data) => {
                if (err) {
                     res.json({
                        success:false,
                        error:err
                    })
                }
                res.json({
                    success:true,
                    data:data
                })
            }
        );
    },
})