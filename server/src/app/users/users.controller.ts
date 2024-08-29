import {
  Controller,
  Query,
  Get,
  Patch,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { PaginationRequest } from 'src/app/shared/utils/pagination-request';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from 'src/app/shared/data/users';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  fetchUsers(@Query() query: PaginationRequest) {
    return this.userService.fetchUsers(query);
  }

  @Patch(':id')
  modifyUserPoints(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateDTO: UpdateUserDTO,
  ): boolean {
    console.log(updateDTO);
    
    return this.userService.modifyUserPoints(userId, updateDTO);
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }
}
