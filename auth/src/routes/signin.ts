import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {User} from '../models/user';
import {validateRequest} from './../middlewares/validate-request';
import {BadRequestError} from './../errors/bad-request-error';
import {Password} from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      throw new BadRequestError('Invalid email');
    }

    const validPassword = Password.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestError('Invalid password');
    }

    // Generate JWT and store on session object
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export {router as signinRouter};
