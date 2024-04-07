import { IsEmail, IsNotEmpty } from "class-validator";

export class authPayloadDto{

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}