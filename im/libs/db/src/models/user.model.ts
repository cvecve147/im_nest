import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';

import { hashSync } from 'bcryptjs';

export type UserDoc = DocumentType<User>;

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  USER = 'user',
}
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ example: 'user1' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ example: 'user1' })
  @prop({
    required: true,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val && hashSync(val);
    },
  })
  password: string;

  @prop({ default: '' })
  phoneNumber: string;

  @prop({ default: '' })
  address: string;

  @prop({ default: '' })
  level: string;

  @prop({ default: '' })
  industry: string;

  @prop({ default: '' })
  position: string;

  @prop({ default: false })
  management: boolean;

  @ApiProperty({ example: 'user1' })
  @prop({ required: true })
  power: string;
}
