import { Nullable } from '../../../Shared/domain/Nullable';
import { CatalogId } from '../../Shared/domain/Catalogs/CatalogId';
import { Catalog } from './Catalog';

export interface CatalogRepository {
  save(catalog: Catalog): Promise<void>;

  search(id: CatalogId): Promise<Nullable<Catalog>>;
}
