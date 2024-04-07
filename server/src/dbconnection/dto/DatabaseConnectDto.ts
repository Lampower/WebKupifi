import { ApiProperty } from "@nestjs/swagger";


export class DatabaseConnectDto {
    @ApiProperty()
    public ip: string

    @ApiProperty()
    public dns: string

    
}