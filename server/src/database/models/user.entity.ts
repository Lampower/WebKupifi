import { DatabaseEntity } from "./database.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string

    @ManyToMany(() => DatabaseEntity)
    @JoinTable()
    public chats: DatabaseEntity[]
    
}