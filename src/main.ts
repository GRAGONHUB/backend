// eslint-disable-next-line
require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type { NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.use(helmet())
  if (process.env.MODE !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Api module')
      .setDescription('The module APIs documents')
      .setVersion('1.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('doc', app, document)
  }
  await app.listen(app.get(ConfigService).get<number>('port'))
}
void bootstrap()
