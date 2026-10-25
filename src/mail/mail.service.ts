import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto.js';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(config: ConfigService) {
    const port = Number(config.get('SMTP_PORT') ?? 587);
    const user = config.getOrThrow<string>('SMTP_USER');

    this.transporter = nodemailer.createTransport({
      host: config.getOrThrow<string>('SMTP_HOST'),
      port,
      secure: port === 465,
      auth: { user, pass: config.getOrThrow<string>('SMTP_PASS') },
    });

    const name = config.get<string>('MAIL_FROM_NAME');
    this.from = name ? `"${name}" <${user}>` : user;
  }

  async send(dto: SendEmailDto) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: dto.to,
        subject: dto.subject,
        text: dto.text,
        html: dto.html,
      });
      return { success: true, messageId: info.messageId };
    } catch (err) {
      this.logger.error(`Send failed: ${(err as Error).message}`);
      throw new BadGatewayException('Could not send email');
    }
  }
}