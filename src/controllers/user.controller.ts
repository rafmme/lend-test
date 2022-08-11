import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IUser } from "../models/users.model";
import { BaseController } from "./base.controller";

export default class UserController extends BaseController {
  public create(req: Request, res: Response): void {
    const {
      email,
      fullName,
      securityPassKey
    }: IUser = req.body;

    const userExist = 'await User.exists ( { email } )';

    if (userExist) {
      throw new BadRequestException(`User with email address '${email}' already exist on the app.`)
    }

    const user = 'insert user to db';

    return res.status(201).json({ message: 'userCreated', user });
  };

  public read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  };

  public update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }

  public delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }
  
};
