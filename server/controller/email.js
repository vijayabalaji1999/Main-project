const nodemailer = require("nodemailer");
// const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, to) {
    console.log(user, to);
    this.to = to;
    this.from = `WIGO STORE <vjba1999@gmail.com>`;
    this.html = user;
  }
  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject, html) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: html,
      // text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendOrder() {
    await this.send("Thanks for Ordering in Wigo", this.html);
  }

  async sendWelcome() {
    await this.send("Welcome to the Wigo Family!", this.html);
  }

  // async sendPasswordReset() {
  //   await this.send(

  //     "Your password reset token (valid for only 10 minutes)"
  //   );
  // }
};
