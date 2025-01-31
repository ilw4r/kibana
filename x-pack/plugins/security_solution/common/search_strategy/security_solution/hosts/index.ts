/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export * from './all';
export * from './authentications';
export * from './common';
export * from './details';
export * from './first_last_seen';
export * from './kpi';
export * from './risky_hosts';
export * from './overview';
export * from './uncommon_processes';

export enum HostsQueries {
  authentications = 'authentications',
  authenticationsEntities = 'authenticationsEntities',
  details = 'hostDetails',
  firstOrLastSeen = 'firstOrLastSeen',
  hosts = 'hosts',
  hostsEntities = 'hostsEntities',
  overview = 'overviewHost',
  riskyHosts = 'riskyHosts',
  uncommonProcesses = 'uncommonProcesses',
}
