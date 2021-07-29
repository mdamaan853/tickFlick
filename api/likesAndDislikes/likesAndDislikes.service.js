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
        mysql.query(`INSERT INTO likeanddislike (userId,isPostLike,isCommentLike,isReplyLike,isLike,contentId) VALUES (?,?,?,?,?,?);`, [req.body.userId,req.body.isPostLike,req.body.isCommentLike,req.body.isReplyLike,req.body.isLike,req.body.contentId], (err, data) => {
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
        mysql.query(`SELECT * FROM likeanddislike ORDER BY id DESC`, [], (err, data) => {
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
        mysql.query("select * from `likeanddislike` where `id`=?", [req.params.id], (err, data) => {
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
        mysql.query("select * from `likeanddislike` where `userId`=?", [req.params.userId], (err, data) => {
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
        mysql.query(`select * from likeanddislike where contentId=?`, [req.params.contentId], (err, data) => {
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
        mysql.query(`update likeanddislike set ? where id = ?`, [
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
            `delete from likeanddislike where id = ? `, [req.params.id],
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