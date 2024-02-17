import { NextFunction, Request, Response } from 'express';
import { createProduct, findProduct, getAllProducts, updateProduct } from '../services/product';
import { COMMON_STATUS } from '../constant/common';
import AppError from '../utils/appError';
import { pagination } from '../utils/helper';

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createProductObj: any = { ...req.body };
    const create = await createProduct(createProductObj);
    return res.status(200).json({ status: 'success', data: { create } });
  } catch (err: any) {
    next(err);
  }
};

export const getAllProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, page, size, sort, sortOrder } = req.query;
    const paginate = pagination({ page: Number(page), size: Number(size) });
    const condition: any = {
      status: COMMON_STATUS.ACTIVE
    };
    if (search) {
      condition.name = { $regex: `.*${search}.*`, $options: 'i' }
    }
    const getData = await getAllProducts(condition, paginate.offset, paginate.size, sort, sortOrder);
    return res.status(200).json({ status: 'success', data: { getData } });
  } catch (err: any) {
    next(err);
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, ...data } = req.body;
    const getProduct = await findProduct({ _id: productId, status: COMMON_STATUS.ACTIVE });
    if (!getProduct) {
      return next(new AppError(`Product is not available`, 404));
    }
    const update = await updateProduct({ _id: productId }, data);
    return res.status(200).json({ status: 'success', data: { update } });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;
    const getProduct = await findProduct({ _id: productId, status: COMMON_STATUS.ACTIVE });
    if (!getProduct) {
      return next(new AppError(`Product is not available`, 404));
    }
    const deleteProduct = await updateProduct({ _id: productId }, { status: COMMON_STATUS.INACTIVE });
    return res.status(200).json({ status: 'success', data: { deleteProduct } });
  } catch (err: any) {
    next(err);
  }
};