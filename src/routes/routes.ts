import express, {NextFunction, Request, Response} from 'express';
import { home, login, signup } from '../controllers/memberControllers';


const router = express.Router();

router.get('/', home);

router.get('/sign-up' , signup);
router.post('/sign-up', signup);

router.get('/log-in', login);
router.post('/log-in', login);

export default router;