import { Server } from 'socket.io';



let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // o tu frontend
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('chat message', (msg) => {
      console.log('Mensaje recibido:', msg);
      io.emit('chat message', msg); // Broadcast a todos los clientes
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

export function getIO() {
  return io;
}
