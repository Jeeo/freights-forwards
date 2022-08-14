import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Audit } from './audit';
import { Shipment } from './shipment';

export interface PackNode {
  weight: number
  unit: string
}

@Entity()
export class TransportPack extends Audit {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public weight: number

  @Column()
  public unit: string

  @ManyToOne(() => Shipment, (s) => s.packs)
  public shipment: Shipment
}