const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: '*'
}));

app.post('/send-email', async (req, res) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  

  const { firstName, lastName, email, phone, subject, about } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'innatestit@gmail.com',
      pass: 'keaxplpytauyealv',
    },
  });

  let info = await transporter.sendMail({
    from: `"${firstName} ${lastName}" <${email}>`,
    to: 'innatestit@gmail.com',
    subject: subject,
    html: `<b>Name:</b> ${firstName} ${lastName}<br/><b>Email:</b> ${email}<br/><b>Phone:</b> ${phone}<br/><b>Message:</b> ${about}`,
  });

  res.json({ message: 'Email sent' });
});

module.exports.handler = app;