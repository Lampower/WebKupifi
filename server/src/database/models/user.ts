import { Table, Model, Column} from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string
    
}