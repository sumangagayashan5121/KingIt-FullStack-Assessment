import { Request as ExpressRequest } from 'express';

export type Request = ExpressRequest & {
  start: number;
  user: null;
};
