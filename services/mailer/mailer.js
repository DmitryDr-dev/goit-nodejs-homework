import nodemailer from 'nodemailer';

class Mailer {
  async send(message) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...message,
      from: process.env.NODEMAILER_USER,
    });
  }
}

export default Mailer;
