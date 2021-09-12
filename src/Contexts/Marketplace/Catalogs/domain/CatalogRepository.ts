import { Nullable } from '../../../shared/domain/Nullable';
import { CatalogId } from '../../shared/domain/catalogs/CatalogId';
import { Catalog } from './Catalog';

export interface CatalogRepository {
  save(catalog: Catalog): Promise<void>;

  search(id: CatalogId): Promise<Nullable<Catalog>>;
}
