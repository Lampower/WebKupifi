import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.entity";
import { DatabaseEntity } from "./database.entity";



@Table
export class UserDatabase extends Model
{
    @ForeignKey(() => User)
    @Column
    userId: number
    
    @ForeignKey(() => DatabaseEntity)
    @Column
    databaseId: number
    
}