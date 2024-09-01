/* eslint-disable prettier/prettier */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

    // Notificamos a todos que se ha conectado
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
  }

  @SubscribeMessage('new-message')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // solo emite al cliente inicial

    // client.emit('new-message-server', {
    //   fullName: 'Harvey',
    //   message: payload.message || 'no message',
    // });

    // emitir a todos menos al cliente inicial
    // client.broadcast.emit('new-message-server', payload);

    // emitir a todos
    this.wss.emit('new-message-server', payload);
  }
}
