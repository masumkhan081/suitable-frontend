import { OPERABLE_ENTITIES } from './index'

//
export const defaultResponseParams = {
  limit: 10,
  page: 1,
  sort: 'asc',
  sortBy: 'createdAt',
  paginationFields: ['limit', 'page', 'sortBy', 'sortOrder', 'search', 'searchBy']
}
//
export const MAP_SEARCHABLES: Record<string, string[]> = {
  [OPERABLE_ENTITIES.tenant]: ['name', 'email', 'contact', 'isArchieved'],
  [OPERABLE_ENTITIES.landlord]: ['name'],
  [OPERABLE_ENTITIES.agency]: ['name'],
  [OPERABLE_ENTITIES.property]: ['name'],
  [OPERABLE_ENTITIES.rent]: ['name']
}

export const GET_MAP_VALID_QUERY_PARAMS = (entity: keyof typeof MAP_SEARCHABLES) => {
  return [...MAP_SEARCHABLES[entity], ...defaultResponseParams.paginationFields]
}
