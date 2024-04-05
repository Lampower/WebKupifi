import { Inject, Injectable } from '@nestjs/common';
import { UserRepName } from 'src/constants';
import { UserCreateDto } from './dto/userCreateDto';
import { User } from 'src/database/models/user.entity';

@Injectable()
export class AuthService {
    // constructor (@Inject(UserRepName) private readonly user: typeof User)
    // {}


    // async getAll()
    // {
    //     return await this.user.findAll();
    // }

    // async create(user2create: UserCreateDto)
    // {
    //     return await this.user.create({user2create});
        
    // }
}
