export class CatalogAlreadyExists extends Error {
  constructor(id: string) {
    super(`Catalog ${id} already exists`);
  }
}
