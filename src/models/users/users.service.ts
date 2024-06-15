import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/Prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(body: Prisma.UsersCreateInput) {
    try {
      const createdUser = await this.prisma.users.create({ data: body });
      return {
        data: createdUser,
        message: 'New user has been created.',
        status: 201,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }

  async getUserByIdOrNameOrEmail(
    UserWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ) {
    try {
      const user = await this.prisma.users.findUnique({
        where: UserWhereUniqueInput,
      });
      return {
        data: user,
        message: 'User has been found',
        status: 200,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }

  private async isUserExist(id: string) {
    const user = await this.getUserByIdOrNameOrEmail({ id: parseInt(id) });
    return !user;
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.users.findMany();
      return {
        data: users,
        message: 'User has been found',
        status: 200,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }

  async update(id: string, body: Partial<Prisma.UsersUpdateInput>) {
    try {
      if (!this.isUserExist(id)) {
        return { data: [], message: 'User Not Found.', status: 404 };
      }
      const updatedUser = await this.prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      return {
        data: updatedUser,
        message: 'User has been Updated.',
        status: 201,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }

  async deleteUser(id: string) {
    try {
      if (!this.isUserExist(id)) {
        return { data: [], message: 'User Not Found.', status: 404 };
      }
      await this.update(id, { is_deleted: true });
      return {
        data: [],
        message: 'User has been Deleted.',
        status: 201,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }

  async changeUserStatus(id: string, status: boolean) {
    try {
      if (!this.isUserExist(id)) {
        return { data: [], message: 'User Not Found.', status: 404 };
      }

      await this.update(id, { is_active: status });
      return {
        data: [],
        message: `User has been ${status ? 'Activated' : 'Deactivated'}`,
        status: 201,
      };
    } catch (e) {
      return { data: [], message: e.message, status: 500 };
    }
  }
}
