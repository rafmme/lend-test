import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions";
import { Account } from "../models";
import { IUser, User } from "../models/users.model";
import { registerSchema } from "../utils/validation/auth";
import { validate } from "../utils/validator";
import { BaseController } from "./base.controller";

class UserController extends BaseController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const {
        email,
        fullName,
        securityPassKey,
      } = req.body;

      await validate(registerSchema, req.body);
  
      const userExist = await User.where('email', email);
  
      if (userExist.length >= 1) {
        throw new BadRequestException(
          `User with email address '${email}' already exist on the app.`
        );
      };
  
      const user = await User.insert({
        email,
        securityPassKey,
        fullName,
      });

      const account = await Account.insert({
        accountOwner: email,
        accountBalance: 0.0,
        accountName: fullName,
        securityPassKey,
      });

      if (user.length < 1) {
        throw new BadRequestException('Unable to create a new user account');
      }
  
      res.status(201).json({
        statusCode: 201,
        message: `New Account created for user '${fullName} (${email})'\nPlease keep your 'securityPassKey' safe.`,
        user: {
          email,
          fullName,
          securityPassKey,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public read(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  };

  public update(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public delete(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  
};


export const userController = new UserController();

