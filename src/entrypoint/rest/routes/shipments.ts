
import { Express } from 'express';
import { IShipmentApp } from '../../../application/shipment';
import shipmentsController from '../controllers/shipments';


export default (app: Express) => (application: IShipmentApp) => {
  const controller = shipmentsController(application)
  app.post("/shipment", controller.create.bind(controller))
  app.get("/shipments/:id", controller.findOne.bind(controller))
  app.get("/shipments", controller.list.bind(controller))
}