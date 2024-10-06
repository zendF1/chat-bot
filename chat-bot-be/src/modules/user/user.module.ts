import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/modules/user/controllers/user.controller';
import {
  UserEntity,
  UserEntitySchema,
} from 'src/modules/user/entities/user.entity';
import {
  UserHistoryLogEntity,
  UserHistoryLogEntitySchema,
} from 'src/modules/user/entities/user.historyLog.entity';
import { UserHistoryLogRepository } from 'src/modules/user/repositories/user.hisroryLog.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserService } from 'src/modules/user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserEntitySchema,
      },
      {
        name: UserHistoryLogEntity.name,
        schema: UserHistoryLogEntitySchema,
      },
    ]),
  ],
  providers: [UserRepository, UserHistoryLogRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
