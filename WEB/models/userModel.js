const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require('moment');

const UsersSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true , "Please enter your firstName!"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true , "Please enter your lastName!"],
        trim:true
    },
    email:{
        type:String,
        required:[true , "Please enter your email!"],
        trim:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:[true , "Please enter Mobile Number"],
    },
    address:{
        type:String,
        required:[true , "Please enter your Address"],
        trim:true
    },
    position:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:[true , "Please enter your password"],
    },
    imageUrl:{
        type:String,
        default:"https://res.cloudinary.com/pjk12755/image/upload/v1623394380/PikPng.com_profile-icon-png_805523_zbl9ji.png"
    }
},{
    timestamps:true
});
UsersSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}


UsersSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;