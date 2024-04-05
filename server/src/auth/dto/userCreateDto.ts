import { ApiProperty } from "@nestjs/swagger"

type emailType = '[]@gmail.com' | '[]'

export class UserCreateDto {
    @ApiProperty()
    public username: string
    @ApiProperty()
    public email: string
    @ApiProperty()
    public password: string
}