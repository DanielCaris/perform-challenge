import { DomainEvent } from '../../../../src/contexts/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../src/contexts/shared/domain/DomainEventSubscriber';
import { Uuid } from '../../../../src/contexts/shared/domain/value-object/Uuid';
import { InMemoryAsyncEventBus } from '../../../../src/contexts/shared/infrastructure/event-bus/in-memory/InMemoryAsyncEventBus';

describe('InMemoryAsyncEventBus', () => {
  let subscriber: DomainEventSubscriberDummy;
  let eventBus: InMemoryAsyncEventBus;

  beforeAll(() => {});

  it('the subscriber should be called when the event it is subscribed to is published', done => {
    const event = new DummyEvent(Uuid.random().value);
    subscriber = new DomainEventSubscriberDummy();
    subscriber.on = async () => {
      done();
    };

    eventBus = new InMemoryAsyncEventBus([subscriber]);

    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent {
  static EVENT_NAME = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.EVENT_NAME, id);
  }

  toPrimitive(): Object {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo(): any[] {
    return [DummyEvent];
  }

  async on(domainEvent: DummyEvent) {
    console.log(domainEvent);
  }
}
