import express from 'express';
import {
    createProductHandler, deleteProductHandler, getAllProductHandler, updateProductHandler
} from '../../../controllers/product';
import { deserializeUser } from '../../../middleware/deserializeUser';
import { requireUser } from '../../../middleware/requireUser';
import { validate } from '../../../middleware/validate';
import { createProductSchema, deleteProductSchema, getAllProductSchema, updateProductSchema} from '../../../schema/product';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/create', validate(createProductSchema), createProductHandler);
router.get('/get-all', validate(getAllProductSchema, 'query'), getAllProductHandler);
router.put('/update', validate(updateProductSchema), updateProductHandler);
router.patch('/delete', validate(deleteProductSchema), deleteProductHandler);

export default router;
