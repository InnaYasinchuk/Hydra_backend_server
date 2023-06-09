const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
// const port = process.env.PORT || 80;

const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
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
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"${firstName} ${lastName}" <${email}>`,
    to: process.env.EMAIL_ADDRESS,
    subject: subject,
    html: `<b>Name:</b> ${firstName} ${lastName}<br/><b>Email:</b> ${email}<br/><b>Phone:</b> ${phone}<br/><b>Message:</b> ${about}`,
  });

  res.json({ message: 'Email sent' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports.handler = app;