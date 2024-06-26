import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          models: [],
        }),
      ],
})
export class DatabaseModule {}
