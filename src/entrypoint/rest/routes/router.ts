import { Express } from 'express';
import organizationRouter from './organizations'
import shipments from './shipments';
import transportPacks from './transport-packs';

export default (app: Express) => ({
  organization: organizationRouter(app),
  shipment: shipments(app),
  transportPack: transportPacks(app)
})