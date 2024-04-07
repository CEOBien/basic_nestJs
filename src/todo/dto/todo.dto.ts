import { IsNotEmpty, IsString } from "class-validator";

export class todoDTO{

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    desc:string;
}