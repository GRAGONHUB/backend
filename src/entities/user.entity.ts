import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum Provider {
  LOCAL = 'local',
  FACEBOOK = 'facebook',
  LINE = 'line',
  GMAIL = 'gmail',
  APPLE = 'apple',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ unique: true })
  username: string

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  provider: Provider

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
