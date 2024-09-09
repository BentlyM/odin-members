import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db/queries';

type User = {
  username: string;
  password: string;
};

passport.serializeUser((user, done) => {

  console.log(`inside serialize user`)
  console.log(user); // user being found

  done(null, (user as { id: number }).id);
});

passport.deserializeUser(async (id: number, done) => {
  console.log(`inside deserialize user`)
  console.log(`Deserializing user id: ${id}`);
  try {
    const { rows } = await db.selectId(id);
    const user: User = rows[0];
    if (!user) throw new Error('User Not Found');

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.selectUser(username);

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
