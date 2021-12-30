import { Server, createServer } from 'http';
import next, { NextApiHandler, NextApiRequest } from 'next';
import express, { Express, Request, Response } from 'express';
import { Server as socketioServer, Socket } from 'socket.io';
import { IMessage } from '@/pages';

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
      // leave other rooms before joining new room
      for (const roomId of socket.rooms) {
        socket.leave(roomId);
      }
      socket.join(roomId);
    });
    socket.on(`message`, (data: IMessage, roomId) => {
      io.to(roomId).emit(`message`, {
        messageText: data.messageText,
        username: data.username,
        imageSrc: data.imageSrc,
      });
    });
    socket.on(`disconnect`, (reason) => {
      console.log(`detected user disconnect: `, reason);
    });
  });

  expressApp.all(`*`, (req: NextApiRequest, res: any) => handle(req, res));
  server.listen(port, () => console.log(`server is running at port: ${port}`));
});
