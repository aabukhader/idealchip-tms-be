import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from 'src/db/Prisma.service';
import { FirestoreService } from 'src/Services/Firestore.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { HistoryService } from 'src/Services/History.service';

@Module({
  controllers: [BoardController],
  providers: [FirestoreService, PrismaService, HistoryService, BoardService],
  imports: [FirestoreModule],
})
export class BoardModule {}
