import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { authPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
        private JwtService:JwtService
      ) {}
    async register(authPayload:authPayloadDto): Promise <Auth>{
      return await this.authRepository.save(authPayload);
    }
    async login(authPayload:authPayloadDto): Promise <any>{
      const user= await this.authRepository.findOne({
        where:{email:authPayload.email}
      });
      if(!user){
        throw new HttpException('User not exited!',HttpStatus.UNAUTHORIZED)
      }
      const checkPassword = bcrypt.compareSync(authPayload.password,user.password);
      if(!checkPassword){
        throw new HttpException('Password is not correct',HttpStatus.BAD_REQUEST);
      }
      const payload = {id:user.id,email:user.email};
      return this.generationToken(payload)
    }
    private async generationToken(payload:{id:number,email:string}){
      const accessToken = await this.JwtService.signAsync(payload);
      const refresh_token = await this.JwtService.signAsync(payload,{
        secret:'1234151243123',
        expiresIn:'1d'
      })
      await this.authRepository.update({
        email:payload.email
      },{refresh_token})
      return {accessToken,refresh_token}
    }
}
