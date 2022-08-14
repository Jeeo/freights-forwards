
import { Shipment } from '../../domain/models/shipment';
import { Repository, DataSource } from 'typeorm';

export interface IShipmentRepository {
  save(shipment: Shipment): Promise<Shipment>
  findById(id: string): Promise<Shipment | null>
  list(): Promise<Shipment[] | []>
}

export class ShipmentRepository implements IShipmentRepository {
  private repo: Repository<Shipment>
  constructor(
    private ds: DataSource,
  ) {
    this.repo = this.ds.getRepository(Shipment)
  }

  async save(shipment: Shipment): Promise<Shipment> {
    return this.repo.save(shipment);
  }

  async findById(id: string): Promise<Shipment | null> {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: {
        organizations: true,
        packs: true,
      }
    });
  }

  async list(): Promise<Shipment[] | []> {
    const shipments = await this.repo.find({
      relations: {
        organizations: true,
        packs: true,
      }
    });
    if (!shipments.length) {
      return []
    }
    return shipments
  }
}