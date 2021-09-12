import { Catalog } from '../../../../../src/contexts/marketplace/catalogs/domain/Catalog';
import { CatalogIdMother } from '../../shared/domain/catalogs/CatalogIdMother';
import { CreateCatalogCommandMother } from '../application/CreateCatalogCommandMother';
import { CatalogMother } from './CatalogMother';
import { CatalogNameMother } from './CatalogNameMother';

describe('Catalog', () => {
  it('should return a new catalog instance', () => {
    const command = CreateCatalogCommandMother.random();

    const catalog = CatalogMother.fromCommand(command);

    expect(catalog.id.value).toBe(command.id);
    expect(catalog.name.value).toBe(command.name);
  });

  it('should record a CatalogCreatedDomainEvent after its creation', () => {
    const catalog = Catalog.create(CatalogIdMother.random(), CatalogNameMother.random());

    const events = catalog.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('catalog.created');
  });
});
