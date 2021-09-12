import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCatalogDomainEventBody = {
  readonly id: string;
  readonly name: string;
  readonly eventName: string;
};

export class CatalogCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'catalog.created';

  readonly name: string;

  constructor({ id, name, eventId, occurredOn }: { id: string; eventId?: string; name: string; occurredOn?: Date }) {
    super(CatalogCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.name = name;
  }

  toPrimitive(): CreateCatalogDomainEventBody {
    const { name, aggregateId } = this;
    return {
      name,
      eventName: CatalogCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateCatalogDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new CatalogCreatedDomainEvent({
      id: aggregateId,
      name: body.name,
      eventId,
      occurredOn
    });
  }
}
