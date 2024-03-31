import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";



export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'sqlite',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'nest',
        });
        sequelize.addModels([User]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
