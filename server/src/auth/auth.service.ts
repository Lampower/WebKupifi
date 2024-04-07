import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './dto/userPayload';

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
        const user = new User();
        user.username = user2create.username;
        user.email = user2create.email;
        user.password = user2create.password;

        const createdUser = await this.userModel.save(user);
        const userPayload = new UserPayload();
        userPayload.id = createdUser.id;
        userPayload.email = createdUser.email;
        userPayload.username = createdUser.username;

        return {
            access_token: await this.jwtService.signAsync(userPayload),
          };
    }
    async getToken(userPayload: UserPayload)
    {
        return {
            access_token: await this.jwtService.signAsync(userPayload),
          };
    }

    async update(id: number, user: User)
    {
        return await this.userModel.update(id, user);
    }

    async verifyToken(token: string): Promise<UserPayload>
    {
        const payload = await this.jwtService.verifyAsync<UserPayload>(token).catch(() => {return null});
        return payload;
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
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({where: {email: email}});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { id: user.id, username: user.username, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    async changeName(id: number, newUsername: string)
    {
        return await this.userModel.update({id}, {username: newUsername});
    }
}
