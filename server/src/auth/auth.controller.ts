import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserCreateDto } from './dto/userCreateDto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/models/user.entity';
import { UserResponseDto } from './dto/userResponseDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @ApiResponse({
        type: UserResponseDto,
        isArray: true
    })
    @Get()
    async getAll(@Res() response: Response)
    {
        const users = await this.auth.getAll()
        response.json(users.map<UserResponseDto>)
    }
    @ApiResponse({type: User})
    @Post()
    async create(@Body() user: UserCreateDto, @Res() response: Response)
    {
        const userCreated = await this.auth.create(user)
        response.json(userCreated);
    }
}
