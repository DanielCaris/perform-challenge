import { BackofficeBackendApp } from '../../../src/apps/backoffice/backend/BackofficeBackendApp';
import { BackofficeFrontendApp } from '../../../src/apps/backoffice/frontend/BackofficeFrontendApp';
import { MarketplaceBackendApp } from '../../../src/apps/marketplace/backend/MarketplaceBackendApp';

export class Applications {
  private static backofficeBackend: BackofficeBackendApp;
  private static backofficeFrontend: BackofficeFrontendApp;
  private static marketplace: MarketplaceBackendApp;

  static async start() {
    this.backofficeBackend = new BackofficeBackendApp();
    this.backofficeFrontend = new BackofficeFrontendApp();
    this.marketplace = new MarketplaceBackendApp();

    await this.marketplace.start();
    await this.backofficeBackend.start();
    await this.backofficeFrontend.start();

    return this.backofficeFrontend.port;
  }

  static async stop() {
    await this.marketplace.stop();
    await this.backofficeBackend.stop();
    await this.backofficeFrontend.stop();
  }
}
