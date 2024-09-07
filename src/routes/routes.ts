import express from 'express';
import { home, login, signup } from '../controllers/memberControllers';


const router = express.Router();

router.get('/', home);

router.get('/sign-up' , signup);

router.get('/log-in', login);

export default router;