import express from 'express';
import {
  getMeHandler, editUserHandler
} from '../../../controllers/user';
import { deserializeUser } from '../../../middleware/deserializeUser';
import { requireUser } from '../../../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/profile', getMeHandler);
router.put('/edit', editUserHandler);

export default router;
