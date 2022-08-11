import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  public abstract create(req: Request, res: Response, next: NextFunction): void;
  public abstract read(req: Request, res: Response, next: NextFunction): void;
  public abstract update(req: Request, res: Response, next: NextFunction): void;
  public abstract delete(req: Request, res: Response, next: NextFunction): void;
};


