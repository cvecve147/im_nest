import { User, UserDoc, UserRole } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { query } from 'express';

export class Dto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
export class CreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  level: string;
  @ApiProperty()
  power: string;
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
  async create(@Body() dto: CreateDto) {
    var arr = [];

    // newUser.name = dto.name;
    // newUser.password = dto.password;
    // newUser.address = dto.address ? dto.address : '';
    // newUser.phoneNumber = dto.phoneNumber ? dto.phoneNumber : '';
    // newUser.level = dto.level ? dto.level : '';
    // newUser.power = dto.power ? dto.power : 'user';
    for (let i = 0; i < 10; i++) {
      var newUser = new User();
      newUser.name = 'user' + (i + 30);
      newUser.password = 'user' + (i + 30);
      newUser.power = 'user';
      arr.push(newUser);
    }

    const res = await this.userModel.create(arr);
    return res;
  }

  @Post('login')
  @ApiOperation({ summary: '登入' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: Dto, @CurrentUser() user: UserDoc) {
    console.log(user._id);

    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('user')
  @ApiOperation({ summary: '取得自己' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDoc) {
    return user;
  }

  @Get('users')
  @ApiOperation({ summary: '一般用戶' })
  @UseGuards(AuthGuard('jwt-R&A'))
  @ApiBearerAuth()
  async users(@CurrentUser() user: DocumentType<User[]>) {
    return await this.userModel.find({
      $or: [{ power: UserRole.ADMIN }, { power: UserRole.USER }],
    });
  }

  @Put('user/:id')
  @ApiOperation({ summary: '修改' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async update(@Body() body: Dto, @Param('id') id: string) {
    return;
  }
}
