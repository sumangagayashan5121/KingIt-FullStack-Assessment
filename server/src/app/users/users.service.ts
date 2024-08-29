import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from 'src/app/shared/data/users';
import { PaginatedResponse } from 'src/app/shared/utils/paginated-response';
import { PaginationRequest } from 'src/app/shared/utils/pagination-request';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private readonly users: User[]) {}

  fetchUsers(paginationRequest: PaginationRequest): PaginatedResponse<User> {
    const { page, pageSize } = paginationRequest;
    if (page < 1 || pageSize < 0) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const count = this.users.length;

    if (pageSize === 0) {
      return new PaginatedResponse<User>([], count, paginationRequest);
    }

    const sortedUsers: User[] = [...this.users]
      .sort((a, b) => b.points - a.points)
      .map((user, i) => ({ ...user, rank: i + 1 }));

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    return new PaginatedResponse<User>(
      paginatedUsers,
      count,
      paginationRequest
    );
  }

  modifyUserPoints(id: number, updateUserDto: UpdateUserDTO): boolean {
    try {
      const { points } = updateUserDto;
      const user = this.users.find((user) => user.id === id);

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      user.points = points;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

    findUserById(id: number) {
      const sortedUsers: User[] = [...this.users]
      .sort((a, b) => b.points - a.points)
      .map((user, i) => ({ ...user, rank: i + 1 }));

    const user = sortedUsers.filter((user) => user.id === id)[0];

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
