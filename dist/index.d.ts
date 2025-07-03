/**
 * DIACC PCTF Implementation - Main Entry Point
 *
 * This module provides implementations of the Digital Identity and Authentication
 * Council of Canada (DIACC) Pan-Canadian Trust Framework (PCTF) components.
 */
export * from './types';
export * from './authentication';
export * from './verified-person';
export * from './privacy';
export { PCTFFramework } from './framework';
/**
 * PCTF Component Registry
 */
export declare const PCTF_COMPONENTS: {
    readonly AUTHENTICATION: "PCTF03";
    readonly VERIFIED_PERSON: "PCTF05";
    readonly PRIVACY: "PCTF04";
    readonly INFRASTRUCTURE: "PCTF08";
    readonly DIGITAL_WALLET: "PCTF12";
    readonly TRUST_REGISTRIES: "PCTF13";
    readonly CREDENTIALS: "PCTF07";
    readonly VERIFIED_ORGANIZATION: "PCTF06";
    readonly NOTICE_CONSENT: "PCTF02";
};
/**
 * PCTF Version Information
 */
export declare const PCTF_VERSION: {
    readonly FRAMEWORK_VERSION: "1.0.0";
    readonly IMPLEMENTATION_VERSION: "1.0.0";
    readonly LAST_UPDATED: "2025-07-03";
};
//# sourceMappingURL=index.d.ts.map