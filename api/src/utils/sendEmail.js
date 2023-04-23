import nodemailer from "nodemailer";

const sendEmail = async (email, mailSubject, content, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });
        // transporter.verify((error, success) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Ready for message");
        //         console.log(success);
        //     }
        // });
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: mailSubject,
            html: content,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.status(201).json({
                    message: "mail sent successfully",
                    info: info.response,
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default sendEmail;
