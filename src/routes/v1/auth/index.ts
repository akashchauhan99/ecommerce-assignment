import express from 'express';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from '../../../controllers/auth';
import { deserializeUser } from '../../../middleware/deserializeUser';
import { requireUser } from '../../../middleware/requireUser';
import { validate } from '../../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../../../schema/user';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerHandler);
router.post('/login', validate(loginUserSchema), loginHandler);

router.use(deserializeUser, requireUser);
router.patch('/logout', logoutHandler);

export default router;
