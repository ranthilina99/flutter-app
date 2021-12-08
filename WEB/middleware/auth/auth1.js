const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        const auth_token = req.header("Authorization")
        if(!auth_token) return res.status(400).json({msg: "Invalid Token."})

        jwt.verify(auth_token, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Token."})
            req.user = user
            next()
        })
    } catch (err) {
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}

module.exports = auth