const nodemailer = require('nodemailer');

const mailSender = async(email,title,body )=>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
            secure:false,
        })
        let info = await transporter.sendMail({
            from:`"BLOG WEB APP | Rajesh" <${process.env.MAIL_USER}>`, //sender address
            to:`${email}`, //list of receivers
            subject:`${title}`,//subject line
            html:`${body}`,//html body
        })
        console.log(info.response);
        return info;
    }catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
}
module.exports = mailSender;