import mongoose, { Document, Model, models, Schema } from 'mongoose';

export interface IMessage extends Document {
  username: string;
  messageText: string;
  roomId: string;
  imageSrc: string;
}

const messageSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `Please add a username`],
    },
    messageText: {
      type: String,
      required: [true, `Please add a message`],
    },
    roomId: {
      type: String,
      required: [true, `Please add roomId`],
    },
    imageSrc: {
      type: String,
      required: [true, `Please add imageSrc`],
    },
  },
  { timestamps: true },
);

type MessageModel = Model<IMessage>;
export default models.Message
  ? (models.Message as MessageModel)
  : mongoose.model<IMessage>(`Message`, messageSchema);
