import { Body, Controller, Delete, Get, Param, Post, Put,Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/global/guard/auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags("用户")
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    @Get('login/:uName/:psw')
        @ApiParam({
            name: 'uName',
            description: '用户uName',
        })
        @ApiParam({
            name: 'psw',
            description: '用户psw',
        })
        @ApiOperation({summary:"登录"})
        login(@Param('uName') uName,@Param('psw') psw,@Request() req){
            return this.userService.login(uName,psw,req)
        }
    @Get('msg')
    @UseGuards(new AuthGuard())
        getMsg(){
            return this.userService.getMsg()
        }
    @Get('msg1')
        getmsg1(){
            return this.userService.getMsg()
        }
}
