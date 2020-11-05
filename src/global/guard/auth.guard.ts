// 验证用户登录
import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
// export class cacheClass{
//     constructor(private cache:CacheService){}
//     get(){
//         console.log(this.cache);
//     }
// }
import { RedisService } from 'nestjs-redis';
import {rediss} from '../redis/cache.service';

@Injectable()
export class AuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const redis = await rediss.initRedis('TokenGuard.canActivate', 0)
        //获取请求对象
        const request = context.switchToHttp().getRequest();
        // 获取请求头token
        const token = request.session.userName
        // cacheClass
        if(this.hasUrl(this.whiteList,request.url)){
            return true
        }
        if(token){
            if(request.session.uid!=await redis.get(token)){
                throw new HttpException({message:'异处登录，重新登录获取信息'},201);
                
            }
            // let vd = this.cache.get(token)
            
            try {
                return true;
            } catch (error) {
                throw new HttpException({message:'请登录后操作'},201);
            }
        }else{
            throw new HttpException({message:'请先登录'},201);
        }
    }
    
    //白名单
    private whiteList:string[]=[
        '/user/login/'
    ];
    //验证是否白名单
    private hasUrl(whiteList: string[],url:string): boolean{
        let flag:boolean = false;
        if(whiteList.indexOf(url)!=-1||url.indexOf(whiteList.toString())!=-1){
            flag = true;
        }
        return flag
    }
}