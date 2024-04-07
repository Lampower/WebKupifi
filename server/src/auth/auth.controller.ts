import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserCreateDto } from './dto/userCreateDto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/models/user.entity';
import { UserResponseDto } from './dto/userResponseDto';
import { UserPayload } from './dto/userPayload';
import { HttpModule, HttpService } from '@nestjs/axios';

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
        if (user.username == null || user.password == null || user.email == null) 
        {
            throw new BadRequestException("Not all fields included");
        }

        const exist = this.auth.exists(user.username, user.email);
        if (exist) throw new BadRequestException("User already exists");

        const userCreated = await this.auth.create(user)
        response.json(userCreated);
    }

    @ApiResponse({type: UserPayload})
    @Post("check")
    async checkToken(@Body() token: string, @Res() response: Response)
    {
        HttpService
        HttpModule
        // logic
        const user = new UserPayload();
        response.json(user)
    }
}
