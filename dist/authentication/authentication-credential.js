"use strict";
/**
 * Authentication Credential
 * Represents a credential issued by an Authentication Service Provider
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationCredential = exports.CredentialType = void 0;
const types_1 = require("../shared/types");
var CredentialType;
(function (CredentialType) {
    CredentialType["PASSWORD"] = "PASSWORD";
    CredentialType["BIOMETRIC"] = "BIOMETRIC";
    CredentialType["CERTIFICATE"] = "CERTIFICATE";
    CredentialType["TOKEN"] = "TOKEN";
    CredentialType["SMARTCARD"] = "SMARTCARD";
})(CredentialType || (exports.CredentialType = CredentialType = {}));
/**
 * Authentication Credential class
 */
class AuthenticationCredential {
    constructor(credentialId, subjectId, credentialType, assuranceLevel, issuedAt, expiresAt) {
        this.credentialId = credentialId;
        this.subjectId = subjectId;
        this.credentialType = credentialType;
        this.assuranceLevel = assuranceLevel;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
        this.status = types_1.CredentialStatus.ACTIVE;
    }
    isExpired() {
        return new Date() > this.expiresAt;
    }
    suspend(reason) {
        this.status = types_1.CredentialStatus.SUSPENDED;
        this.suspensionReason = reason;
    }
    revoke(reason) {
        this.status = types_1.CredentialStatus.REVOKED;
        this.revocationReason = reason;
        this.revokedAt = new Date();
    }
    reactivate() {
        if (this.status === types_1.CredentialStatus.SUSPENDED) {
            this.status = types_1.CredentialStatus.ACTIVE;
            this.suspensionReason = undefined;
        }
    }
    updateLastUsed() {
        this.lastUsed = new Date();
    }
}
exports.AuthenticationCredential = AuthenticationCredential;
//# sourceMappingURL=authentication-credential.js.map