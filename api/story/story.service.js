const jwt = require('jsonwebtoken')
const mysql = require('../../database')
module.exports = ({
    createStory: (req, res) => {
        if(req.file){
            req.body.docUrl=req.file.path
        }
        mysql.query(`INSERT INTO stories (userId,docUrl,isImage) VALUES (?,?,?);`, [req.body.userId,req.body.docUrl,req.body.isImage], (err, data) => {
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
                    msg: "Story uploaded",
                    data:data
                })
            }
        })
    },
    getAllStory: (req,res) => {
        mysql.query(`SELECT * FROM stories ORDER BY id DESC`, [], (err, data) => {
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
    getStoryBYFollower: (req,res) => {
        mysql.query(`select p.* from stories p left join follow f on p.userId = f.followedUID where f.userId = ?`, [req.params.userId], (err, data) => {
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

    getStoryByID: (req, res) => {
        mysql.query("select * from `stories` where `id`=?", [req.params.id], (err, data) => {
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
    getStoryByUserID: (req, res) => {
        mysql.query("select * from `stories` where `userId`=?", [req.params.userId], (err, data) => {
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
    updateStory: (req, res) => {
        if(!req.body){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        if(req.file){
            req.body.postImage=req.file.path
        }
        mysql.query(`update stories set ? where id = ?`, [
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
    deleteStory: (req, res) => {
        mysql.query(
            `delete from stories where id = ? `, [req.params.id],
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