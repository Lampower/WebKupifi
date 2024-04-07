import { ApiProperty } from "@nestjs/swagger";


export class UserUpdateUsernameDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public username: string;
}