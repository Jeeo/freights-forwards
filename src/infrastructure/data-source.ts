import "reflect-metadata"
import { DataSource } from "typeorm"
import entities from '../domain/models'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "freights",
    synchronize: true,
    logging: false,
    entities: [
        ...entities
    ],
    migrations: [],
    subscribers: [],
})

