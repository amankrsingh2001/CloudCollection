const nodemailer = require('nodemailer')

export const mailSender = async(email:string,title:string,body:any) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },

        })
        let info = await transporter.sendMail({
            from:'Class Notion - by Aman',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info
    } catch (error) {
       throw new Error('Fail to send mail')
    }
}
