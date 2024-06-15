import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/db/Prisma.service';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  imports: [FirestoreModule],
})
export class UsersModule {}
