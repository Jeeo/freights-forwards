
import { TransportPack } from '../../domain/models/transport-pack';
import { DataSource, Repository } from 'typeorm';

export interface ITransportPackRepository {
  weightSum(): Promise<number>
}

export class TransportPackRepository implements ITransportPackRepository {
  private repo: Repository<TransportPack>

  constructor(
    private ds: DataSource,
  ) {
    this.repo = this.ds.getRepository(TransportPack)
  }


  async weightSum(): Promise<number> {
    const result = await this.repo.query("select sum(weight) as total from transport_pack")
    if (!result?.length) {
      return 0
    }

    const { total } = result?.[0]
    return total
  }

}