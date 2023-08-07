import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    createMessageDto.timestamp = Date.now();
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async getLatestMessages(roomId: string): Promise<Message[]> {
    return this.messageModel
      .find({ roomId: roomId })
      .sort({ timestamp: 1 })
      .limit(50)
      .exec();
  }

  async loadMoreMessages(
    roomId: string,
    timestamp: number,
  ): Promise<Message[]> {
    return this.messageModel
      .find({ roomId: roomId, timestamp: { $lt: timestamp } })
      .sort({ timestamp: 1 })
      .limit(50)
      .exec();
  }
}
