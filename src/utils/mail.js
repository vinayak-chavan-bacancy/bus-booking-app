const nodemailer = require('nodemailer');

const mailOptions = (tripData, userInfo, finalReqArr, busData) => {
  
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
    requireTLS: true,
  });

  const obj = {
    from: process.env.MAIL_USERNAME,
    to: userInfo.emailID,
    subject: "Bus Ticket Booking Confirmation",
    html: ` <p> hello </p><strong> ${userInfo.username}, </strong> </br>
            <p> your requested tickets ${finalReqArr} has been confirmed</p></br></br>
            <p> Travelling Details </p>
            <p> Bus Number : ${busData.busnumber} <br>
            <p> On Date <strong> ${tripData.travelDate} </strong> </br>
            <p> <strong> ${tripData.startingPoint} - ${tripData.destinationPoint} </strong> </p> </br>
            <p> <strong> ${tripData.departureTime} - ${tripData.reachTime} </strong> </p> </br>`,
  };

  transporter.sendMail(obj, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent");
    }
  });
};

module.exports = { mailOptions };