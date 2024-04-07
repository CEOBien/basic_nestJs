import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),
  JwtModule.register({
    global:true,
    secret:'1234151243123',
    signOptions:{expiresIn:'1h'}
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
