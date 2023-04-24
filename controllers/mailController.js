
const nodemailer = require('nodemailer');
const smtp = require("../config/smtp.js");
const { logger } = require("../helpers/logger.js");
const { getDetails, registerUser, emailDetails, getFromEmail } = require("../helpers/dbHelper.js")

module.exports.userData = async (req, res) => {
    let details = req.body;
    let obj = {};
    try {
        let isRegistered = await getDetails(details.from_email, details.from_name);
        if (isRegistered.length > 0) {
            obj.is_registered = true;
            obj.from_email = details.from_email;
            obj.from_name = details.from_name;
            res.json({
                status: 200,
                message: 'You are already registerd!',
                data: obj
            })
        } else {
            let register = await registerUser(details);
        }
        res.json({
            status: 200,
            message: 'your deatils have been saved successfully!',
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: error.message,
        })
    }
};

module.exports.sendEmail = async (req, res) => {
    let details = req.body
    try {
        if (details) {
            let email_details = await emailDetails(details);
            const transporter = nodemailer.createTransport(smtp.smtp);
            let fromDetails = await getFromEmail(details.host_id);
            const mailOptions = {
                from: details.from_email ? details.from_email: '',
                to: details.to ? details.to : '',
                cc: details.cc ? details.cc : '',
                subject: details.subject ? details.subject : '',
                html: details.body ? details.body : '',
            };
            // console.log(mailOptions);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    logger.error(error);
                    console.log('error sending mail:', error);
                } else {
                    console.log('email sent', info.response);
                }
            });
            res.json({
                status: 200,
                message: "mail delivered successfully",
            })
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: error.message,
        })
    }
}

