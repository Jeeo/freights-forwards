import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { Audit } from './audit';

@Entity()
export class Organization extends Audit {
  @PrimaryColumn()
  public id: string

  @Column()
  public code: string
}