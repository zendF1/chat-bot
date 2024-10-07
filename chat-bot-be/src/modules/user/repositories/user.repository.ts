import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly UserModel: Model<UserEntity>,
  ) {}

  async createrUser(
    userDto: Partial<UserEntity>,
    session?: ClientSession,
  ): Promise<UserEntity> {
    const newUser = new this.UserModel(userDto);
    return newUser.save({ session });
  }

  async updateUser(
    id: string,
    userDto: Partial<UserEntity>,
    session?: ClientSession,
  ): Promise<UserEntity | null> {
    return this.UserModel.findOneAndUpdate({ id }, userDto, {
      new: true,
      session,
    }).exec();
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.UserModel.find().lean().exec();
  }

  async getUser(id: string): Promise<UserEntity | null> {
    return this.UserModel.findOne({ id }).exec();
  }

  async getUserByUserEmail(email: string): Promise<UserEntity | null> {
    return this.UserModel.findOne({ email }).lean().exec();
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return this.UserModel.findOne({ username }).lean().exec();
  }
}
