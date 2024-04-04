import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.entity";
import { DatabaseEntity } from "./models/database.entity";
import { DatabaseProviderName } from "src/constants";



export const databaseProviders = [
    {
      provide: DatabaseProviderName,
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'sqlite',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'nest',
        });
        sequelize.addModels([User, DatabaseEntity]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
