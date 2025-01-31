/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CustomIntegrationRegistry } from './custom_integration_registry';
import { loggerMock, MockedLogger } from '@kbn/logging/mocks';
import { CustomIntegration } from '../common';

describe('CustomIntegrationsRegistry', () => {
  let mockLogger: MockedLogger;

  const integration: CustomIntegration = {
    id: 'foo',
    title: 'Foo',
    description: 'test integration',
    type: 'ui_link',
    uiInternalPath: '/path/to/foo',
    isBeta: false,
    icons: [],
    categories: ['upload_file'],
    shipper: 'tests',
  };

  beforeEach(() => {
    mockLogger = loggerMock.create();
  });

  describe('register', () => {
    describe('should log to console on duplicate id', () => {
      test('with an error in dev', () => {
        const registry = new CustomIntegrationRegistry(mockLogger, true);
        registry.registerCustomIntegration(integration);
        registry.registerCustomIntegration(integration);
        expect(mockLogger.error.mock.calls.length).toBe(1);
      });
      test('with a debug in prod', () => {
        const registry = new CustomIntegrationRegistry(mockLogger, false);
        registry.registerCustomIntegration(integration);
        registry.registerCustomIntegration(integration);
        expect(mockLogger.debug.mock.calls.length).toBe(1);
      });
    });
  });

  describe('getAppendCustomCategories', () => {
    test('should  return', () => {
      const registry = new CustomIntegrationRegistry(mockLogger, true);
      registry.registerCustomIntegration(integration);
      registry.registerCustomIntegration({ ...integration, id: 'bar' });
      expect(registry.getAppendCustomIntegrations()).toEqual([
        {
          categories: ['upload_file'],
          description: 'test integration',
          icons: [],
          id: 'foo',
          isBeta: false,
          shipper: 'tests',
          title: 'Foo',
          type: 'ui_link',
          uiInternalPath: '/path/to/foo',
        },
        {
          categories: ['upload_file'],
          description: 'test integration',
          icons: [],
          id: 'bar',
          isBeta: false,
          shipper: 'tests',
          title: 'Foo',
          type: 'ui_link',
          uiInternalPath: '/path/to/foo',
        },
      ]);
    });
    test('should ignore duplicate ids', () => {
      const registry = new CustomIntegrationRegistry(mockLogger, true);
      registry.registerCustomIntegration(integration);
      registry.registerCustomIntegration(integration);
      expect(registry.getAppendCustomIntegrations()).toEqual([
        {
          categories: ['upload_file'],
          description: 'test integration',
          icons: [],
          id: 'foo',
          isBeta: false,
          shipper: 'tests',
          title: 'Foo',
          type: 'ui_link',
          uiInternalPath: '/path/to/foo',
        },
      ]);
    });
    test('should ignore integrations without category', () => {
      const registry = new CustomIntegrationRegistry(mockLogger, true);
      registry.registerCustomIntegration(integration);
      registry.registerCustomIntegration({ ...integration, id: 'bar', categories: [] });

      expect(registry.getAppendCustomIntegrations()).toEqual([
        {
          categories: ['upload_file'],
          description: 'test integration',
          icons: [],
          id: 'foo',
          isBeta: false,
          shipper: 'tests',
          title: 'Foo',
          type: 'ui_link',
          uiInternalPath: '/path/to/foo',
        },
      ]);
    });
  });
});
