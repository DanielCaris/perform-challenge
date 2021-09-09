import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { CoursesCounterFinder } from './CoursesCounterFinder';
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery';
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse';

export class FindCoursesCounterQueryHandler
  implements QueryHandler<FindCoursesCounterQuery, FindCoursesCounterResponse>
{
  constructor(private finder: CoursesCounterFinder) {}

  subscribedTo(): Query {
    return FindCoursesCounterQuery;
  }
  handle(_query: FindCoursesCounterQuery): Promise<FindCoursesCounterResponse> {
    return this.finder.run();
  }
}
