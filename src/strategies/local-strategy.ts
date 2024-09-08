import passport from "passport";
import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db/queries';

type User = {
    username: string;
    password: string;
};

export default passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await db.selectUser(username)
  
        const user: User = rows[0];

        console.log(user);
  
        if (!user) {
            console.log('not a user')
          return done(null, false, { message: 'Incorrect username' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          console.log('password does not match buddy');
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );