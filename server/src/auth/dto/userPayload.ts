import { ApiProperty } from "@nestjs/swagger";

export class UserPayload
{
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
}