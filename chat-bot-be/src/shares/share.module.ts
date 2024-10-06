import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';

import * as dotenv from 'dotenv';
import { HashingService } from 'src/shares/services/hashing.service';
import { TransactionService } from 'src/shares/services/transaction.service';

dotenv.config();

@Global() // Mark the module as global, making it available across the entire application
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'), // Use the JWT secret from the ConfigService
      }),
      inject: [ConfigService], // Inject the ConfigService dependency
    }),

    CacheModule.register(), // Register the CacheModule for caching
  ],
  controllers: [], // No controllers in this module
  providers: [TransactionService, HashingService], // Provide Services for use in other modules
  exports: [TransactionService, CacheModule, JwtModule, HashingService], // Export services and modules for usage in other modules
})
export class SharedModule {} // Define the SharedModule class
