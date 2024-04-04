import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.entity";
import { UserDatabase } from "./userDatabase.entity";

@Table
export class DatabaseEntity extends Model {

    @Column
    public dns: string

    @Column
    public name: string

    @BelongsToMany(() => User, () => UserDatabase)
    public users: User[]
}