import mongoose, { Document, Model, Schema } from 'mongoose';
export type ICharge = Document & {
  customerName: string;
  customerTaxID: string;
  customerEmail: string;
  brCode: string;
  correlationID: string;
  value: number;
  status: string;
  product: Schema.Types.ObjectId;
};

const ChargeSchema = new Schema<ICharge>(
  {
    customerName: {
      type: String,
      required: true,
      description: 'Customer Name'
    },
    customerTaxID: {
      type: String,
      required: true,
      descripton: 'Customer Tax ID'
    },
    customerEmail: {
      type: String,
      required: true,
      descripton: 'Customer Email'
    },
    status: {
      type: String,
      required: true,
      descripton: 'Charge Status'
    },
    value: {
      type: Number,
      required: true,
      descripton: 'Charge Value'
    },
    brCode: {
      type: String,
      description: 'brcode of this charge'
    },
    correlationID: {
      type: String,
      description: 'CorrelationID of this charge'
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  },
  {
    collection: 'Charge',
    timestamps: true
  }
);

const ChargeModel: Model<ICharge> = mongoose.model('Charge', ChargeSchema);

export default ChargeModel;
