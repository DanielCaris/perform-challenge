import { Definition } from 'node-dependency-injection';

import { DomainEvent } from '../../contexts/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../contexts/shared/domain/DomainEventSubscriber';
import { EventBus } from '../../contexts/shared/domain/EventBus';
import { DomainEventMapping } from '../../contexts/shared/infrastructure/event-bus/DomainEventMapping';
import container from './dependency-injection';
import { Server } from './server';

export class MarketplaceBackendApp {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus;
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<string, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}
