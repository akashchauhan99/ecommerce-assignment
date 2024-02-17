import { NextFunction, Request, Response } from 'express';
import { COMMON_STATUS } from '../constant/common';
import AppError from '../utils/appError';
import { pagination } from '../utils/helper';
import { createOrder, findOrder, getAllOrder, updateOrder } from '../services/order';
import { findProductById } from '../services/product';
import { Types } from 'mongoose';

export const createOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products, address } = req.body;
    const user = res.locals.user;
    let total: Number = 0;
    for (let i = 0; i < products.length; i++) {
      const findProductDetail = await findProductById(products[i].productId);
      products[i].price = (findProductDetail?.price || 0) * products[i].quantity;
      total = total + products[i].price;
      products[i].productId = products[i].productId;
    }
    const createOrderObj: any = {
      products,
      address,
      total,
      userId: user._id
    };
    const create = await createOrder(createOrderObj);
    return res.status(200).json({ status: 'success', data: { create } });
  } catch (err: any) {
    next(err);
  }
};

export const getAllOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, size, sort, sortOrder, status } = req.query;
    const paginate = pagination({ page: Number(page), size: Number(size) });
    const user = res.locals.user;
    const condition: any = {
      userId: user._id
    };
    if (status) {
      condition.status = status;
    }
    const getData = await getAllOrder(condition, paginate.offset, paginate.size, sort, sortOrder);
    return res.status(200).json({ status: 'success', data: { getData } });
  } catch (err: any) {
    next(err);
  }
};

export const updateOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, status } = req.body;
    const getOrder = await findOrder({ _id: orderId });
    if (!getOrder) {
      return next(new AppError(`Order is not available`, 404));
    }
    const update = await updateOrder({ _id: orderId }, { status });
    return res.status(200).json({ status: 'success', data: { update } });
  } catch (err: any) {
    next(err);
  }
};