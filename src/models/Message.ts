import mongoose, { Document, Model, models, Schema } from 'mongoose';

export interface IMessage extends Document {
  username: string;
  messageText: string;
  createdAt?: Date;
  _id?: string;
}

const messageScheme: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, `Please add a username`],
  },
  messageText: {
    type: String,
    required: [true, `Please add a message`],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, `Please add a created date`],
  },
});

type MessageModel = Model<IMessage>;
export default models.Message
  ? (models.Message as MessageModel)
  : mongoose.model<IMessage>(`Message`, messageScheme);
