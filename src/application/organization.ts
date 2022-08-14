import { updateOrgCode } from '../domain/services/organization';
import { Organization } from '../domain/models/organization';
import { IOrganizationRepository } from '../infrastructure/repositories/organization';
import { createOrg } from '../domain/services/organization';


export interface IOrganizationApp {
  create(id: string, code: string): Promise<Organization | Error>
  findById(id: string): Promise<Organization | null>
  list(): Promise<Organization[] | []>
}

export class OrganizationApplication implements IOrganizationApp {
  constructor(
    private orgRepository: IOrganizationRepository
  ) { }


  async create(id: string, code: string): Promise<Organization | Error> {
    console.info("starting to create a new organization")
    const currentOrg = await this.orgRepository.findById(id)

    if (currentOrg) {
      console.info("updating organzation code")
      if (code == currentOrg.code) { // makes creation idempotent
        return currentOrg
      }
      const updated = updateOrgCode(currentOrg, code)
      try {
        const result = await this.orgRepository.save(updated)
        console.info("organzation code updated")
        return result
      } catch (e) {
        console.error(e)
        throw e
      }
    }

    const org = createOrg(id, code)

    try {
      const createdOrg = await this.orgRepository.save(org)
      console.info("organization created")
      return createdOrg
    } catch (e) {
      console.error("error on create a new organization", e)
      throw e
    }
  }

  async findById(id: string): Promise<Organization | null> {
    const result = await this.orgRepository.findById(id)
    return result;
  }

  async list(): Promise<Organization[] | []> {
    return this.orgRepository.list()
  }
}