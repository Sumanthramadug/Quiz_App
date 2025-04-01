var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,default:''},
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    isAuthenticated:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number,default:0},
});

module.exports = mongoose.models.userDetails || mongoose.model('userDetails',userSchema,'userDetails');