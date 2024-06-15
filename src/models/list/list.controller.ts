import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ListService } from './list.service';
import { Response } from 'express';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('/')
  async create(@Res() res: Response, @Body() body: any) {
    const result = await this.listService.createDocument({
      ...body,
      created_at: new Date().toISOString(),
    });
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Get('/')
  async getAllBoards(@Res() res: Response) {
    const result = await this.listService.getCollection();
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Get('/:id')
  async getBoardById(@Res() res: Response, @Param("id") id: string) {
    const result = await this.listService.getDocument(id);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body("data") body: unknown,
  ) {
    const result = await this.listService.updateDocument(id, body);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Delete('/:id')
  async deleteBoard(@Res() res: Response, @Param('id') id: string) {
    const result = await this.listService.deleteDocument(id);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }
}
