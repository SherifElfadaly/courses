import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(
    email: string,
    template: string,
    subject: string,
    data: unknown,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: `./${template}`,
      context: data,
    });
  }
}
