import { NextFunction, Request, Response } from "express";
import { knexInstance } from "../config";
import { BadRequestException, NotFoundException } from "../exceptions";
import { Account } from "../models";
import { fundAccountSchema } from "../utils/validation/data.schema";
import { validate } from "../utils/validator";

class AccountController {
  public async fund(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        email,
        amount,
        securityPassKey,
      } = req.body;

      await validate(fundAccountSchema, req.body);
      const fundAmount = Number.parseFloat(amount);
  
      const accountExist = await knexInstance.raw(
        `SELECT * FROM accounts WHERE accountOwner = '${email}' AND securityPassKey = '${securityPassKey}'`
      );

      if (accountExist[0].length === 0) {
        throw new NotFoundException(
          `Sorry, there is no account with ID '${email}' on the app.`
        );
      };

      const account = await Account
        .where('accountOwner', email).update({
          accountBalance: accountExist[0][0].accountBalance + fundAmount,
      });
  
      res.status(200).json({
        statusCode: 200,
        message: `Your account with ID '${email}' has been funded with ${amount}`,
        account: {
          accountId: email,
          securityPassKey,
          previousBalance: accountExist[0][0].accountBalance,
          newBalance: accountExist[0][0].accountBalance + fundAmount,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public async withdraw(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        email,
        amount,
        securityPassKey,
      } = req.body;

      await validate(fundAccountSchema, req.body);
      const fundAmount = Number.parseFloat(amount);
  
      const accountExist = await knexInstance.raw(
        `SELECT * FROM accounts WHERE accountOwner = '${email}' AND securityPassKey = '${securityPassKey}'`
      );

      if (accountExist[0].length === 0) {
        throw new NotFoundException(
          `Sorry, there is no account with ID '${email}' on the app.`
        );
      };

      if (fundAmount > accountExist[0][0].accountBalance) {
        throw new BadRequestException(
          `Sorry! You have insufficient amount on account with ID '${email}'.
          \nCurrent balance is ${accountExist[0][0].accountBalance}`
        );
      };

      const account = await Account.update({
        accountBalance: accountExist[0][0].accountBalance - fundAmount,
      });
  
      res.status(200).json({
        statusCode: 200,
        message: `Withdrawal successful! Your account with ID '${email}' has been debited with ${amount}`,
        account: {
          accountId: email,
          securityPassKey,
          previousBalance: accountExist[0][0].accountBalance,
          newBalance: accountExist[0][0].accountBalance - fundAmount,
        },
      });
    } catch (error) {
      next(error);
    }
  }; 
};


export const accountController = new AccountController();





