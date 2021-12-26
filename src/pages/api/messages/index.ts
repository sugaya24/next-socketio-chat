import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case `GET`:
      try {
        const data = await Message.find({ roomId: `home` });
        const messages = data.map((doc) => {
          const message = doc.toObject();
          message._id = message._id?.toString();
          return JSON.parse(JSON.stringify(message));
        });
        res.status(200).json({ sucess: true, data: messages });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case `POST`:
      try {
        const message = await Message.create(req.body);
        res.status(201).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
