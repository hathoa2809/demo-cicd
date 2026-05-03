require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail() {
    const status = process.argv[2];
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, 
        port: 587,
        secure: false,  
        auth: { 
            user: process.env.MAIL_USERNAME, 
            pass: process.env.MAIL_PASSWORD 
        }
    });

    const isSuccess = status === 'success';
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_RECEIVER,
        subject: `[CI/CD] ${isSuccess ? 'SUCCESSFUL' : 'FAILED'}`,
        html: `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: ${isSuccess ? '#28a745' : '#dc3545'}">CI/CD Pipeline Result</h2>
                <p><b>Status:</b> ${status.toUpperCase()}</p>
                <p><b>Environment:</b> Production</p>
            </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) { 
        process.exit(1); 
    }
}
sendEmail();
