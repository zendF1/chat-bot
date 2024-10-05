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
        console.log('🚀 ~ useFactory: ~ dbConfig:', dbConfig);
        return {
          uri: `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`,
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
