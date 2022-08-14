import { PackNode } from '../models/transport-pack';

export const weightUnitsRatio: Record<string, number> = {
  'KILOGRAMS': 35.274,
  'POUNDS': 16,
}


export const isUnitValid = (w: string): boolean => {
  const validUnits: Record<string, boolean> = {
    KILOGRAMS: true,
    OUNCES: true,
    POUNDS: true,
  }

  return !!validUnits[w]
}

export const convertFromOunces = (unit: string, ounces: number,): number => {
  return ounces / weightUnitsRatio[unit]
}

export const createTransportPack = (unit: string, weight: number): PackNode => {
  let totalWeight = weight
  if (unit !== "OUNCES") {
    totalWeight = convertFromOunces(unit, weight)
  }
  return {
    unit,
    weight: totalWeight,
  }
}