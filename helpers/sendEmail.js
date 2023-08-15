const nodemailer = require("nodemailer");
require("dotenv").config();

// const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
                user: "tata23goit@ukr.net",
                pass: "csQ7CDVf0I3ovDqi"
        }
}

const transport = nodemailer.createTransport(nodemailerConfig);

// const email ={
//         from: UKR_NET_EMAIL,
//         to: "vitexaj110@vreaa.com",
//         subject: "Verify email",
//         html: "<p>Verify email</p>"
// }

const sendEmail = async(data) => {
        const email = {...data, from: "tata23goit@ukr.net"};
        await transport.sendMail(email);
        return true;
         
}

module.exports = sendEmail;

