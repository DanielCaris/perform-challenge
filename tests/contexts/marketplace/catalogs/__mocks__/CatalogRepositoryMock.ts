import { Catalog } from '../../../../../src/contexts/marketplace/catalogs/domain/Catalog';
import { CatalogRepository } from '../../../../../src/contexts/marketplace/catalogs/domain/CatalogRepository';
import { CatalogId } from '../../../../../src/contexts/marketplace/shared/domain/catalogs/CatalogId';
import { Nullable } from '../../../../../src/contexts/shared/domain/Nullable';

export class CatalogRepositoryMock implements CatalogRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(catalog: Catalog): Promise<void> {
    this.mockSave(catalog);
  }

  assertLastSavedCatalogIs(expected: Catalog): void {
    const mock = this.mockSave.mock;
    const lastSavedCatalog = mock.calls[mock.calls.length - 1][0] as Catalog;
    expect(lastSavedCatalog).toBeInstanceOf(Catalog);
    expect(lastSavedCatalog.toPrimitives()).toEqual(expected.toPrimitives());
  }

  async search(id: CatalogId): Promise<Nullable<Catalog>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<Catalog>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedCatalogIs(expected: CatalogId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }
}
