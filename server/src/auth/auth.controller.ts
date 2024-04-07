import { BadRequestException, Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserCreateDto } from './dto/userCreateDto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/models/user.entity';
import { UserResponseDto } from './dto/userResponseDto';
import { UserPayload } from './dto/userPayload';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TokenRequestDto } from './dto/tokenRequestDto';
import { UserUpdateUsernameDto } from './dto/userUpdateUsernameDto';

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
        response.json(users.map<UserResponseDto>((u) => {
            const userDto = new UserResponseDto()
            userDto.id = u.id,
            userDto.username = u.username,
            userDto.email = u.email
            return userDto;
        }))
    }
    @ApiResponse({type: User})
    @Post("registration")
    async registation(@Body() user: UserCreateDto, @Res() response: Response)
    {
        if (user.username == null || user.password == null || user.email == null) 
        {
            throw new BadRequestException("Not all fields included");
        }

        // const exist = this.auth.exists(user.username, user.email);
        // if (exist) throw new BadRequestException("User already exists");

        const token = await this.auth.create(user);
        response.json(token);
    }

    @ApiResponse({type: UserPayload})
    @Post("login")
    async login(@Body() user: UserCreateDto, @Res() response: Response)
    {
        const {username, email, password} = user;
        const tokenDto = await this.auth.signIn(username, email, password);
        response.json(tokenDto);
    }

    @ApiResponse({type: UserPayload})
    @Post("check")
    async checkToken(@Body() tokenDto: TokenRequestDto, @Res() response: Response)
    {
        const user = await this.auth.verifyToken(tokenDto.token);
        if (user == null) throw new UnauthorizedException("Invalid token");
        response.json(user)
    }

}
