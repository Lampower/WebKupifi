import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly userModel: Repository<User>;

    constructor (
        private dataSource: DataSource,
        private jwtService: JwtService
    ) { 
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

        const createdUser = await this.userModel.create(user);
        
    }

    async update(id: number, user: User)
    {
        return await this.userModel.update(id, user);
    }

    async checkToken(token: string)
    {

    }

    async checkByUsernameOrEmail(username: string, email: string, password: string)
    {
        if (!username && !email) return Promise<false>;
        if (!username && email) return await this.userModel.existsBy({email, password});
        if (username && !email) return await this.userModel.existsBy({username, password});
        return await this.userModel.existsBy({username, email, password});
    }

    async exists(username: string, email: string)
    {
        return (await this.userModel.existsBy({username}) || await this.userModel.existsBy({email}));
    }

    async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({where: {username}});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { id: user.id, username: user.username, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
