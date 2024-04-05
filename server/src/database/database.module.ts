import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './models/user.entity';
import { DatabaseEntity } from './models/database.entity';
import { UserDatabase } from './models/userDatabase.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      // name: 'user',
      storage: `../server/db.sqlite`,
      models: [User, DatabaseEntity, UserDatabase]
    })
  ]
})
export class DatabaseModule {}
