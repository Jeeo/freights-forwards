
import { Organization } from '../models/organization';

export const createOrg = (id: string, code: string): Organization => {
  const org = new Organization()
  org.id = id
  org.code = code
  return org
}

export const updateOrgCode = (org: Organization, code: string): Organization => {
  const updated = { ...org }
  updated.code = code
  return updated
}