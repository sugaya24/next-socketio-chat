import { Server, createServer } from 'http';
import next, { NextApiHandler, NextApiRequest } from 'next';
import express, { Express, Request, Response } from 'express';
import { Server as socketioServer, Socket } from 'socket.io';
import { Message } from '@/pages';

const port = parseInt(process.env.PORT || `3000`, 10);
const dev = process.env.NODE_ENV !== `production`;
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();

app.prepare().then(async () => {
  const expressApp: Express = express();
  const server: Server = createServer(expressApp);
  const io: socketioServer = new socketioServer();

  io.attach(server);

  expressApp.get(`/socket`, async (_: Request, res: Response) => {
    res.send(`hello world`);
  });

  io.on(`connection`, (socket: Socket) => {
    socket.on(`join`, (roomId) => {
      socket.join(roomId);
      console.log(`joined room ${roomId}!`);
    });
    socket.on(`message`, (data: Message, roomId) => {
      console.log(`rooms: `, socket.rooms);
      io.to(roomId).emit(`message`, {
        messageText: data.messageText,
        username: data.username,
      });
    });
  });

  expressApp.all(`*`, (req: NextApiRequest, res: any) => handle(req, res));
  server.listen(port);
  console.log(`server is running...`);
});
