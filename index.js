const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://hydra-vr-virtual-reality.netlify.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send-email', async (req, res) => {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));