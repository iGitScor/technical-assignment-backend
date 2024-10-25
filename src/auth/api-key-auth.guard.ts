import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    // Not in config file but in dynamic storage (Postgre)
    if (apiKey !== this.configService.get<string>('API_KEY')) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
