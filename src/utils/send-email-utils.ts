import nodemailer from "nodemailer";
import type { DataEmail } from "../model/auth-model";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export class SendEmailUtils {
  static async send(data: DataEmail) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    } as SMTPTransport.Options);

    transporter.sendMail(data, (err, info) => {
      if (err) {
        return err;
      } else {
        return info;
      }
    });
  }
}
