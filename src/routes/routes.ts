import express, { NextFunction, Request, Response } from 'express';
import { deleteHome, home, login, logout, postHome, signup } from '../controllers/memberControllers';
import passport from 'passport';
import '../strategies/local-strategy';

const router = express.Router();

router.get('/', home);
router.post('/', postHome);
router.delete('/:id', deleteHome);

router.get('/sign-up', signup);
router.post('/sign-up', signup);

router.get('/log-in', login);
router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  }),
  login
);

router.post('/log-out', logout);

export default router;
