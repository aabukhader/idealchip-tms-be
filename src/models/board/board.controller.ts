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
import { BoardService } from './board.service';
import { Response } from 'express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/')
  async create(@Res() res: Response, @Body() body: any) {
    const result = await this.boardService.createDocument({
      ...body.data,
      created_at: new Date().toISOString(),
      is_deleted: false,
    });
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Get('/')
  async getAllBoards(@Res() res: Response) {
    const result = await this.boardService.getCollection();
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Get('/:id')
  async getBoardById(@Res() res: Response, @Param() id: string) {
    const result = await this.boardService.getDocument(id);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param() id: string,
    @Body() body: unknown,
  ) {
    const result = await this.boardService.updateDocument(id, body);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }

  @Delete('/:id/:userId')
  async deleteBoard(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    const result = await this.boardService.deleteDocument(id, userId);
    res.status(result.status);
    delete result.status;
    res.json(result);
  }
}
