import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';

import container from '../../../../../src/apps/backend/dependency-injection';
import { MarketplaceBackendApp } from '../../../../../src/apps/backend/MarketplaceBackendApp';
import { EnvironmentArranger } from '../../../../contexts/shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;
let application: MarketplaceBackendApp;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).put(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepEqual(_response.body, JSON.parse(response));
});

BeforeAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Marketplace.EnvironmentArranger');
  await (await environmentArranger).arrange();
  application = new MarketplaceBackendApp();
  await application.start();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Marketplace.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});
