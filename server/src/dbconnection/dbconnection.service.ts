import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from 'src/database/models/database.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DbconnectionService {
    private readonly databases: Repository<DatabaseEntity>;
    /**
     *
     */
    constructor(private readonly dataSource: DataSource) {
        this.databases = dataSource.getRepository(DatabaseEntity);
    }

    async connectDatabase()
    {
        
    }
}
