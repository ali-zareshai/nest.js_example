import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDate, User } from './dto';

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
}
