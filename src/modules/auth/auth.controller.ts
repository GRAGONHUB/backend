import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Get('request')
  async test(): Promise<any> {
    return { response: 'success' }
  }
}
