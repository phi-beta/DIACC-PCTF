"use strict";
/**
 * DIACC PCTF Implementation - Main Entry Point
 *
 * This module provides implementations of the Digital Identity and Authentication
 * Council of Canada (DIACC) Pan-Canadian Trust Framework (PCTF) components.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCTF_VERSION = exports.PCTF_COMPONENTS = exports.PCTFFramework = void 0;
// Core types and interfaces
__exportStar(require("./shared/types"), exports);
// PCTF Components
__exportStar(require("./authentication"), exports);
__exportStar(require("./verified-person"), exports);
__exportStar(require("./privacy"), exports);
__exportStar(require("./infrastructure"), exports);
__exportStar(require("./digital-wallet"), exports);
__exportStar(require("./trust-registry"), exports);
// Framework orchestrator
var framework_1 = require("./shared/framework");
Object.defineProperty(exports, "PCTFFramework", { enumerable: true, get: function () { return framework_1.PCTFFramework; } });
/**
 * PCTF Component Registry
 */
exports.PCTF_COMPONENTS = {
    AUTHENTICATION: 'PCTF03',
    VERIFIED_PERSON: 'PCTF05',
    PRIVACY: 'PCTF04',
    INFRASTRUCTURE: 'PCTF08',
    DIGITAL_WALLET: 'PCTF12',
    TRUST_REGISTRIES: 'PCTF13',
    CREDENTIALS: 'PCTF07',
    VERIFIED_ORGANIZATION: 'PCTF06',
    NOTICE_CONSENT: 'PCTF02'
};
/**
 * PCTF Version Information
 */
exports.PCTF_VERSION = {
    FRAMEWORK_VERSION: '1.0.0',
    IMPLEMENTATION_VERSION: '1.0.0',
    LAST_UPDATED: '2025-07-03'
};
//# sourceMappingURL=index.js.map