import express from 'express';
import { deserializeUser } from '../../../middleware/deserializeUser';
import { requireUser } from '../../../middleware/requireUser';
import { validate } from '../../../middleware/validate';
import { orderHistorySchema, orderSchema, updateOrderSchema } from '../../../schema/order';
import { createOrderHandler, getAllOrderHandler, updateOrderHandler } from '../../../controllers/order';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/place-order', validate(orderSchema), createOrderHandler);
router.get('/order-history', validate(orderHistorySchema, 'query'), getAllOrderHandler);
router.put('/update-order', validate(updateOrderSchema), updateOrderHandler);

export default router;
