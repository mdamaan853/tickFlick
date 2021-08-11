const mysql = require('../../database')
module.exports = ({
    createMusic: (req, res) => {
        if(req.files){
            console.log(req.files)
            if(req.files.audioFileUrl){
                req.body.audioFileUrl=req.files.audioFileUrl[0].destination+"/"+req.files.audioFileUrl[0].filename
            }
            if(req.files.thumbnailUrl){
                req.body.thumbnailUrl=req.files.thumbnailUrl[0].destination+"/"+req.files.thumbnailUrl[0].filename
            }
        }
        mysql.query(`INSERT INTO song (createdBy,name,audioLength,audioFileUrl,thumbnailUrl,isFeatured,category) VALUES (?,?,?,?,?,?,?);`, [req.body.createdBy,req.body.name,req.body.audioLength,req.body.audioFileUrl,req.body.thumbnailUrl,req.body.isFeatured,req.body.category], (err, data) => {
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
                    msg: "Song uploaded",
                    data:data
                })
            }
        })
    },
    getAllMusic: (req,res) => {
        mysql.query(`SELECT * FROM song ORDER BY id DESC`, [], (err, data) => {
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

    getMusicByID: (req, res) => {
        mysql.query("select * from `song` where `id`=?", [req.params.id], (err, data) => {
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
    // getMusicByUserID: (req, res) => {
    //     mysql.query("select * from `song` where `userId`=?", [req.params.userId], (err, data) => {
    //         if (err) {
    //             res.json({
    //                 success:false,
    //                 error:err
    //             })
    //         }
    //         if(data.length == 0){
    //             res.json({
    //                 success:true,
    //                 msg:"no Post found",
    //                 data:data
    //             })
    //         }else{
    //         res.json({
    //             success:true,
    //             data:data
    //         })
    //     }
    //     })
    // },
    // getVideoByMusicID: (req, res) => {
    //     mysql.query("select * from `video` where `musicId`=?", [req.params.musicId], (err, data) => {
    //         if (err) {
    //             res.json({
    //                 success:false,
    //                 error:err
    //             })
    //         }
    //         if(data.length == 0){
    //             res.json({
    //                 success:true,
    //                 msg:"no Post found",
    //                 data:data
    //             })
    //         }else{
    //         res.json({
    //             success:true,
    //             data:data
    //         })
    //     }
    //     })
    // },
    updateMusic: (req, res) => {
        if(req.body && req.files == null){
            return res.json({
                success:false,
                msg:"insert value to update"
            })
        }
        if(req.files){
            console.log(req.files)
            if(req.files.audioFileUrl){
                req.body.audioFileUrl=req.files.audioFileUrl[0].destination+"/"+req.files.audioFileUrl[0].filename
                if(req.files.thumbnailUrl){
            }
                req.body.thumbnailUrl=req.files.thumbnailUrl[0].destination+"/"+req.files.thumbnailUrl[0].filename
            }
        }
        mysql.query(`update song set ? where id = ?`, [
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
    deleteMusic: (req, res) => {
        mysql.query(
            `delete from song where id = ? `, [req.params.id],
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