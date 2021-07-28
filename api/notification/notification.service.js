const jwt = require('jsonwebtoken')
const mysql = require('../../database')
module.exports = ({
    createnotification: (req, res) => {
        mysql.query(`INSERT INTO notification (userId,content,isRead,notificationType,ifFollow,ifLikeOrComment,ifMessage,ifSystemNotify) VALUES (?,?,?,?,?,?,?,?);`, [req.body.userId,req.body.content,req.body.isRead,req.body.notificationType,req.body.ifFollow,req.body.ifLikeOrComment,req.body.ifMessage,req.body.ifSystemNotify], (err, data) => {
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
                    msg: "notification send",
                    data:data
                }) 
            }
        })
    },
    getAllnotification: (req,res) => {
        mysql.query(`SELECT * FROM notification ORDER BY id DESC`, [], (err, data) => {
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

    getnotificationByID: (req, res) => {
        mysql.query("select * from `notification` where `id`=?", [req.params.id], (err, data) => {
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
    getnotificationByUserId: (req, res) => {
        mysql.query("select * from `notification` where `userId`=?", [req.params.userId], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    msg:err.sqlMessage,
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
    getnotificationByType: (req, res) => {
        mysql.query("select * from `notification` where `notifactionType`=?", [req.params.type], (err, data) => {
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
    updatenotification: (req, res) => {
        if(!req.body){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        mysql.query(`update notification set ? where id = ?`, [
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
    deletenotification: (req, res) => {
        mysql.query(
            `delete from notification where id = ? `, [req.params.id],
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