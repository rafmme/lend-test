import {
  ErrorRequestHandler, NextFunction,
  Request, Response
} from "express";
import { CustomException } from "../exceptions";

export const errorHandler: ErrorRequestHandler = (
    err: TypeError | CustomException,
    req: Request, res: Response,
    next: NextFunction
  ) => {
  if (err instanceof CustomException) {
    return res.status(err.statusCode)
      .json({
        errors: err.serializeErrors(),
      });
  };
  
  res.status(500).json({
    errors: [{message: 'Server Error', trace: JSON.stringify(err.stack)}] 
  });
};