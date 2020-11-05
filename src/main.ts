import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import { HttpExceptionFilter } from './global/filters/http-exception.filter';
import {NestExpressApplication} from '@nestjs/platform-express';
import { TransformInterceptor } from './global/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { AuthGuard } from './global/guard/auth.guard';

function genuuid() {
  let now = new Date();
  let sjnum = ''
  for (let i = 0; i < 5; i++) {
    sjnum += Math.floor(Math.random() * 10)
  }
  let uuid = 'test' + now.getFullYear() + (now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) + now.getDate() + sjnum
  return uuid
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Nest单一登录") //标题
    .build()  
     // setup()依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
    const document = SwaggerModule.createDocument(app,options);
    SwaggerModule.setup('/swagger',app,document);
    app.set('trust proxy', true);//源
    app.enableCors();//跨域
    app.use(session({ genid: function (req) { return genuuid() }, secret: 'bitch', name: 'token'
    // , cookie: { maxAge:0}//设置过期时间
    }));//session
    app.useGlobalFilters(new HttpExceptionFilter());//全局请求错误拦截
    app.useGlobalInterceptors(new TransformInterceptor());//全局请求成功拦截
    app.useGlobalPipes(new ValidationPipe());//全局验证管道
    // app.useGlobalGuards(new AuthGuard());//全局守卫

  await app.listen(3000);

}
bootstrap();
