import { Email } from '../domain/Email';
import { EmailSender } from '../domain/EmailSender';

export default class FakeEmailSender implements EmailSender {
  async send(email: Email): Promise<void> {
    // do nothing
  }
}
