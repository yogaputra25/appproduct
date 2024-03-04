import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user';
import { CreateDto } from './dto/createuser.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { classToPlain } from '@nestjs/class-transformer';
import { JwtStrategy } from 'src/strategies/jwt-strategy';
import { JwtGuard } from 'src/guards/jwt-auth.guard';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // @Get()
  // async getall(@Query() data: PaginationDto) {
  //   const resp = this.userService.dataAll(data);
  //   return resp;
  // }

  @Get()
  async getall(@Query() data: PaginationDto) {
    const resp = this.userService.dataAll(data);
    return classToPlain(resp);
  }

  @Post()
  async createUser(@Body() data: CreateDto) {
    return await this.userService.createUser(data);
  }
  @Delete('/:id')
  async deleteUser(@Param() data) {
    return await this.userService.deleteUser(data);
  }
}
