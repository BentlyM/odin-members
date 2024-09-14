import express from 'express';
import path from 'path';
import router from './routes/routes';
import session from 'express-session';
import passport from 'passport';

const app = express();

const PORT = +(process.env.PORT || 10000);
const hostname = '0.0.0.0';

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, hostname, () => {
  console.log(`listening on client http://${hostname}:${PORT} `);
});
