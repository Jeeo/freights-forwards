
import { Request, Response } from 'express';
import { IShipmentApp } from '../../../application/shipment';
import { shipmentToJSON, WeightDTO } from '../dto/shipment';
import { Shipment } from '../../../domain/models/shipment';
import { InvalidWeightUnitError } from '../../../domain/models/errors';


class ShipmentsController {
  constructor(
    private app: IShipmentApp
  ) { }

  async create(req: Request, res: Response) {
    const { body } = req

    if (!body.referenceId) {
      res.status(400).json({ message: `reference_id is required` })
      return
    }

    let packages = []
    if (body.transportPacks?.nodes.length) {
      packages = body.transportPacks?.nodes.map((el: { totalWeight: WeightDTO }) => ({ ...el.totalWeight }))
    }

    try {
      const result = await this.app.create(
        body.referenceId,
        body.organizations,
        body.estimatedTimeArrival,
        packages,
      ) as Shipment
      const response = shipmentToJSON(result)
      res.status(201).json(response)
      return
    } catch (e) {
      if (e instanceof InvalidWeightUnitError) {
        res.status(400).json({ message: e.message })
        return
      }
      console.error(e)
      res.status(500).send()
      return
    }

  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await this.app.findById(id)
      if (!result) {
        return res.status(404).send("shipment not found")
      }
      const response = shipmentToJSON(result)
      return res.json(response)
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await this.app.list()
      return res.json(result.map(shipmentToJSON))
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }
}

export default (app: IShipmentApp) => new ShipmentsController(app)