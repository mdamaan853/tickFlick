const mysql = require('../../database')
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
            if (data.length > 0) {
                return res.json({
                    success:false,
                    msg: "Mobile number already registred"
                })
            }
            if(data.length <= 0){
                next();
            }
        })
    }
})