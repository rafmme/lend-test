import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  public abstract create(req: Request, res: Response, next: NextFunction): void;
};


