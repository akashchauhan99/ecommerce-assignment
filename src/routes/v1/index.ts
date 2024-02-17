import express from 'express';
import authRoutes from './auth/index';
import userRoutes from './user/index';
import productRoutes from './product/index';
import orderRoutes from './order/index';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

export default router;
