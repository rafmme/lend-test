import { NextFunction, Request, Response } from "express";
import { knexInstance } from "../config";
import { BadRequestException, ConflictException, NotFoundException } from "../exceptions";
import { Account } from "../models";
import { fundAccountSchema, transferFundSchema } from "../utils/validation/data.schema";
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

      const account = await Account.where('accountOwner', email).update({
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

  public async transfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        sender,
        receipient,
        amount,
        securityPassKey,
      } = req.body;

      await validate(transferFundSchema, req.body);
      const fundAmount = Number.parseFloat(amount);
  
      const senderAccountExist = await knexInstance.raw(
        `SELECT * FROM accounts WHERE accountOwner = '${sender}' AND securityPassKey = '${securityPassKey}'`
      );

      const receipientAccountExist = await knexInstance.raw(
        `SELECT * FROM accounts WHERE accountOwner = '${receipient}'`
      );

      if (senderAccountExist[0].length === 0) {
        throw new NotFoundException(
          `Sorry, there is no account with ID '${sender}' on the app.`
        );
      };

      if (receipientAccountExist[0].length === 0) {
        throw new NotFoundException(
          `Sorry, there is no account with ID '${receipient}' on the app.`
        );
      };

      if (sender === receipient) {
        throw new ConflictException(
          `Sorry, You can't transfer funds to the same account!!!`
        );
      };

      if (fundAmount > senderAccountExist[0][0].accountBalance) {
        throw new BadRequestException(
          `Sorry! You have insufficient amount on account with ID '${sender}'.
          \nCurrent balance is ${senderAccountExist[0][0].accountBalance}`
        );
      };

      const senderAccount = await knexInstance.raw(
        `UPDATE accounts SET accountBalance = '${senderAccountExist[0][0].accountBalance - fundAmount}' WHERE accounts.accountOwner = '${sender}'`
      );

      const receipientAccount = await knexInstance.raw(
        `UPDATE accounts SET accountBalance = '${receipientAccountExist[0][0].accountBalance + fundAmount}' WHERE accounts.accountOwner = '${receipient}'`
      );
  
      res.status(200).json({
        statusCode: 200,
        message: `Transfer was successful! Your account with ID '${sender}' has been debited with ${amount}\n
        and account ${receipient} was credited.
        `,
        account: {
          accountId: sender,
          securityPassKey,
          previousBalance: senderAccountExist[0][0].accountBalance,
          newBalance: senderAccountExist[0][0].accountBalance - fundAmount,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accounts = await knexInstance.raw(
        `SELECT id, accountName, accountOwner, accountBalance FROM accounts`
      );
      res.status(200).json({
        statusCode: 200,
        message: `List of all accounts on the app.`,
        accounts: accounts[0],
      });
    } catch (error) {
      next(error);
    }
  };
};


export const accountController = new AccountController();





