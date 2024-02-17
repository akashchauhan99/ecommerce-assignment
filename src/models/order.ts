import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { COMMON_STATUS } from '../constant/common';
import { User } from './user';
import { Product } from './product';

class Product_Items {
  @prop({ ref: Product, required: true })
  productId!: Ref<Product>;

  @prop({ required: true })
  quantity!: number;

  @prop({ default: true })
  price!: number;
}

export class Order {
  @prop({ type: () => [Product_Items], default: [] })
  products!: Product_Items[];

  @prop({ ref: () => User, required: true })
  userId!: Ref<User>;

  @prop({ default: COMMON_STATUS.PENDING, enum: [COMMON_STATUS.PENDING, COMMON_STATUS.OUT_FOR_DELIVERY, COMMON_STATUS.COMPLETED] })
  status!: string;

  @prop({ required: true })
  address!: string;

  @prop({ required: true })
  total!: number;
}

const orderModel = getModelForClass(Order, {
  schemaOptions: {
    collection: 'orders',
    timestamps: true,
  },
});

export default orderModel;
