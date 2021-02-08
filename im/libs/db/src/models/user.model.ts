import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';

import { hashSync } from 'bcryptjs';

export type UserDoc = DocumentType<User>;

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

  @prop()
  phoneNumber: string;

  @prop()
  address: string;

  @prop()
  level: string;

  @prop()
  industry: string;

  @prop()
  position: string;

  @prop()
  management: boolean;

  @ApiProperty({ example: 'user1' })
  @prop({ required: true })
  power: string;
}
