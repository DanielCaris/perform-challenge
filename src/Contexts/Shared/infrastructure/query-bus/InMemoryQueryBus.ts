import { Query } from '../../domain/Query';
import { QueryBus } from '../../domain/QueryBus';
import { Response } from '../../domain/Response';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }
}
