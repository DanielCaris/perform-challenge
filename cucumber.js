const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature',
  '--require tests/apps/backoffice/backend/features/step_definitions/*.steps.ts'
].join(' ');
const marketplace_backend = [
  ...common,
  'tests/apps/marketplace/backend/features/**/*.feature',
  '--require tests/apps/marketplace/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  backoffice_backend,
  marketplace_backend
};
