const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    try{
        const token = req.header('Authorization');
        const verifiedUser = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        //newly added
        const verifiedAdmin = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = verifiedUser.user;
        req.Admin = verifiedAdmin.Admin;

        next();
    }catch (e) {
        console.log(e.message)
        return res.status(500).json({msg: "Server Error..."})
    }
}