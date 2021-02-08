import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const models = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.secret,
        };
      },
    }),
    TypegooseModule.forRoot('mongodb://localhost/im', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models, JwtModule],
})
export class DbModule {}
