import faker from 'faker';

import SendWelcomeUserEmail from '../../../../../../src/contexts/marketplace/notifications/application/send-welcome-user-email/SendWelcomeUserEmail';
import SendWelcomeUserEmailOnUserRegistered from '../../../../../../src/contexts/marketplace/notifications/application/send-welcome-user-email/SendWelcomeUserEmailOnUserRegistered';
import { Email } from '../../../../../../src/contexts/marketplace/notifications/domain/Email';
import { EmailAddress } from '../../../../../../src/contexts/marketplace/notifications/domain/EmailAddress';
import { EmailSender } from '../../../../../../src/contexts/marketplace/notifications/domain/EmailSender';
import { UserRegisteredDomainEvent } from '../../../../../../src/contexts/marketplace/notifications/domain/UserRegisteredDomainEvent';
import { WelcomeUserEmail } from '../../../../../../src/contexts/marketplace/notifications/domain/WelcomeUserEmail';
import { WelcomeUserEmailError } from '../../../../../../src/contexts/marketplace/notifications/domain/WelcomeUserEmailError';
import { UuidMother } from '../../../../shared/domain/UuidMother';
import { EmailSenderMock } from '../../__mocks__/EmailSenderMock';

describe('SendWelcomeUserEmailOnUserRegistered event handler', () => {
  it('sends a welcome email to the user', async () => {
    const emailSenderMock = new EmailSenderMock();
    const sendWelcomeUserEmail = new SendWelcomeUserEmail(emailSenderMock);
    const sendWelcomeUserEmailOnUserRegistered = new SendWelcomeUserEmailOnUserRegistered(sendWelcomeUserEmail);
    const userEmailAddress = anEmailAddress();
    const domainEvent = aDomainEventWithEmailAddress(userEmailAddress);

    await sendWelcomeUserEmailOnUserRegistered.on(domainEvent);

    const lastEmailSent = emailSenderMock.lastEmailSent();
    emailSenderMock.assertSentTimes(1);
    expect(lastEmailSent).toBeInstanceOf(WelcomeUserEmail);
    expect(lastEmailSent.to).toEqual(userEmailAddress);
  });

  it('throws a WelcomeUserEmailError if the emailSender fails', async () => {
    const failingEmailSender = aFailingEmailSender();
    const sendWelcomeUserEmail = new SendWelcomeUserEmail(failingEmailSender);
    const sendWelcomeUserEmailOnUserRegistered = new SendWelcomeUserEmailOnUserRegistered(sendWelcomeUserEmail);

    const domainEvent = aDomainEventWithEmailAddress(anEmailAddress());
    await expect(sendWelcomeUserEmailOnUserRegistered.on(domainEvent)).rejects.toBeInstanceOf(WelcomeUserEmailError);
  });
});

function aFailingEmailSender() {
  return {
    async send(email: Email) {
      throw new Error('some error');
    }
  } as EmailSender;
}

function anEmailAddress(): EmailAddress {
  return new EmailAddress(faker.internet.email());
}

function aDomainEventWithEmailAddress(emailAddress: EmailAddress) {
  return new UserRegisteredDomainEvent({
    id: UuidMother.random(),
    userEmailAddress: emailAddress.value
  });
}
