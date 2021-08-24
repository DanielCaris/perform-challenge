import { CoursesCounterTotal } from '../../../../../src/Contexts/Marketplace/CoursesCounter/domain/CoursesCounterTotal';
import { FindCoursesCounterResponse } from '../../../../../src/Contexts/Marketplace/CoursesCounter/application/Find/FindCoursesCounterResponse';

export class CoursesCounterResponseMother {
  static create(total: CoursesCounterTotal) {
    return new FindCoursesCounterResponse(total.value);
  }
}
