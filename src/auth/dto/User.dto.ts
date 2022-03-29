import { IsEmail, IsNotEmpty } from "class-validator";

export class User{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    name:string;
}