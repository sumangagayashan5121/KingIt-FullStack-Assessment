import { AppEnvironment } from '../enums/AppEnvironment.enum';

export interface IEnvConfig {
  PORT: string | number;
  NODE_ENV: AppEnvironment;
  VITE_BASE_URL: string;
}
