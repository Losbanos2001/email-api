import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/api-key.guard.js';
import { SendEmailDto } from './dto/send-email.dto.js';
import { MailService } from './mail.service.js';

@ApiTags('emails')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('emails')
export class MailController {
  constructor(private readonly mail: MailService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({ status: 200, description: 'Email accepted by SMTP server' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  @ApiResponse({ status: 502, description: 'SMTP delivery failed' })
  send(@Body() dto: SendEmailDto) {
    return this.mail.send(dto);
  }
}
