const mysql = require('../../database')
module.exports = ({
    createFollow: (req, res) => {
        mysql.query(`INSERT INTO follow (userId,followedUID) VALUES (?,?);`, [req.body.userId,req.body.followedUID], (err, data) => {
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
                    msg: "follow",
                    data:data
                })
            }
        })
    },
    getAllFollow: (req,res) => {
        mysql.query(`SELECT * FROM follow ORDER BY id DESC`, [], (err, data) => {
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

    getFollowgByID: (req, res) => {
        mysql.query("select * from `follow` where `id`=?", [req.params.id], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                })
            }
            if(data.length == 0){
                res.json({
                    success:true,
                    msg:"no Song found",
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
    getFollowByUserID: (req, res) => {
        mysql.query("select * from `follow` where `userId`=?", [req.params.userId], (err, data) => {
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
    getFollowByfollowedUID: (req, res) => {
        mysql.query("select * from `follow` where `followedUID`=?", [req.params.songId], (err, data) => {
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
    updateFollow: (req, res) => {
        if(!req.body){
return res.json({
    success:false,
    msg:"insert value to update"
})
        }
        mysql.query(`update follow set ? where id = ?`, [
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
    deleteFollow: (req, res) => {
        mysql.query(
            `delete from follow where id = ? `, [req.params.id],
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