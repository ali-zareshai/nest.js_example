import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDate } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("login")
    loginUser(@Body() loginData:LoginDate){
        return loginData;
    }
}
