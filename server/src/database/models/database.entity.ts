import { User } from "./user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DatabaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public dns: string

    @Column()
    public name: string

    @ManyToMany(() => User)
    public users: User[]
}