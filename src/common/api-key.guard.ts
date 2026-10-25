import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const supplied = Buffer.from(req.header('x-api-key') ?? '');
    const expected = Buffer.from(this.config.get<string>('API_KEY') ?? '');

    if (
      expected.length === 0 ||
      supplied.length !== expected.length ||
      !timingSafeEqual(supplied, expected)
    ) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}