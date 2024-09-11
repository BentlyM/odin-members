import { NextFunction, Request, Response } from 'express';
import db from '../db/queries';
import bcrypt from 'bcryptjs';


type Messages = {
  username?: string,
  title: string,
  message: string
}

export const home = async (request: Request, response: Response) => {
    const messages : Messages[] = (await db.messages()).rows;
    response.render('index', { user: request.user, messages: messages });
};

export const postHome = async (request:Request , response: Response) => {
  try{
    const title : string = request.body.title;
    const message: string = request.body.message;
    const user: string = (request.user as { username: string })!.username;
  
    if(title == '' || message == '' || user == '') throw new Error('One or More fields are missing...');
  
    await db.createMessage(user, title, message);

    response.redirect('/')
  }catch(e){
    response.status(404).send(`${e}`);
  }
}

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
