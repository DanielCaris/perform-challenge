import container from '../../../../../src/apps/marketplace/backend/dependency-injection';
import { CoursesCounterRepository } from '../../../../../src/Contexts/Marketplace/CoursesCounter/domain/CoursesCounterRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { CoursesCounterMother } from '../domain/CoursesCounterMother';

const environmentArranger: Promise<EnvironmentArranger> = container.get('Marketplace.EnvironmentArranger');
const repository: CoursesCounterRepository = container.get('Marketplace.coursesCounter.CoursesCounterRepository');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('CoursesCounterRepository', () => {
  describe('#save', () => {
    it('should save a courses counter', async () => {
      const course = CoursesCounterMother.random();

      await repository.save(course);
    });
  });

  describe('#search', () => {
    it('should return an existing course', async () => {
      const expectedCounter = CoursesCounterMother.random();
      await repository.save(expectedCounter);

      const counter = await repository.search();

      expect(expectedCounter).toEqual(counter);
    });

    it('should not return null if there is no courses counter', async () => {
      expect(await repository.search()).toBeFalsy();
    });
  });
});
