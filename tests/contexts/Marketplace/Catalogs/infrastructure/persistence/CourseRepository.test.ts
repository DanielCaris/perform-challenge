import container from '../../../../../../src/apps/backend/dependency-injection';
import { CatalogRepository } from '../../../../../../src/contexts/Marketplace/Catalogs/domain/CatalogRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { CatalogMother } from '../../domain/CatalogMother';

const repository: CatalogRepository = container.get('Marketplace.catalogs.CatalogRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Marketplace.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('CatalogRepository', () => {
  describe('#save', () => {
    it('should save a catalog', async () => {
      const catalog = CatalogMother.random();

      await repository.save(catalog);
    });
  });

  describe('#search', () => {
    it('should return an existing catalog', async () => {
      const expectedCatalog = CatalogMother.random();
      await repository.save(expectedCatalog);

      const catalog = await repository.search(expectedCatalog.id);

      expect(expectedCatalog).toEqual(catalog);
    });

    it('should not return a non existing catalog', async () => {
      expect(await repository.search(CatalogMother.random().id)).toBeFalsy();
    });
  });
});
