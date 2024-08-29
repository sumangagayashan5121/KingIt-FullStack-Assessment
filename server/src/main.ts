import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as requestIp from 'request-ip';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './app/core/interceptors/response.interceptor';
import { ErrorFilter } from './app/core/filters/error.filter';
import { AppEnvironment } from './app/shared/enums/AppEnvironment.enum';
import { IEnvConfig } from './app/shared/models/EnvConfig.model';
import { NODE_ENV } from './app/core/constants/env.constants';
// import {
//   gloabalRequestLimiter,
//   signUpRequestLimiter,
// } from './app/shared/utils/rate-limiter';
// import { globalSlowDown, signUpSlowDown } from './app/shared/utils/slowdown';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });

  const configService = new ConfigService<IEnvConfig>();
  const PORT = configService.get('PORT');
  const VITE_BASE_URL = configService.get('VITE_BASE_URL');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new ErrorFilter());

  app.use(requestIp.mw());

  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.use(helmet());

  await app.listen(PORT);

  Logger.log(`NODE_ENV = ${NODE_ENV}`);
  Logger.log(DateTime.local().toLocaleString(DateTime.DATETIME_FULL));
  Logger.log(
    NODE_ENV === AppEnvironment.DEV &&
      `Server is listening on ${VITE_BASE_URL}:${PORT}/v1`
  );
}
bootstrap().catch((e) => Logger.error(e));
