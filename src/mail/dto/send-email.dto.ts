import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(254)
  to: string;

  @ApiProperty({ example: 'Welcome!' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @ApiProperty({ example: 'Thanks for signing up.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  text: string;

  @ApiPropertyOptional({ example: '<p>Thanks for signing up.</p>' })
  @IsOptional()
  @IsString()
  @MaxLength(50000)
  html?: string;
}