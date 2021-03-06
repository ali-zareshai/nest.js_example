import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDate, User } from './dto';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private jwt:JwtService,private config:ConfigService){}

    async addUser(user:User){
        const hashPassword =await argon.hash(user.password);
        const createdUser = await this.prisma.user.create({
            data:{
                'name':user.name,
                'email':user.email,
                'pass':hashPassword
            },
        });
        delete createdUser.pass;
        return createdUser;
    }

    async loginUser(loginData:LoginDate){
        const user =await this.prisma.user.findUnique({
            where:{
                email:loginData.email
            }
        });
        if(!user){
            throw new ForbiddenException("user or pass is wrong");
        }

        const status =await argon.verify(user.pass,loginData.password);
        if(!status){
            throw new ForbiddenException("user or pass is wrong");
        }

        delete user.pass;
        const token =await this.getToken(user.id,user.name,user.email);
        return {
            ...user,
            token:token
        };
    }

    async getToken(id:Number ,name:string,email:string){
        const payload={
            sub:id,
            name:name,
            email:email
        };

        return await this.jwt.signAsync(payload,{
            expiresIn:"60m",
            secret:this.config.get("JWT_SECRET")
        });
    }
}
