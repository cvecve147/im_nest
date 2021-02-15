import { User, UserDoc, UserRole } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';
import { query } from 'express';
import { readFile, utils } from 'xlsx';

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
  industry: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  management: boolean;
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

  @Post('upload')
  @ApiOperation({ summary: '匯入' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  async upload(@UploadedFile() file) {
    console.log('uploads');

    const res = readFile(file.path);
    const first_worksheet = res.Sheets[res.SheetNames[0]];
    const data = utils.sheet_to_json(first_worksheet, { header: 1 });
    const transData = [];
    const Users = await this.userModel.find({ power: 'user' });
    const UserList = [];
    Users.forEach((el) => {
      UserList.push(el.name);
    });
    for (let i = 0; i < data.length; i++) {
      var el = data[i];

      const user = new User();
      user.name = el[0] ? el[0] : '';
      user.password = String(el[1]) ? String(el[1]) : '';
      user.address = el[2] ? el[2] : '';
      user.phoneNumber = el[3] ? el[3] : '';
      user.level = el[4] ? el[4] : '';
      user.power = UserRole.USER;
      if (user.name != '學號' && UserList.indexOf(user.name) == -1) {
        transData.push(user);
      }
    }
    return await this.userModel.create(transData);
  }

  @Post('users')
  @ApiOperation({ summary: '註冊' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async create(@Body() dto: CreateDto) {
    const res2 = await this.userModel.findOne({ name: dto.name });
    if (res2) {
      return '重複資料';
    }
    var newUser = new User();
    newUser.name = dto.name;
    newUser.password = dto.password;
    newUser.phoneNumber = dto.phoneNumber ? dto.phoneNumber : '';
    newUser.address = dto.address ? dto.address : '';
    newUser.level = dto.level ? dto.level : '';
    newUser.industry = dto.industry ? dto.industry : '';
    newUser.position = dto.position ? dto.position : '';
    newUser.management = dto.management ? dto.management : false;
    newUser.power = dto.power ? dto.power : 'user';

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
      $or: [{ power: UserRole.USER }],
    });
  }

  @Get('manager')
  @ApiOperation({ summary: '管理員用戶' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async manager(@CurrentUser() user: DocumentType<User[]>) {
    return await this.userModel
      .find({
        $or: [{ power: UserRole.ADMIN }, { power: UserRole.ROOT }],
      })
      .select('name power');
  }

  @Get('/:id')
  @ApiOperation({ summary: '取得用戶' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async userData(@Param('id') id: string) {
    return await this.userModel.find({ _id: id });
  }

  @Put('user/:id')
  @ApiOperation({ summary: '修改' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async update(@Body() body: Dto, @Param('id') id: string) {
    return await this.userModel.findByIdAndUpdate(id, body);
  }

  @Put('/')
  @ApiOperation({ summary: '修改自己' })
  @UseGuards(AuthGuard('jwt-user'))
  @ApiBearerAuth()
  async updateSelf(@Body() body: CreateDto, @CurrentUser() user: UserDoc) {
    body.power = 'user';
    delete body.password;
    const res = await this.userModel.findByIdAndUpdate(user._id, body);
    return await this.userModel.find(res._id);
  }

  @Delete('user/:id')
  @ApiOperation({ summary: '刪除用戶' })
  @UseGuards(AuthGuard('jwt-root'))
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
