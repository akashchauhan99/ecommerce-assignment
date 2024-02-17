import { array, boolean, number, object, string, TypeOf, union } from 'zod';
import { COMMON_STATUS, SORT_VALUES } from '../constant/common';

const productSchema = object({
  productId: string({ required_error: 'Enter the productId'}),
  quantity: number({ required_error: 'Enter the quantity'}).min(1).positive(),
});

export const orderSchema = object({
  body: object({
    products: array(productSchema),
    address: string({ required_error: 'Enter the address' })
  })
});

export const orderHistorySchema = object({
  query: object({
    sort: string({}).default('createdAt'),
    sortOrder: string({}).default(SORT_VALUES.DESC),
    page: string({ required_error: 'Please enter the Page Number'}),
    size: string({ required_error: 'Please enter the Page Size'}),
    status: string().refine(value => Object.values(COMMON_STATUS).includes(value), {
      message: `Status must be ${COMMON_STATUS.PENDING}, ${COMMON_STATUS.OUT_FOR_DELIVERY} or ${COMMON_STATUS.COMPLETED}`,
      path: ['status']
    })
  })
});
export const updateOrderSchema = object({
  body: object({
    orderId: string({ required_error: 'OrderId is required'}),
    status: string().refine(value => Object.values(COMMON_STATUS).includes(value), {
      message: `Status must be either ${COMMON_STATUS.OUT_FOR_DELIVERY} or ${COMMON_STATUS.COMPLETED}`,
      path: ['status']
    })
  })
});

export type OrderSchemaInput = TypeOf<typeof orderSchema>['body'];
export type OrderHistorySchemaInput = TypeOf<typeof orderHistorySchema>['query'];
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>['body'];