import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserCreateDto } from './dto/userCreateDto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/models/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @ApiResponse({
        type: User,
        isArray: true
    })
    @Get()
    async getAll(@Res() response: Response)
    {
        response.json(await this.auth.getAll())
    }
    @ApiResponse({type: User})
    @Post()
    async create(@Body() user: UserCreateDto, @Res() response: Response)
    {
        const userCreated = await this.auth.create(user)
        response.json(userCreated);
    }
}
