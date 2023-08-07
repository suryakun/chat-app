import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  roomId: string;

  @Prop()
  userId: string;

  @Prop()
  message: string;

  @Prop()
  timestamp: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
