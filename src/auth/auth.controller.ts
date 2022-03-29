import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
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

    @UseGuards(JwtGuard)
    @Get("me")
    getMe(@Req() req:Request){
        return req.user;
    }
}
