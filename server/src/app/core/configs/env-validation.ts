import * as Joi from 'joi';
import { AppEnvironment } from 'src/app/shared/enums/AppEnvironment.enum';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(AppEnvironment))
    .default(AppEnvironment.DEV),
  PORT: Joi.number().default(3000),
  VITE_BASE_URL: Joi.string().default('http://127.0.0.1'),
});
