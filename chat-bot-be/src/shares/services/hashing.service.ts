import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'config/config.service';
import { createHmac } from 'crypto';

@Injectable()
export class HashingService {
  constructor(private readonly config: ConfigService) {}
  // Hashes the provided password using bcrypt
  async hashPassword(password: string): Promise<string> {
    // The second parameter, 10, is the number of salt rounds
    // It determines the computational cost and influences the time taken to hash the password
    // Higher values increase security but also increase the time taken
    return bcrypt.hash(password, 10);
  }

  // Compares a plain password with a hashed password to check if they match
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!password || !hashedPassword) return false;
    // Compares the plain password with the hashed password using bcrypt's compare function
    // Returns a boolean indicating whether they match
    return bcrypt.compare(password, hashedPassword);
  }

  validateCallbackHmac(
    body?: Record<string, any>,
    callbackMac?: string,
  ): boolean {
    if (!body || !callbackMac) return false;
    const mac = createHmac('sha256', this.config.get('JWT_SECRET'))
      .update(JSON.stringify(body))
      .digest('base64');
    return callbackMac === mac;
  }

  createCallbackHmac(body: Record<string, any>): string {
    return createHmac('sha256', this.config.get('JWT_SECRET'))
      .update(JSON.stringify(body))
      .digest('base64');
  }
}
