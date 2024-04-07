import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity({name:'Auths'})
export class Auth{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    refresh_token:string;
    @CreateDateColumn()
    create_at:Date;
    @CreateDateColumn()
    update_at:Date;
}