import { DomainEventClass } from '../../../../shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/DomainEventSubscriber';
import { EmailAddress } from '../../domain/EmailAddress';
import { UserRegisteredDomainEvent } from '../../domain/UserRegisteredDomainEvent';
import SendWelcomeUserEmail from './SendWelcomeUserEmail';

export default class SendWelcomeUserEmailOnUserRegistered implements DomainEventSubscriber<UserRegisteredDomainEvent> {
  constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail) {}

  subscribedTo(): DomainEventClass[] {
    return [UserRegisteredDomainEvent];
  }

  async on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
    const userEmailAddress = new EmailAddress(domainEvent.userEmailAddress);
    await this.sendWelcomeUserEmail.run(userEmailAddress);
  }
}
