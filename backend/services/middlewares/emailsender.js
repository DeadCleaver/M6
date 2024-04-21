import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export const emailsender = async (mailBody, sendTo) => {
    
    const transporter = nodemailer.createTransport({
        host: `smtp.gmail.com`,
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
    });

    try {
    const mail = await transporter.sendMail({
        from: "Web Testing <deadcleaver@gmail.com>",
        to: sendTo,
        subject: "test",
        html: mailBody
    })
    console.log(mail.messageId);
    } catch(err) {
        console.log(err);
    }
};