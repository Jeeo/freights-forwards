import { Shipment } from '../domain/models/shipment';
import { IShipmentRepository } from '../infrastructure/repositories/shipment';
import { IOrganizationRepository } from '../infrastructure/repositories/organization';

import { PackNode } from '../domain/models/transport-pack';
import { Organization } from '../domain/models/organization';
import { createShipment } from '../domain/services/shipment';


export interface IShipmentApp {
  create(
    referenceId: string,
    orgCodes?: string[],
    eta?: string,
    packages?: PackNode[],
  ): Promise<Shipment | Error>
  findById(id: string): Promise<Shipment | null>
  list(): Promise<Shipment[] | []>
}

export class ShipmentApplication implements IShipmentApp {
  constructor(
    private orgRepository: IOrganizationRepository,
    private shipmentRepository: IShipmentRepository
  ) { }

  async create(
    referenceId: string,
    orgCodes?: string[],
    eta?: string,
    packages?: PackNode[],
  ): Promise<Shipment | Error> {
    console.info("starting to create a new shipment")

    let organizations: Organization[] = []
    if (orgCodes?.length) {
      organizations = await this.orgRepository.findByCodeList(orgCodes)
    }


    try {
      const shipment = createShipment(
        referenceId,
        organizations,
        eta,
        packages,
      )
      const createdOrg = await this.shipmentRepository.save(shipment)
      console.info("shipment created")
      return createdOrg
    } catch (e) {
      console.error("error on create a new shipment", e)
      throw e
    }
  }

  async findById(id: string): Promise<Shipment | null> {
    const result = await this.shipmentRepository.findById(id)
    return result;
  }

  async list(): Promise<Shipment[] | []> {
    return this.shipmentRepository.list()
  }
}