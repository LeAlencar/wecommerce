import mongoose, { Document, Model, Schema } from 'mongoose';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  pixKey: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    pixKey: {
      type: String,
      required: true
    }
  },
  {
    collection: 'User',
    timestamps: true
  }
);

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);

export default UserModel;
