import express, { Express } from "express";
import { DataSource } from 'typeorm';
import repositoriesBuilder from '../../infrastructure/repositories';
import applicationsBuilder from '../../application';
import router from './routes/router';

export class Server {
  private app: Express
  constructor(
  ) {
    this.app = express()
  }

  start(port: number, cb?: () => void) {
    this.app.listen(port, cb)
  }

  boot(dataSource: DataSource) {
    const repositories = repositoriesBuilder(dataSource)
    const applications = applicationsBuilder(repositories)
    this.app.use(express.json())

    router(this.app).organization(applications.organization)
    router(this.app).shipment(applications.shipment)
    router(this.app).transportPack(applications.transportPack)

    this.start(3000, () => console.log("listening on 3000"))
  }
}