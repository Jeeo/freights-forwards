
import { PackNode } from '../domain/models/transport-pack';
import { createTransportPack, isUnitValid } from '../domain/services/transport-pack';
import { ITransportPackRepository } from '../infrastructure/repositories/transport-pack';
import { InvalidWeightUnitError } from '../domain/models/errors';


export interface ITransportPackApp {
  currentTotalWeight(unit?: string): Promise<PackNode | Error>
}

export class TransportPackApplication implements ITransportPackApp {
  constructor(
    private tpRepository: ITransportPackRepository
  ) { }


  async currentTotalWeight(unit: string = 'OUNCES'): Promise<PackNode | Error> {
    if (unit && !isUnitValid(unit)) {
      throw new InvalidWeightUnitError(`${unit} is invalid`)
    }
    const result = await this.tpRepository.weightSum()
    return createTransportPack(unit, result)
  }
}