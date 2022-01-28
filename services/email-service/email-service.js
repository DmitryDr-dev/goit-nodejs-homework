import Mailgen from 'mailgen';

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    this.link = this.getLink(env);
  }

  getLink(env) {
    switch (env) {
      case 'development':
        return 'https://ba35-185-159-162-46.ngrok.io';
      case 'production':
        return 'https://hwcontacts-api.herokuapp.com';
      default:
        return 'http://localhost:5000/';
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Contact API',
        link: this.link,
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with our API, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: "Need help, or have questions? Contact us, we'd love to help.",
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyingEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const message = {
      to: email,
      subject: 'Please Verify Your Email',
      html: emailBody,
    };

    try {
      const result = await this.sender.send(message);
      console.log(result);
      return true;
    } catch (error) {
      console.error(`Error occurred on sending email ${error.message}`);
      return false;
    }
  }
}

export default EmailService;
