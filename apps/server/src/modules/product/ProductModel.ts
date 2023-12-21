import mongoose, { Document, Model, Schema } from 'mongoose';
export type IProduct = Document & {
  name: string;
  displayName: string;
  description: string;
  price: number;
  user: Schema.Types.ObjectId;
};

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    displayName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    collection: 'Product',
    timestamps: true
  }
);

const ProductModel: Model<IProduct> = mongoose.model('Product', ProductSchema);

export default ProductModel;
