import { Given } from 'cucumber';
import { Definition } from 'node-dependency-injection';

import container from '../../../../../src/apps/backend/dependency-injection';
import { DomainEvent } from '../../../../../src/contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../src/contexts/Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../../src/contexts/Shared/domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../../src/contexts/shared/infrastructure/event-bus/DomainEventJsonDeserializer';
import { DomainEventMapping } from '../../../../../src/contexts/shared/infrastructure/event-bus/DomainEventMapping';

const eventBus = container.get('Shared.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<string, Definition>;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  const domainEventMapping = new DomainEventMapping(subscribers);

  return new DomainEventJsonDeserializer(domainEventMapping);
}
