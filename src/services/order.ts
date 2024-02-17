import { FilterQuery, QueryOptions } from 'mongoose';
import { SORT_ORDER_VALUES } from '../constant/common';
import orderModel, { Order } from '../models/order';

export const createOrder = async (input: Partial<Order>) => {
  const data = await orderModel.create(input);
  return data;
};

export const findOrderById = async (id: string) => {
  const data = await orderModel.findById(id).lean();
  return data;
};

export const updateOrder = async (query: FilterQuery<Order>, input: Partial<Order>) => {
  const data = await orderModel.updateOne(query, { $set: input }).lean();
  return data;
};

export const findAllOrder = async () => {
  return await orderModel.find().lean();
};

export const getAllOrder = async (query: FilterQuery<Order>, page: number, size: number, sort: string, sortOrder: string) => {
  const sortObj: any = {};
  sortObj[sort] = SORT_ORDER_VALUES[sortOrder];
  const list = [{ $skip: page }, { $limit: size }];
  const data = await orderModel.aggregate([
    {
      $match: query
    },
    {
      $sort: sortObj
    },
    {
      $lookup: {
        from: 'products',
        let: {
          productId: '$products.productId',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$productId'],
              },
            },
          },
          {
            $project: {
              name: 1,
            },
          },
        ],
        as: 'result',
      },
    },
    {
      $addFields: {
        products: {
          $map: {
            input: '$products',
            as: 'product',
            in: {
              $mergeObjects: [
                '$$product',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$result',
                        cond: {
                          $eq: [
                            '$$this._id',
                            '$$product.productId',
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
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

export const findOrder = async (query: FilterQuery<Order>, options: QueryOptions = {}) => {
  return await orderModel.findOne(query, {}, options).select('+password');
};
