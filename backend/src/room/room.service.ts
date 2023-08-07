import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from '../schemas/room.schema';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  async findOne(roomId: string): Promise<Room> {
    return this.roomModel.findOne({ roomId: roomId }).exec();
  }

  async addUserToRoom(roomId: string, userId: string): Promise<Room> {
    return this.roomModel
      .findOneAndUpdate(
        { roomId: roomId },
        { $push: { users: userId } },
        { new: true },
      )
      .exec();
  }

  async removeUserFromRoom(roomId: string, userId: string): Promise<Room> {
    return this.roomModel
      .findOneAndUpdate(
        { roomId: roomId },
        { $pull: { users: userId } },
        { new: false },
      )
      .exec();
  }

  async findUserRooms(roomId: string, userId: string): Promise<Room[]> {
    return this.roomModel.find({ roomId, users: userId }).exec();
  }
}
