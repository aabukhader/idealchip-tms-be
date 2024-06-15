import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/Prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async add(body: Prisma.HistoryCreateInput) {
    try {
      await this.prisma.history.create({ data: body });
    } catch (error) {
      throw Error(error.message);
    }
  }
}
