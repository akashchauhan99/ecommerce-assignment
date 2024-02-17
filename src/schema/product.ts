import { boolean, number, object, string, TypeOf, union } from 'zod';
import { COMMON_STATUS, SORT_VALUES } from '../constant/common';

export const createProductSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    description: string({ required_error: 'Description is required' }),
    price: number({ required_error: 'Price is required' }),
  })
});

export const getAllProductSchema = object({
  query: object({
    sort: string({}).default('createdAt'),
    sortOrder: string({}).default(SORT_VALUES.DESC),
    page: string({ required_error: 'Please enter the Page Number'}),
    size: string({ required_error: 'Please enter the Page Size'}),
    search: string({}).default(''),
  })
});

export const updateProductSchema = object({
  body: object({
    orderId: string({ required_error: 'ProductId is required'}),
    status: string().refine(value => Object.values(COMMON_STATUS).includes(value), {
      message: `Status must be either ${COMMON_STATUS.OUT_FOR_DELIVERY} or ${COMMON_STATUS.COMPLETED}`,
      path: ['status']
    })
  })
});

export const deleteProductSchema = object({
  body: object({
    productId: string({ required_error: 'ProductId is required'})
  })
});


export type CreateUserInput = TypeOf<typeof createProductSchema>['body'];
export type GetAllProductInput = TypeOf<typeof getAllProductSchema>['query'];
export type UpdateProductInput = TypeOf<typeof updateProductSchema>['body'];
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>['body'];