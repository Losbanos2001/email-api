import { Module } from '@nestjs/common';
import { ApiKeyGuard } from '../common/api-key.guard.js';
import { MailController } from './mail.controller.js';
import { MailService } from './mail.service.js';

@Module({
  controllers: [MailController],
  providers: [MailService, ApiKeyGuard],
})
export class MailModule {}