import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CatalogId } from '../../../Shared/domain/Catalogs/CatalogId';
import { Catalog } from '../../domain/Catalog';
import { CatalogRepository } from '../../domain/CatalogRepository';

export class MongoCatalogRepository extends MongoRepository<Catalog> implements CatalogRepository {
  public save(catalog: Catalog): Promise<void> {
    return this.persist(catalog.id.value, catalog);
  }

  public async search(id: CatalogId): Promise<Nullable<Catalog>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    return document ? Catalog.fromPrimitives({ ...document, id: id.value }) : null;
  }

  protected moduleName(): string {
    return 'catalogs';
  }
}
