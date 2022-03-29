import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { LoginDate, User } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("login")
    loginUser(@Body() loginData:LoginDate){
        return this.authService.loginUser(loginData);
    }

    @Post('user')
    addUser(@Body() reqUser:User){
        return this.authService.addUser(reqUser);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Get("me")
    getMe(@GetUser() user:user){
        return user;
    }
}
