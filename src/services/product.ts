import { FilterQuery, QueryOptions } from 'mongoose';
import { SORT_ORDER_VALUES } from '../constant/common';
import productModel, { Product } from '../models/product';

export const createProduct = async (input: Partial<Product>) => {
  const data = await productModel.create(input);
  return data;
};

export const findProductById = async (id: string) => {
  const data = await productModel.findById(id).lean();
  return data;
};

export const updateProduct = async (query: FilterQuery<Product>, input: Partial<Product>) => {
  const data = await productModel.updateOne(query, { $set: input }).lean();
  return data;
};

export const findAllProduct = async () => {
  return await productModel.find().lean();
};

export const getAllProducts = async (query: FilterQuery<Product>, page: number, size: number, sort: string, sortOrder: string) => {
  const sortObj: any = {};
  sortObj[sort] = SORT_ORDER_VALUES[sortOrder];
  const list = [{ $skip: page }, { $limit: size }];
  const data = await productModel.aggregate([
    {
      $match: query
    },
    {
      $sort: sortObj
    },
    {
      $facet: {
        count: [{ $count: 'count' }],
        list
      }
    },
    {
      $addFields: {
        count: {
          $cond: {
            if: { $eq: ['$list', []] },
            then: 0,
            else: { $arrayElemAt: ['$count.count', 0] }
          }
        }
      }
    }
  ])
  return data[0];
}

export const findProduct = async (query: FilterQuery<Product>, options: QueryOptions = {}) => {
  return await productModel.findOne(query, {}, options).select('+password');
};
