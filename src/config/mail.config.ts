import { registerAs } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export default registerAs('mail', () => ({
  transport: {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || '',
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASSWORD || '',
    },
    secure: false,
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: 'dist/mail/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}));
