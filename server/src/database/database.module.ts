import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { repositoryProviders } from './repository.provider';

@Module({
  providers: [...databaseProviders, ...repositoryProviders],
  exports: [...databaseProviders, ...repositoryProviders]
})
export class DatabaseModule {}
