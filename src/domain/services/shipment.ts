
import { Shipment } from '../models/shipment';
import { TransportPack } from '../models/transport-pack';
import { PackNode } from '../models/transport-pack';
import { Organization } from '../models/organization';
import { InvalidWeightUnitError } from '../models/errors';
import { isUnitValid } from '../services/transport-pack';
import { weightUnitsRatio } from './transport-pack';

export const createShipment = (
  referenceId: string,
  orgs?: Organization[],
  eta?: string,
  packages?: PackNode[],
): Shipment => {
  const shipment = new Shipment()
  shipment.referenceId = referenceId

  if (packages?.length) {
    const transportPacks = []
    for (const pack of packages) {
      if (!isUnitValid(pack.unit)) {
        throw new InvalidWeightUnitError(`${pack.unit} is invalid`)
      }
      const tp = new TransportPack()
      tp.unit = 'OUNCES'
      tp.weight = pack.weight
      if (pack.unit !== 'OUNCES') {
        tp.weight = convertUnitToOunces(pack.weight, pack.unit)
      }
      transportPacks.push(
        tp
      )
    }
    shipment.packs = transportPacks
  }

  if (orgs?.length) {
    shipment.organizations = orgs
  }

  if (eta) {
    shipment.eta = eta
  }

  return shipment
}

const convertUnitToOunces = (weight: number, unit: string): number => {
  return weight * weightUnitsRatio[unit]
}
