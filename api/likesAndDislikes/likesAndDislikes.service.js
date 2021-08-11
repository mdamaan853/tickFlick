const jwt = require('jsonwebtoken')
const mysql = require('../../database')
module.exports = ({
    createlikesAndDislike: (req, res) => {
        if(!req.body.isPostLike){
            req.body.isPostLike=0
         }
        if(!req.body.isCommentLike){
            req.body.isCommentLike=0
        }
        if(!req.body.isLike){
            req.body.isLike=1
        }
        if(!req.body.isReplyLike){
            req.body.isReplyLike=0
        }
        // mysql.query(`Select * from likeanddislike where userId = ? and `)
        mysql.query(`INSERT INTO likes (userId,isPostLike,isCommentLike,isReplyLike,isLike,contentId) VALUES (?,?,?,?,?,?);`, [req.body.userId,req.body.isPostLike,req.body.isCommentLike,req.body.isReplyLike,req.body.isLike,req.body.contentId], (err, data) => {
            if (err) {
                console.log(err)
                res.json({
                    success:false,
                    msg:"error",
                    error:err
                })
            } else {
                res.json({
                    success: true,
                    msg: "Liked",
                    data:data
                })
            }
        })
    },
    getAllLikesAndDislike: (req,res) => {
        mysql.query(`SELECT * FROM likes ORDER BY id DESC`, [], (err, data) => {
            if (err) {
                 res.json({
                    success:false,
                    error:err
                })
            }
            console.log(data)
            res.json({
                success:true,
                data:data
            })
        })
    },

    // // get user by id 

    getlikesAndDislikeByID: (req, res) => {
        mysql.query("select * from `likes` where `id`=?", [req.params.id], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no data found",
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
    getlikesAndDislikeByUserID: (req, res) => {
            // select if(l.isLike,1,0),u.profilepic,p.* from posts p left join follow f on p.userId = f.followedUID left join likes l on f.userId = l.userId and l.contentId = p.id and l.isPostLike = 1 left join users u on u.id = p.userId where f.userId = ?
        mysql.query(`SELECT users.username,users.profilepic,likes.* FROM users LEFT JOIN Likes ON users.id = likes.userId WHERE likes.userId=?`, [req.params.userId], (err, data) => {
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
    getlikesDlikeBycontentId: (req, res) => {
        mysql.query(`select * from likes where contentId=?`, [req.params.contentId], (err, data) => {
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
    updatelikesAndDislikes: (req, res) => {
        if(!req.body){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        mysql.query(`update likes set ? where id = ?`, [
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
                    msg:"updated",
                    data:data
                })
            }
        );
    },
    deleteLikesAndDislikes: (req, res) => {
        mysql.query(
            `delete from likes where id = ? `, [req.params.id],
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
    checkLike: (req, res) => {
        mysql.query(
            `delete from likeanddislike where userId=? AND contentId=? `, [req.body.userId,req.body.contentId],
            (err, data) => {
                if (err) {
                     res.json({
                        success:false,
                        error:err
                    })
                }
                res.json({
                    success:true,
                    msg:"like delete",
                    data:data
                })
            }
        );
    },
})