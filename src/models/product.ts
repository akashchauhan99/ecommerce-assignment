import {
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { COMMON_STATUS } from '../constant/common';

// Export the Product class to be used as TypeScript type
export class Product {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  price: number;

  @prop({ default: true })
  stock_availability: boolean;

  @prop({ default: COMMON_STATUS.ACTIVE, enum: [COMMON_STATUS.ACTIVE, COMMON_STATUS.INACTIVE] })
  status: string
}

const productModel = getModelForClass(Product, {
  schemaOptions: {
    collection: 'products',
    timestamps: true,
  },
});

export default productModel;
