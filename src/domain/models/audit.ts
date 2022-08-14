import { CreateDateColumn } from 'typeorm';

export abstract class Audit {
  @CreateDateColumn({ select: true })
  public createdAt: Date;
}
