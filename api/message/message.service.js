const jwt = require('jsonwebtoken')
const mysql = require('../../database')
module.exports = ({
    createMessage: (req, res) => {
        if(req.file){
            req.body.imageUrl=req.file.path
        }
        if(!req.file){
            req.body.imageUrl='no image'
        }
        mysql.query(`INSERT INTO message (contentType,textContent,imageUrl,toUserId,fromUserId) VALUES (?,?,?,?,?);`, [req.body.contentType,req.body.textContent,req.body.imageUrl,req.body.toUserId,req.body.fromUserId], (err, data) => {
            if (err) {
                console.log(err)
                res.json({
                    success:false,
                    msg:err.sqlMessage,
                    error:err
                })
            } else {
                res.json({
                    success: true,
                    msg: "message send",
                    data:data
                }) 
            }
        })
    },
    getAllMessage: (req,res) => {
        mysql.query(`SELECT * FROM message ORDER BY id DESC`, [], (err, data) => {
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

    getMessageByID: (req, res) => {
        mysql.query("select * from `message` where `id`=?", [req.params.id], (err, data) => {
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
    getMessageByToUserID: (req, res) => {
        mysql.query("select * from `message` where `toUserId`=?", [req.params.to], (err, data) => {
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
    getMessageByfromUserIdID: (req, res) => {
        mysql.query("select * from `message` where `fromUserId`=?", [req.params.from], (err, data) => {
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
    updatemessage: (req, res) => {
        if(!req.body){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        mysql.query(`update message set ? where id = ?`, [
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
    deleteMessage: (req, res) => {
        mysql.query(
            `delete from message where id = ? `, [req.params.id],
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