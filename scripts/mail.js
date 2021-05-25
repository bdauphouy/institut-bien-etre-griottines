const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'no.reply.institut@gmail.com',
        pass: 'institut123'
    }
});

const sendEmail = (body) => {
    const {
        firstname,
        lastname,
        email,
        message
    } = body

    ejs.renderFile(path.join(__dirname, '../public/templates/template.ejs'), {
        firstname,
        lastname,
        email,
        message
    }, (err, html) => {
        if (err) console.log(err)
        else {
            const mailOptions = {
                from: 'no.reply.institut@gmail.com',
                to: "bdauphouy@gmail.com",
                subject: `Message de M ou Mme ${lastname} ${firstname}`,
                html
            };
            transporter.sendMail(mailOptions, err => {
                if (err) console.log(err)
                else console.log('Message sent ' + new Date())
            });
        }
    });
}

module.exports = sendEmail