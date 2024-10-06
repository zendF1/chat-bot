import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { UserHistoryLogEntity } from 'src/modules/user/entities/user.historyLog.entity';

@Injectable()
export class UserHistoryLogRepository {
  constructor(
    @InjectModel(UserHistoryLogEntity.name)
    private readonly UserHistoryLogModel: Model<UserHistoryLogEntity>,
  ) {}

  async create(
    UserHistoryLogDto: Partial<UserHistoryLogEntity>,
    session?: ClientSession,
  ): Promise<UserHistoryLogEntity> {
    const newUserLog = new this.UserHistoryLogModel(UserHistoryLogDto);
    return newUserLog.save({ session });
  }

  async exportHisrotyLogById(id: string): Promise<UserHistoryLogEntity | null> {
    return this.UserHistoryLogModel.findById(id).lean().exec();
  }
}
