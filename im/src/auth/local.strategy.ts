import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(name: string, password: string) {
    const user = await this.userModel.findOne({ name }).select('+password');
    if (!user) {
      throw new BadRequestException('不存在1');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('不存在2');
    }
    delete user.password;

    return user;
  }
}
