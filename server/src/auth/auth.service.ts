import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { DatabaseEntity } from 'src/database/models/database.entity';
import { DataSource, Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';

@Injectable()
export class AuthService {

    private readonly userModel: Repository<User>;

    constructor (dataSource: DataSource) { 
        this.userModel = dataSource.getRepository(User)
    } 
    


    async getAll()
    {
        return await this.userModel.find();
    }

    async getById(id: number)
    {
        return await this.userModel.findOne({where: {id}});
    }

    async getByIdWithDb(id: number)
    {
        const user = this.userModel.findOne({
            where: {id},
            relations: {chats: true}
        })
        return user;
    }

    async create(user2create: UserCreateDto)
    {
        const user = new User()
        user.username = user2create.username;
        user.email = user2create.email;
        user.password = user2create.password;

        return await this.userModel.create(user);
    }

    async update(id: number, user: User)
    {
        return await this.userModel.update(id, user);
    }

    async checkByUsernameOrEmail(username: string, email: string, password: string)
    {
        if (!username && !email) return Promise<false>;
        if (!username && email) return await this.userModel.existsBy({email, password});
        if (username && !email) return await this.userModel.existsBy({username, password});
        return await this.userModel.existsBy({username, email, password});
    }
}
