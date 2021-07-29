const mysql = require('../../database')
const {checkLike,updatelikesAndDislikes} =require('../likesAndDislikes/likesAndDislikes.service')
module.exports = ({
    checkLike: (req, res, next) => {
        if(!req.body.isPostLike){
            req.body.isPostLike=0
         }
        if(!req.body.isCommentLike){
            req.body.isCommentLike=0
        }
        if(!req.body.isReplyLike){
            req.body.isReplyLike=0
        }
        mysql.query(`SELECT * FROM likeanddislike where userId=? AND contentId=? AND isPostLike=? AND isReplyLike=? AND isCommentLike=?`, [req.body.userId,req.body.contentId,req.body.isPostLike,req.body.isReplyLike,req.body.isCommentLike], (err, data) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    err: err
                })
            }
            if (data.length > 0) {
                    
                    if(data[0].isLike == 1){
                        req.body.isLike=0
                    }
                     else{
                         req.body.isLike=1
                     }
                    console.log(req.params.id)
                    req.params.id=data[0].id
                    updatelikesAndDislikes(req,res)
                }
            if (data.length <= 0) {
                next();
            }
        })
    }
})