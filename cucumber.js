const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const marketplace_backend = [
  ...common,
  'tests/apps/marketplace/backend/features/**/*.feature',
  '--require tests/apps/marketplace/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  marketplace_backend
};
