import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import * as bcrypt from 'bcrypt'

export enum PROVIDER {
  LOCAL = 'local',
  FACEBOOK = 'facebook',
  LINE = 'line',
  GMAIL = 'gmail',
  APPLE = 'apple',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  provider: string

  @BeforeInsert() async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10)
  }
  @BeforeInsert()
  emailtoLowerCase() {
    if (this.email) this.email = this.email.toLowerCase()
  }
  @BeforeUpdate() async hashUpdatePassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10)
  }
}
