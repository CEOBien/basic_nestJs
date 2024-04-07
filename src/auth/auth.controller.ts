import { Body, Controller, Post, Res, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { authPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register')
    async register(@Body() authPayload:authPayloadDto):Promise<Auth>{
        const hashPassword = await this.hashPassword(authPayload.password);
        return this.authService.register({...authPayload,password:hashPassword});
        
    }
    private async hashPassword(password:string):Promise<string>{
        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = bcrypt.hash(password,salt);
        return hash;

    }
    @Post('login')
    @UseInterceptors(TransformInterceptor)
    @UsePipes(ValidationPipe)
    async login(@Body() authPayloadDto:authPayloadDto):Promise<any>{
        return this.authService.login(authPayloadDto);
    }
}
