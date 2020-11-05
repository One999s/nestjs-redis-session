import { Injectable } from '@nestjs/common';
// import { RedisService } from 'nestjs-redis';
// @Injectable()
// export class CacheService {
//     public client;
//     constructor(private redisService: RedisService) {
//         this.getClient();
//     }
//     async getClient() {
//         this.client = await this.redisService.getClient()
//     }

//     //设置值的方法
//     async rSet(key:string, value:any, seconds?:number) {
//         value = JSON.stringify(value);
//         if(!this.client){
//             await this.getClient();
//         }
//         if (!seconds) {
//             await this.client.set(key, value);
//         } else {
//             await this.client.set(key, value, 'EX', seconds);
//         }
//     }

//     //获取值的方法
//     async rGet(key:string) {
//         if(!this.client){
//             await this.getClient();
//         }
//         var data = await this.client.get(key);           
//         if (!data) return;
//         return JSON.parse(data);       
//     }
// }
import * as Redis from 'ioredis'

let redisConfig={
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: ''
}
let n: number = 0;
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于
export class rediss {
    static async initRedis(method: string, db = 0) {
        const isExist = redisIndex.some(x => x === db);
        if (!isExist) {
            redisList[db] = new Redis({ ...redisConfig, db });
            redisIndex.push(db);
        } else {
            // console.debug(`[Redis ${db}]来自 ${method} 方法调用`);
        }
        return redisList[db];
    }
}