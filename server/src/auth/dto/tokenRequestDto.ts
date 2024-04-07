import { ApiProperty, ApiResponse } from "@nestjs/swagger";


export class TokenRequestDto
{
    @ApiProperty()
    public token: string;
}