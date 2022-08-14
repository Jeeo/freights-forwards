
import { Express } from 'express';
import { IOrganizationApp } from '../../../application/organization';
import OrganizationsController from '../controllers/organizations';


export default (app: Express) => (application: IOrganizationApp) => {
  const controller = OrganizationsController(application)
  app.post("/organization", controller.create.bind(controller))
  app.get("/organizations/:id", controller.findOne.bind(controller))
  app.get("/organizations", controller.list.bind(controller))
  // app.get("")
}