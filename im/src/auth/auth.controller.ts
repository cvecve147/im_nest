import { User, UserDoc } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

export class Dto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
@Controller('auth')
@ApiTags('用戶登入')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('users')
  @ApiOperation({ summary: '註冊' })
  async create(@Body() dto: Dto) {
    const { name, password } = dto;
    var power = 'user';
    var newUser = new User();
    newUser.name = name;
    newUser.password = password;
    newUser.power = 'user';
    const res = await this.userModel.create(newUser);
    return res;
  }

  @Post('login')
  @ApiOperation({ summary: '登入' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: Dto, @CurrentUser() user: UserDoc) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('user')
  @ApiOperation({ summary: '取得' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDoc) {
    return user;
  }
}
