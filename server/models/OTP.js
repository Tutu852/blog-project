const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/emailVerificationTemplate')
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 60 * 5 ,
    }
})

async function sendVerificationEmail(email, otp) {
   try{
    const mailResponse = await mailSender(
        email,
        "Verrification Email",
        emailTemplate(otp)
    );
   }catch(error){
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
   }
}

//Define a post-save hook to send the email after the document has been saved
//before save in database so i use pre middleware


OTPSchema.pre('save', async function(next) {
    console.log("New document saved to database");
    //job new doument create ho tab hi send karo
    if (this.isNew) {
        try {
            await sendVerificationEmail(this.email, this.otp);
            console.log("Verification email sent successfully");
        } catch (error) {
            console.error("Error sending verification email:", error);
            return next(error); // Pass the error to the next middleware
        }
    }
    next(); 
});

const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP;