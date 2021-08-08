const jwt = require('jsonwebtoken')
const mysql = require('../../database')
const {getUserByID}=require('../user/user.service') 
module.exports = ({
    createPost: (req, res) => {
        if(req.file){
            req.body.postImage=req.file.path
            console.log(req.file)
        }
        mysql.query(`INSERT INTO posts (userId,postContent,postImage,hasImage,categoryType,location) VALUES (?,?,?,?,?,?);`, [req.body.userId,req.body.postContent,req.body.postImage,req.body.hasImage,req.body.categoryType,req.body.location], (err, data) => {
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
                    msg: "Post uploaded",
                    data:data
                })
            }
        })
    },
    getAllPost: (req,res) => {
        mysql.query(`SELECT * FROM posts ORDER BY id DESC`, [], (err, data) => {
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

    getPostByID: (req, res) => {
        mysql.query("select * from `posts` where `id`=?", [req.params.id], (err, data) => {
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
    getPostByUserID: (req, res) => {
        mysql.query("select if(l.isLike,1,0),u.profilepic,p.* from posts p left join follow f on p.userId = f.followedUID left join likes l on f.userId = l.userId and l.contentId = p.id and l.isPostLike = 1 left join users u on u.id = p.userId where f.userId = ?", [req.params.id], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(!data){
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
    updatePost: (req, res) => {
        if(req.body && req.file == null){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        if(req.file){
            req.body.postImage=req.file.path
        }
        mysql.query(`update posts set ? where id = ?`, [
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
    deletePost: (req, res) => {
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