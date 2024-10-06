import { PickType } from '@nestjs/swagger';
import { UserHistoryLogEntity } from 'src/modules/user/entities/user.historyLog.entity';

export class CreateUserHistoryLogDto extends PickType(UserHistoryLogEntity, [
  'userId',
  'action',
  'timestamp',
]) {
  ipAddress?: string;
  userAgent?: string;
  changes?: any;
}
