
type emailType = '[]@gmail.com' | '[]'

export class UserCreateDto {
    public username: string
    public email: string
    public password: string
}