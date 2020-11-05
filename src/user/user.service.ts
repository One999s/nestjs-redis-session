import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {rediss} from '../global/redis/cache.service'
function genuuid() {
    let now = new Date();
    let sjnum = ''
    for (let i = 0; i < 5; i++) {
      sjnum += Math.floor(Math.random() * 10)
    }
    let uuid = 'test' + now.getFullYear() + (now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) + now.getDate() + sjnum
    return uuid
}
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}
    async login(name,psw,req){
        let valid =await this.userRepository.query(`select * from user where userName='${name}' and passWord='${psw}'`)
        if(valid.length==0){
            throw new HttpException({message:'账号或密码错误'},201);
        }else{
            let uid = genuuid()
            req.session.userName = name
            req.session.uid = uid
            const redis = await rediss.initRedis('TokenGuard.canActivate',0)
            redis.set(name,uid)
            return {msg:'登录成功',data:{now:new Date().toLocaleString(),session:req.sessionID}}
        }
    }
    async getMsg(){
        return this.userRepository.query(`select * from user`)
    }
}









