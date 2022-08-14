
import { Request, Response } from 'express';
import { IShipmentApp } from '../../../application/shipment';
import { ITransportPackApp } from '../../../application/transport-pack';
import { InvalidWeightUnitError } from '../../../domain/models/errors';


class TransportPacksController {
  constructor(
    private app: ITransportPackApp
  ) { }

  async totalWeight(req: Request, res: Response) {
    const { unit } = req.query;

    if (unit && typeof (unit) !== 'string') {
      res.status(400).json({ message: "unit should be a valid string: [OUNCES, KILOGRAMS, POUNDS]" })
      return
    }

    try {
      const result = await this.app.currentTotalWeight(unit?.toUpperCase())
      return res.json(result)
    } catch (e) {
      if (e instanceof InvalidWeightUnitError) {
        res.status(400).json({ message: e.message })
        return
      }
      console.error(e)
      return res.status(500).send()
    }
  }
}

export default (app: ITransportPackApp) => new TransportPacksController(app)