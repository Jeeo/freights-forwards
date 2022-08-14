
import { DataSource } from 'typeorm';
import { ShipmentRepository, IShipmentRepository } from './shipment';
import { TransportPackRepository, ITransportPackRepository } from './transport-pack';
import { OrganizationRepository, IOrganizationRepository } from './organization';

export interface IRepositories {
  shipment: IShipmentRepository,
  organization: IOrganizationRepository,
  transportPack: ITransportPackRepository,
}

export default (dataSource: DataSource): IRepositories => ({
  shipment: new ShipmentRepository(dataSource),
  organization: new OrganizationRepository(dataSource),
  transportPack: new TransportPackRepository(dataSource),
})