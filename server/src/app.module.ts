import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DbconnectionModule } from './dbconnection/dbconnection.module';

@Module({
  imports: [AuthModule, DatabaseModule, DbconnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
