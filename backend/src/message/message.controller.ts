import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { MessageGateway } from './message.gateway';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    @Inject(MessageGateway) private readonly messageGateway: MessageGateway,
  ) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    this.messageGateway.emitToRoom(
      createMessageDto.roomId,
      'newMessage',
      createMessageDto,
    );
    return this.messageService.create(createMessageDto);
  }

  @Get(':roomId')
  async findMessagesByRoomId(@Param('roomId') roomId: string): Promise<any> {
    return this.messageService.getLatestMessages(roomId);
  }

  @Get(':roomId/load/:timestamp')
  async findMessagesByRoomIdLoadMore(
    @Param('roomId') roomId: string,
    @Param('timestamp') timestamp: number,
  ): Promise<any> {
    return this.messageService.loadMoreMessages(roomId, timestamp);
  }
}
