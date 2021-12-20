import { IsOptional } from 'class-validator'

export class SignInPasswordDto {
  @IsOptional()
  email: string

  @IsOptional()
  password: string
}
