import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User, UserRole } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class JwtRootStrategy extends PassportStrategy(Strategy, 'jwt-root') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret,
    } as StrategyOptions);
  }

  async validate(id) {
    const res = await this.userModel.findById(id);
    if (!res) {
      throw new BadRequestException('不存在');
    }
    if (res.power != UserRole.ROOT) {
      throw new BadRequestException('權限不足');
    }
    return res;
  }
}
