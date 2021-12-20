import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import configuration from './config/configuration'
import connectionOptions from './config/typeorm'

import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.MODE === 'production',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    // GraphQLModule.forRoot({
    //   debug: false,
    //   playground: true,
    //   typePaths: ['./**/*.graphql'],
    //   context: ({ req }) => ({ req }),
    // }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
