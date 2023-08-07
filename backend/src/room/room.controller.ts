import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from 'src/dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<any> {
    const validateRoomId = createRoomDto.roomId.match(/^[a-zA-Z0-9]+$/);
    const validateUserId = createRoomDto.userId.match(/^[a-zA-Z0-9]+$/);
    const roomId = createRoomDto.roomId.toLowerCase();
    const userId = createRoomDto.userId.toLowerCase();

    if (!validateRoomId) {
      throw new BadRequestException(
        'Invalid Room ID, only alphanumeric allowed without spaces',
      );
    }

    if (!validateUserId) {
      throw new BadRequestException(
        'Invalid Username, only alphanumeric allowed without spaces',
      );
    }

    const isTheUserExist = await this.roomService.findUserRooms(roomId, userId);
    if (isTheUserExist.length) {
      throw new BadRequestException('User already exists in this room');
    }
    const existingRoom = await this.roomService.findOne(roomId);
    if (!existingRoom) {
      return this.roomService.create({
        roomId,
        users: [userId],
      } as CreateRoomDto);
    }
    return await this.roomService.addUserToRoom(roomId, userId);
  }

  @Post('session')
  async removeUserFromRoom(@Body() createRoomDto: CreateRoomDto): Promise<any> {
    return await this.roomService.removeUserFromRoom(
      createRoomDto.roomId,
      createRoomDto.userId,
    );
  }
}
