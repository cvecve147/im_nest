import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用戶')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}
}
