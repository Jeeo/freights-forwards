
import { Request, Response } from 'express';
import { IOrganizationApp } from '../../../application/organization';


class OrganizationsController {
  constructor(
    private app: IOrganizationApp
  ) { }

  async create(req: Request, res: Response) {
    const { body } = req

    if (!body.id) {
      res.status(400).json({ message: `id is required` })
      return
    }

    if (!body.code) {
      res.status(400).json({ message: `code is required` })
      return
    }


    try {
      const result = await this.app.create(body.id, body.code)
      res.status(201).json(result)
      return
    } catch (e) {
      console.error(e)
      res.status(500).send()
    }

  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await this.app.findById(id)
      if (!result) {
        return res.status(404).send("organization not found")
      }
      return res.json(result)
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }

  async list(req: Request, res: Response) {

    try {
      const result = await this.app.list()
      return res.json(result)
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }
}

export default (app: IOrganizationApp) => new OrganizationsController(app)