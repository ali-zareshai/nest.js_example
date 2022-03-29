import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}

    async addUser(user:User){
        const createdUser = await this.prisma.user.create({
            data:{
                'name':user.name,
                'email':user.email,
                'pass':user.password
            },
        });
        return createdUser;
    }
}
