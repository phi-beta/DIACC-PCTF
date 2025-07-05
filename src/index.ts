/**
 * DIACC PCTF Implementation - Main Entry Point
 * 
 * This module provides implementations of the Digital Identity and Authentication
 * Council of Canada (DIACC) Pan-Canadian Trust Framework (PCTF) components.
 */

// Core types and interfaces
export * from './shared/types';

// PCTF Components
export * from './authentication';
export * from './verified-person';
export * from './privacy';
export * from './infrastructure';
export * from './digital-wallet';
export * from './trust-registry';

// Framework orchestrator
export { PCTFFramework } from './shared/framework';

/**
 * PCTF Component Registry
 */
export const PCTF_COMPONENTS = {
  AUTHENTICATION: 'PCTF03',
  VERIFIED_PERSON: 'PCTF05', 
  PRIVACY: 'PCTF04',
  INFRASTRUCTURE: 'PCTF08',
  DIGITAL_WALLET: 'PCTF12',
  TRUST_REGISTRIES: 'PCTF13',
  CREDENTIALS: 'PCTF07',
  VERIFIED_ORGANIZATION: 'PCTF06',
  NOTICE_CONSENT: 'PCTF02'
} as const;

/**
 * PCTF Version Information
 */
export const PCTF_VERSION = {
  FRAMEWORK_VERSION: '1.0.0',
  IMPLEMENTATION_VERSION: '1.0.0',
  LAST_UPDATED: '2025-07-03'
} as const;
