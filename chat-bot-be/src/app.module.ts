import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'config/config.service';
import { AuthGuard } from 'src/guards/auth.gaurd';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { SharedModule } from 'src/shares/share.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [
    Logger,
    ConfigService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
