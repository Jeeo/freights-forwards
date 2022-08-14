import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Audit } from './audit';
import { TransportPack } from './transport-pack';
import { Organization } from './organization';

@Entity()
export class Shipment extends Audit {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public referenceId: string

  @Column({ nullable: true })
  public eta: string

  @OneToMany(() => TransportPack, (pack) => pack.shipment, { cascade: ['insert'] })
  public packs: TransportPack[]

  @ManyToMany(() => Organization, (oc) => oc.id)
  @JoinTable()
  public organizations: Organization[]
}

