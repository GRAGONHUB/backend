import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'email',
  })
  email: string

  @IsNotEmpty()
  password: string
}
