import { Module } from '@nestjs/common';
import { DbconnectionService } from './dbconnection.service';
import { DbconnectionController } from './dbconnection.controller';

@Module({
  providers: [DbconnectionService],
  controllers: [DbconnectionController]
})
export class DbconnectionModule {}
