import { Module } from '@nestjs/common';
import { User } from './models/user.entity';
import { DatabaseEntity } from './models/database.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // name: 'user',
      database: "../server/db.sqlite",
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, DatabaseEntity]
    })
  ],
})
export class DatabaseModule {}
