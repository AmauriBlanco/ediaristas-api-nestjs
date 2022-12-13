import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.mailgun.org',
          secure: false,
          port: 587,
          auth: {
            user: 'postmaster@sandbox3f303b488d394981943aeec50c5a16ec.mailgun.org',
            pass: 'e4251985318770e4706f8578dba21ef7-48d7d97c-5213e62b',
          },
          ignoreTLS: true,
        },
        defaults: {
          from: ' "No Reply" <noreply@ediaristas.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
