
import { Express } from 'express';
import transportPacksController from '../controllers/transport-packs';
import { ITransportPackApp } from '../../../application/transport-pack';


export default (app: Express) => (application: ITransportPackApp) => {
  const controller = transportPacksController(application)
  app.get("/transport-packs/total-weight", controller.totalWeight.bind(controller))
}