import { NextFunction, Request, Response } from "express";
import { knexInstance } from "../config";
import { BadRequestException } from "../exceptions";
import { Account } from "../models";
import { User } from "../models/users.model";
import { registerSchema } from "../utils/validation/data.schema";
import { validate } from "../utils/validator";
import { BaseController } from "./base.controller";

class UserController extends BaseController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const {
        email: accountEmail,
        fullName,
        securityPassKey,
      } = req.body;

      const email = accountEmail?.toLowerCase();
      await validate(registerSchema, req.body);
  
      const userExist = await knexInstance.raw(
        `SELECT * FROM users WHERE email = '${email}' AND securityPassKey = '${securityPassKey}'`
      );

      if (userExist[0].length >= 1) {
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
  
      res.status(201).json({
        statusCode: 201,
        message: `New Account created for user '${fullName} (${email})'\nPlease keep your 'securityPassKey' safe.`,
        user: {
          email,
          fullName,
          securityPassKey,
        },
        account: {
          accountId: email,
          securityPassKey,
          accountBalance: 0.0,
        },
      });
    } catch (error) {
      next(error);
    }
  };
};


export const userController = new UserController();





