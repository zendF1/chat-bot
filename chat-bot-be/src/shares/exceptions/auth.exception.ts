import { UnauthorizedException } from '@nestjs/common';

export class Unauthorized extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 401,
      message: ['Unauthorized'],
      error: 'Unauthorized',
    });
  }
}
