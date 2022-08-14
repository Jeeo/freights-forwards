
import { Organization } from '../../../domain/models/organization';
import { TransportPack } from '../../../domain/models/transport-pack';
import { Shipment } from '../../../domain/models/shipment';

export interface WeightDTO {
  weight: number
  unit: string
}

interface PackageNodeDTO {
  totalWeight: WeightDTO
}

interface TransportPacksOutDTO {
  nodes: PackageNodeDTO[]
}

interface ShipmentDTO {
  referenceId: string
  organizations: string[]
  estimatedTimeArrival: string
  transportPacks: TransportPacksOutDTO
}


export const transportPackToJSON = (transportPacks: TransportPack[]): TransportPacksOutDTO => {
  const nodes = transportPacks.map<PackageNodeDTO>(el => ({ totalWeight: el }))
  return {
    nodes,
  }
}

export const shipmentToJSON = (shipment: Shipment): ShipmentDTO => {
  const {
    packs,
    organizations,
    eta,
    ...rest
  } = shipment

  let transportPacks: TransportPacksOutDTO = { nodes: [] }
  if (packs?.length) {
    transportPacks = transportPackToJSON(packs)
  }

  let codes: string[] = []
  if (organizations?.length) {
    codes = organizations.map(el => el.code)
  }

  return {
    ...rest,
    estimatedTimeArrival: eta,
    transportPacks,
    organizations: codes,
  }

}