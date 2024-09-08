import { NextFunction, Request, Response } from 'express';
import db from '../db/queries';
import bcrypt from 'bcryptjs';

export const home = (request: Request, response: Response) => {
  response.render('index', { user: request.user });
};

export const signup = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.method == 'GET') return response.render('sign-up-form');

  try {
    bcrypt.hash(request.body.password, 10, async (err, hashedPassword) => {
      if (err) throw new Error(`Something went wrong: ${err}`);

      await db.insertUser(request.body.username, hashedPassword);
    });

    response.redirect('/log-in');
  } catch (err) {
    return next(err);
  }
};

export const login = (request: Request, response: Response) => {
  if (request.method == 'GET') return response.render('log-in-form');
};

export const logout = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
};
