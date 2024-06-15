import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { BoardModule } from './models/board/board.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ListModule } from './models/list/list.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BoardModule,
    FirestoreModule,
    ListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
