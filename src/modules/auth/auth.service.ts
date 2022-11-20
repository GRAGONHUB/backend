import type { SignInPasswordDto } from './dto/sign-in.dto'
import type { SignUpDto } from './dto/sign-up.dto'

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from 'src/entities'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: SignUpDto) {
    const { email, username } = dto
    const userEntity = await this.usersRepository.findOne({ where: [{ email }, { username }] })
    if (userEntity) throw new ConflictException('duplicate username or email')
    const user = this.usersRepository.create(dto)
    return this.usersRepository.save(user)
  }

  async login(dto: SignInPasswordDto) {
    const { email, password } = dto
    const userEntity = await this.usersRepository.findOne({ email: email.toLocaleLowerCase() })
    if (!userEntity) throw new NotFoundException('username or password invalid')
    const isPasswordValidate = await bcrypt.compare(password, userEntity.password)
    if (!isPasswordValidate) throw new NotFoundException('username or password invalid')

    const jwtToken = await this.signJwtToken(userEntity)

    return { success: true, token: jwtToken }
  }

  private async signJwtToken(user: User) {
    const { id, username, email } = user
    return this.jwtService.sign({ id, username, email })
  }
}
