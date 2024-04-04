import { DatabaseRepName, UserRepName } from "src/constants";
import { User } from "./models/user.entity";
import { DatabaseEntity } from "./models/database.entity";

export const repositoryProviders = [
    {
        provide: UserRepName,
        useValue: User
    },
    {
        provide: DatabaseRepName,
        useValue: DatabaseEntity
    },

]