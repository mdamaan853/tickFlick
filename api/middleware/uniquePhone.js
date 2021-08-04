const mysql = require('../../database')
const {loginUser} =require('../user/user.service')
module.exports = ({
    checkMobile: (req, res, next) => {
        console.log(req.body.phoneNo)
        mysql.query("SELECT *  FROM `users` where `phoneNo`=? ", [req.body.phoneNo], (err, data) => {
            console.log(data)
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    err: err
                })
            }
            if(data){

                if (data.length > 0) {
                    loginUser(req,res)
                    // next();
                }
                if (data.length <= 0) {
                next();
            }
            }
        })
    }
})