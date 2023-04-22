import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import { SignInPasswordDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req: any) {
    return { success: true, user: req.user }
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInPasswordDto) {
    return this.authService.login(dto)
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.createUser(dto)
  }

  @Post('forget-password')
  async forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto)
  }
}
