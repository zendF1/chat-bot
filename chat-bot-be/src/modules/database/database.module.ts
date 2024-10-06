import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbConfig = config.getDatabaseConfig();
        return {
          uri: `${dbConfig.uri}/${dbConfig.name}`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
