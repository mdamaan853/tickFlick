const mysql = require('../../database')
module.exports = ({
    createFavSong: (req, res) => {
        mysql.query(`INSERT INTO favsong (userId,songId) VALUES (?,?);`, [req.body.userId,req.body.songId], (err, data) => {
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
                    msg: "Added to favorite",
                    data:data
                })
            }
        })
    },
    getAllFavSong: (req,res) => {
        mysql.query(`SELECT * FROM favsong ORDER BY id DESC`, [], (err, data) => {
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

    getFavSongByID: (req, res) => {
        mysql.query("select * from `favsong` where `id`=?", [req.params.id], (err, data) => {
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
    getFavSongByUserID: (req, res) => {
        mysql.query("select * from `favsong` where `userId`=?", [req.params.userId], (err, data) => {
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
    getFavSongBysongId: (req, res) => {
        mysql.query("select * from `favsong` where `songId`=?", [req.params.songId], (err, data) => {
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
    updateFavSong: (req, res) => {
        if(!req.body){
return res.json({
    success:false,
    msg:"insert value to update"
})
        }
        mysql.query(`update favsong set ? where id = ?`, [
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
    deleteFavSong: (req, res) => {
        mysql.query(
            `delete from favsong where id = ? `, [req.params.id],
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