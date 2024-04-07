import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity({name:'todos'})
export class Todo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    desc:string;
    @CreateDateColumn()
    create_at:Date;
    @CreateDateColumn()
    update_at:Date;
}