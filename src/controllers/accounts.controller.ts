import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../exceptions";
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
  
      const accountExist = await Account
        .where('accountOwner', email)
        .andWhere('securityPassKey', securityPassKey).first();
  
      if (!accountExist) {
        throw new NotFoundException(
          `Sorry, there is no account with ID '${email}' on the app.`
        );
      };

      const account = await Account.update({
        accountBalance: accountExist.accountBalance + amount,
      });
  
      res.status(200).json({
        statusCode: 200,
        message: `Your account with ID '${email}' has been funded with ${amount}`,
        account: {
          accountId: email,
          securityPassKey,
          previousBalance: accountExist.accountBalance,
          newBalance: accountExist.accountBalance + amount,
        },
      });
    } catch (error) {
      next(error);
    }
  };  
};


export const accountController = new AccountController();





