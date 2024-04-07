import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import  { join } from 'path';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('HOST'),
      port: +configService.get('PORT'),
      username: configService.get('USERNAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [join(process.cwd(),'dist/**/*.entity.js')],
      synchronize: false,
      dropSchema: false,
    }),
    inject: [ConfigService],
}),

    AuthModule,TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
