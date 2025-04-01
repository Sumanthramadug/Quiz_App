var express = require('express');
const router = express.Router();
const userModel = require('../Models/userSchema');
const transporter = require('../Config/nodemailer');
const EMAIL_TEMPLATE = require('../Config/emailTemplate');
var jwt = require('jsonwebtoken');
var userAuth = require("../Middleware/userAuth")
router.post('/register',async(req,res)=>{
     const {name,email,password} = req.body;
     try{
        if(!name || !email || !password){
            return res.json({success:false,message:"Please fill all the details"});
        }
        const user = new userModel({
          name,email,password
        });
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000 
              });

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`Hello ${name} welcome to Quiz app`,
            text:`You have registered for Quiz app All the best`,
            html:EMAIL_TEMPLATE
        }

        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"User Registered Successfull"});
     }
     catch(error){
        res.json({success:false,message:error.message});
     }
});

router.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
     return res.json({success:false,message:"Please Fill all the details"});
  }
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User not found"});
    }
    if(password !== user.password){
      return res.json({success:false,message:"Incorrect password"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict', 
                        maxAge: 7 * 24 * 60 * 60 * 1000 
                      });
    return res.json({success:true,message:"User Loggedin Successful",token});
  }
  catch(error){
    return res.json({success:false,message:error.message});
  }
});
router.post('/sendVerifyEmailOtp',userAuth, async(req,res)=>{
  try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(user.isAuthenticated){
           return res.json({success:false,message:"User is Already Authenticated"});
        }
        const otp = String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000;

        await user.save();

        const mailOptions = {
          from:process.env.SENDER_EMAIL,
          to:user.email,
          subject:"Email Verification for Quiz APP",
          text:`Here is you otp:${otp} for verification of Quiz app`,
        }
        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"Otp Sent Successful for email verification"});
  }
  catch(error){
        return res.json({success:false,message:error.message})
  }
});

router.post('/checkVerifyEmailOtp',userAuth,async(req,res)=>{
  const {userId,otp} = req.body;
  try{
    const user = await userModel.findById(userId);
    if(!userId || !otp){
      return res.json({success:false,message:"Please Fill all the Details"});
    }
    if(otp !== user.verifyOtp){
       return res.json({success:false,message:"Invalid Otp"});
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success:false,message:"Otp Expired"});
    }
    user.isAuthenticated = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({success:true,message:"Email verification successful"});

  }
  catch(error){
    return res.json({success:false,message:error.message})
  }
});

router.post("/logout",(req,res)=>{
  try{
        res.clearCookie('token',{
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict', 
      });
      return res.json({success:true,message:"Logged Out"});
  }
  catch(error){
    return res.json({success:false,message:error.message});
  }
});

router.post("/forgotpassword", async(req,res)=>{
   const {email} = req.body;
   try{
      if(!email){
        return res.json({success:false,message:'Please fill all the Details'});
      }
      const user = await userModel.findOne({email});
      if(!user){
        return res.json({success:false,message:"Email is not registered"});
      }
      const otp = String(Math.floor(100000+Math.random()*900000));
      user.resetOtp = otp;
      user.resetOtpExpireAt = Date.now()*24*60*60*1000;

      await user.save();

      const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"OTP For Password Reset",
        text:`Your otp:${otp} for reset password`
      }
      await transporter.sendMail(mailOptions);

      return res.json({success:true,message:"Mail Sent Successful"});
   }
   catch(error){
    return res.json({success:false,message:error.message});
   }
});

router.post("/verifyForgotPassword",async(req,res)=>{
    const {email,otp} = req.body;
    try{
      if(!email || !otp){
        return res.json({success:false,message:"Please fill all the details"});
      }
      const user = await userModel.findOne({email});
      if(otp !== user.resetOtp){
         return res.json({success:false,message:"Invalid otp"});
      }
      if(user.resetOtpExpireAt < Date.now()){
        return res.json({success:false,message:"Otp Expired"});
      }
      return res.json({success:true,message:"Change Your Password"});
    }
    catch(error){
      res.json({success:false,message:error.message});
    }
});

router.post("/changePassword",async(req,res)=>{
  const {email,password,confirmPassword} = req.body;
  try{
    if(!email || !password || !confirmPassword){
      return res.json({success:false,message:"Please fill all the details"});
    }
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User doesnt exist"});
    }
    if(password === user.password){
      return res.json({success:false,message:"New Password does not same as old passowrd"});
    }
    if(password !== confirmPassword){
      return res.json({success:false,message:"Password doesn't match"});
    }
    user.password = password;
    user.confirmPassword = password;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success:true,message:"Password Changed Successful"});
  }
  catch(error){
    return res.json({success:false,message:error.message});
  }
});

router.get("/getDetails",userAuth,async(req,res)=>{
  const {userId} = req.body;
  try{
    const user = await userModel.findById(userId);
    if(!user){
      return res.json({success:false,message:"User doesnt exist"});
    }
    return res.json({success:true,message:{name:user.name,email:user.email,Authenticated:user.isAuthenticated}})
  }
  catch(error){
    return res.json({success:false,message:error.message});
  }
});
router.put("/updateProfile", userAuth, async (req, res) => {
  const { name, email,userId } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: userId },  // Finds the logged-in user
      { name, email },  // Updates name & email
      { new: true }  // Returns updated user
    );

    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

module.exports = router;