/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { SourceRegistryEntry } from '../classes/sources/source_registry';
import type { LayerWizard } from '../classes/layers/layer_wizard_registry';

export interface MapsSetupApi {
  registerLayerWizard(layerWizard: LayerWizard): Promise<void>;
  registerSource(entry: SourceRegistryEntry): Promise<void>;
}
