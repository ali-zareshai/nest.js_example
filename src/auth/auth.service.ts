import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './dto';
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}

    async addUser(user:User){
        const hashPassword =await argon.hash(user.password);
        const createdUser = await this.prisma.user.create({
            data:{
                'name':user.name,
                'email':user.email,
                'pass':hashPassword
            },
        });
        return createdUser;
    }
}
