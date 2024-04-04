import { Table, Model, Column, BelongsToMany} from "sequelize-typescript";
import { UserDatabase } from "./userDatabase.entity";
import { DatabaseEntity } from "./database.entity";

@Table
export class User extends Model {
    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string

    @BelongsToMany(() => DatabaseEntity, () => UserDatabase)
    public users: User[]
    
}