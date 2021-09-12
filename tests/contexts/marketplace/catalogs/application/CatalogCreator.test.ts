import { CatalogCreator } from '../../../../../src/contexts/marketplace/catalogs/application/CatalogCreator';
import { CreateCatalogCommandHandler } from '../../../../../src/contexts/marketplace/catalogs/application/CreateCatalogCommandHandler';
import { CatalogRepositoryMock } from '../__mocks__/CatalogRepositoryMock';
import EventBusMock from '../__mocks__/EventBusMock';
import { CatalogMother } from '../domain/CatalogMother';
import { CreateCatalogCommandMother } from './CreateCatalogCommandMother';

let repository: CatalogRepositoryMock;
let handler: CreateCatalogCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CatalogRepositoryMock();
  const creator = new CatalogCreator(repository, eventBus);
  handler = new CreateCatalogCommandHandler(creator);
});

describe('CatalogCreator', () => {
  it('should create a valid catalog', async () => {
    const command = CreateCatalogCommandMother.random();
    await handler.handle(command);

    const catalog = CatalogMother.fromCommand(command);
    repository.assertLastSavedCatalogIs(catalog);
  });
});
