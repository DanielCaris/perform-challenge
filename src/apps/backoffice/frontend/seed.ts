import { CoursesCounterRepository } from '../../../Contexts/Marketplace/CoursesCounter/domain/CoursesCounterRepository';
import { CoursesCounter } from '../../../Contexts/Marketplace/CoursesCounter/domain/CoursesCounter';
import { CoursesCounterId } from '../../../Contexts/Marketplace/CoursesCounter/domain/CoursesCounterId';
import container from './dependency-injection';

export async function seed() {
  const repository: CoursesCounterRepository = container.get('Marketplace.coursesCounter.CoursesCounterRepository');
  const logger = container.get('Shared.Logger');

  const alreadyExists = await repository.search();

  if (!alreadyExists) {
    logger.info('[Seed] Initializing CourseCounter');
    const courseCounter = CoursesCounter.initialize(CoursesCounterId.random());
    await repository.save(courseCounter);
  }
}
