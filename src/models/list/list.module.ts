import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { FirestoreService } from 'src/Services/Firestore.service';
import { PrismaService } from 'src/db/Prisma.service';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  controllers: [ListController],
  providers: [FirestoreService, PrismaService, ListService],
  imports: [FirestoreModule],
})
export class ListModule {}
