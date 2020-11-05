import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { RedisModule} from 'nestjs-redis';

let options={
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0
}
// 导入实体类
const ENTITIES = [
  User
]
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:"mysql",
        host:"192.168.7.253",
        port:3306,
        username:"xy",
        password:"xy",
        database:"door",
        entities:[__dirname+'/**/*.entity{.ts,.js}'],
        synchronize:true
      }
    ),
    TypeOrmModule.forFeature([...ENTITIES]),
    // RedisModule.register(options)


  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
