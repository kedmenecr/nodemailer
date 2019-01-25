const express = require('express')
const bodyParser = require('body-parser')
const expHandleBars = require('express-handlebars')
const path = require('path')
const nodemailer = require('nodemailer')


const app = express();

app.engine('handlebars', expHandleBars())
app.set('view engine', 'handlebars')

app.use('/public', express.static(path.join(__dirname, 'public')))



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('contact')

})

app.post('/send', (req, res) => {
  console.log(req.body)
  const output = `
  <p>You have a new message</p>
  <h3> Contact details: </h3>
  <ul>
    <li>${req.body.name}</li>
    <li>${req.body.company}</li>
    <li>${req.body.email}</li>
    <li>${req.body.phone}</li>
  </ul>
  <h3>Message:</h3>
  <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.YOURDOMAIN.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'YOUREMAIL', // generated ethereal user
      pass: 'YOURPASSWORD'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <your@email.com>', // sender address
    to: 'RECEIVEREMAILS', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', { msg: 'Email has been sent' });
  });
})

app.listen(8000, () => {
  console.log('listening on 8k')
})