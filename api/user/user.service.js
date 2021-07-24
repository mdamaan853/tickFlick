const jwt = require('jsonwebtoken')
const mysql = require('../../database')
module.exports = ({
    createUser: (req, res) => {
        console.log(req.body)
        if(req.body.otpVerified == '1'){
        mysql.query(`INSERT INTO users (phoneNo,otpVerified) VALUES (?,?);`, [req.body.phoneNo,req.body.otpVerified], (err, data) => {
            if (err) {
                console.log(err)
                res.json({
                    success:false,
                    msg:"error",
                    error:err
                })
            } else {
                console.log(data.insertId)
                var token = jwt.sign({
                    id:data.insertId
                }, 'mySecretKey', {
                    expiresIn: '365d'
                })
                res.json({
                    success: true,
                    msg: "signup success",
                    insertedId:data.insertId,
                    token: token
                })
            }
        })   
    }else{
        res.json({
            success:false,
            msg:"otp verification is false"
        })
    }
    },
    loginUser: (req, res) => {
        if(req.body.otpVerified == '1'){
        mysql.query(`select * from users where phoneNo=?;`, [req.body.phoneNo], (err, data) => {
            if (err) {
                res.json({
                    success:false,
                    error:err
                });
            }else{
                var token = jwt.sign({
                }, 'mySecretKey', {
                    expiresIn: '365d'
                })
                res.json({
                    success:true,
                    msg:"successfully login",
                    token:token,
                    data:data
                })
            }
        })
    }else{
        res.json({
            success:false,
            msg:"otp verification is false"
        })
    }
    },
    getAllUser: (req,res) => {
        mysql.query(`SELECT * FROM users ;`, [], (err, data) => {
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

    getUserByID: (req, res) => {
        mysql.query("select * from `users` where `id`=?", [req.params.id], (err, data) => {
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

    updateUser: (req, res) => {
        mysql.query(`update users set ? where id = ?`, [
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
    deleteUser: (req, res) => {
        mysql.query(
            `delete from users where id = ? `, [req.params.id],
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