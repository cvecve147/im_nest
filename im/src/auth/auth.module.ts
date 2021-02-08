import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtAdminStrategy } from './jwt-admin.strategy';
import { JwtRootStrategy } from './jwt-root.strategy';
import { JwtUserStrategy } from './jwt-user.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtRootAndAdminStrategy } from './jwt-R&A.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
    JwtUserStrategy,
    JwtRootStrategy,
    JwtRootAndAdminStrategy,
  ],
})
export class AuthModule {}
