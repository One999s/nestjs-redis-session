import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isString } from 'class-validator';


interface Response<T> {
    data: T;
}
@Injectable()
export class TransformInterceptor<T>
implements NestInterceptor{
    public client: any;
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        return next.handle().pipe(
        map((data) => {
            if(isString(data)){
                return {
                    code: 201,
                    message:data,
                    data
                }
            }else{
                
                return {
                    code: 200,
                    message:JSON.parse(JSON.stringify(data)).msg||'请求成功',
                    data:JSON.parse(JSON.stringify(data)).data||data
                };
                // return {
                //     code: 200,
                //     message:'请求成功',
                //     data
                // };
            }
        }),
        );
    }
}