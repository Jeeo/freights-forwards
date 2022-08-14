import { IRepositories } from '../infrastructure/repositories';
import { IOrganizationApp, OrganizationApplication } from './organization';
import { IShipmentApp, ShipmentApplication } from './shipment';
import { ITransportPackApp, TransportPackApplication } from './transport-pack'

export interface IApplication {
  shipment: IShipmentApp
  organization: IOrganizationApp
  transportPack: ITransportPackApp
}

export default (repositories: IRepositories): IApplication => ({
  shipment: new ShipmentApplication(repositories.organization, repositories.shipment),
  organization: new OrganizationApplication(repositories.organization),
  transportPack: new TransportPackApplication(repositories.transportPack),
})