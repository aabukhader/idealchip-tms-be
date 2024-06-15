import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async getUserByIdOrNameOrEmail(
    @Res() res: Response,
    @Param('id')
    id: Prisma.UsersWhereUniqueInput,
  ) {
    const result = await this.usersService.getUserByIdOrNameOrEmail(id);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Post('/')
  async create(@Res() res: Response,@Body("data") body: Prisma.UsersCreateInput) {
    const result = await this.usersService.create(body);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Get('/')
  async getAll(@Res() res: Response) {
    const result = await this.usersService.getAllUsers();
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    body: Partial<Prisma.UsersUpdateInput>,
  ) {
    const result = await this.usersService.update(id, body);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Delete('/:id')
  async deleteUser(@Res() res: Response, @Param('id') id: string) {
    const result = await this.usersService.deleteUser(id);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Patch('/:id/:status')
  async changeUserStatus(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    const result = await this.usersService.changeUserStatus(
      id,
      status == 'true' ? true : false,
    );
    res.status(result.status);
    delete result.status;
    res.json(result);
  }
}
