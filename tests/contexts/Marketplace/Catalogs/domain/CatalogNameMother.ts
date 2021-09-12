import { CatalogName } from '../../../../../src/contexts/Marketplace/Catalogs/domain/CatalogName';
import { WordMother } from '../../../Shared/domain/WordMother';

export class CatalogNameMother {
  static create(value: string): CatalogName {
    return new CatalogName(value);
  }

  static random(): CatalogName {
    return this.create(WordMother.random());
  }
}
