
import { In, Repository } from 'typeorm';
import { Organization } from '../../domain/models/organization';
// import { OrganizationCode } from '../../domain/models/organization-code';
import { DataSource } from 'typeorm';

export interface IOrganizationRepository {
  save(organization: Organization): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByCode(code: string): Promise<Organization | null>
  findByCodeList(codes: string[]): Promise<Organization[] | []>
  list(): Promise<Organization[] | []>
}

export class OrganizationRepository implements IOrganizationRepository {
  private repo: Repository<Organization>

  constructor(
    private ds: DataSource,
  ) {
    this.repo = this.ds.getRepository(Organization)
  }

  async save(organization: Organization): Promise<Organization> {
    return this.repo.save(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async findByCode(code: string): Promise<Organization | null> {
    return this.repo.findOne({
      where: {
        code,
      },
    });
  }

  async list(): Promise<Organization[] | []> {
    const orgs = await this.repo.find();
    if (!orgs.length) {
      return []
    }
    return orgs
  }

  async findByCodeList(codes: string[]): Promise<Organization[] | []> {
    const result = await this.repo.find({
      where: {
        code: In(codes),
      },
    });
    if (!result) {
      return []
    }

    return result
  }

}