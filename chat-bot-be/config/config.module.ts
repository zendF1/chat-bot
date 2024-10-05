import { Module } from '@nestjs/common';
import { ConfigService } from './config.service'; // Adjust the path based on your structure

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Export it so it can be used in other modules
})
export class ConfigModule {}
