import backendBackofficecontainer from '../../../../src/apps/backoffice/backend/dependency-injection';
import { seed } from '../../../../src/apps/backoffice/frontend/seed';
import marketplaceContainer from '../../../../src/apps/marketplace/backend/dependency-injection';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

const marketplaceEnvironmentArranger: Promise<EnvironmentArranger> = marketplaceContainer.get('Marketplace.EnvironmentArranger');
const BackofficeBackendEnvironmentArranger: Promise<EnvironmentArranger> = backendBackofficecontainer.get(
  'Backoffice.Backend.EnvironmentArranger'
);

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  on('task', {
    async 'reset:marketplace:db'() {
      await (await marketplaceEnvironmentArranger).arrange();
      await seed();
      return null;
    },

    async 'reset:backoffice:db'() {
      await (await BackofficeBackendEnvironmentArranger).arrange();
      return null;
    }
  });
};
