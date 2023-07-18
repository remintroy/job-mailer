import nodeMailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface mailerOptions {
  email: string;
  password: string;
  user: User;
}

/**
 * This is function create a ready to mail object with email and password from gmail
 * GMAIL is only supported - and need app password from google account to work
 */
export default class CreateMailer {
  private transport: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
  private accountEmail: string;
  private userData: User;

  constructor(options: mailerOptions) {
    this.accountEmail = options.email?.trim();
    this.transport = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: options.email,
        pass: options.password,
      },
    });
  }

  /**
   * This function allows to send email with custom template
   * @param toEmail Email to send mail
   * @param Options Subject and html template for email. Both are required
   */
  async sendEmailWithCustomTemplate(toEmail: string, { subject, html }: { subject: string; html: string }) {
    return await this.transport.sendMail({
      from: `"${this.userData?.name}" <${this.accountEmail}>`,
      to: toEmail,
      subject,
      html,
    });
  }

  
}
