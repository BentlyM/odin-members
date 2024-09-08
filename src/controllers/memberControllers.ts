import { NextFunction, Request , Response } from "express";
import db from '../db/queries'
import bcrypt from 'bcryptjs'
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import pool from "../db/pool";

export const home = (request : Request , response: Response) => {
    response.render('index', {user: request.user});
}

export const signup = (request: Request , response: Response, next: NextFunction) => {
    if(request.method == 'GET') return response.render('sign-up-form'); 
    try {
        bcrypt.hash(request.body.password, 10, async (err, hashedPassword) => {
          if (err) throw new Error(`Something went wrong: ${err}`);
    
          db.insertUser(request.body.username, hashedPassword);
        });

        response.redirect('/log-in');
      } catch (err) {
        return next(err);
      }
}

export const login = (request: Request , response: Response) => {
    if(request.method == 'GET') return response.render('log-in-form');

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
    })
}

export const logout = (request: Request, response: Response, next: NextFunction) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
}

type User = {
  username: string;
  password: string;
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );

      const user: User = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as { id: number }).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user: User = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});