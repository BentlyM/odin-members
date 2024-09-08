import express from 'express';
import path from 'path';
import router from './routes/routes';

const app = express();

const PORT = +(process.env.PORT || 8080);
const hostname = '127.0.0.9';


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, hostname, ()=>{
    console.log(`listening on client http://${hostname}:${PORT} `);
})