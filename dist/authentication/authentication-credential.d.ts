/**
 * Authentication Credential
 * Represents a credential issued by an Authentication Service Provider
 */
import { AssuranceLevel, CredentialStatus } from '../shared/types';
export declare enum CredentialType {
    PASSWORD = "PASSWORD",
    BIOMETRIC = "BIOMETRIC",
    CERTIFICATE = "CERTIFICATE",
    TOKEN = "TOKEN",
    SMARTCARD = "SMARTCARD"
}
/**
 * Authentication Credential class
 */
export declare class AuthenticationCredential {
    credentialId: string;
    subjectId: string;
    credentialType: CredentialType;
    assuranceLevel: AssuranceLevel;
    issuedAt: Date;
    expiresAt: Date;
    status: CredentialStatus;
    lastUsed?: Date;
    suspensionReason?: string;
    revocationReason?: string;
    revokedAt?: Date;
    constructor(credentialId: string, subjectId: string, credentialType: CredentialType, assuranceLevel: AssuranceLevel, issuedAt: Date, expiresAt: Date);
    isExpired(): boolean;
    suspend(reason: string): void;
    revoke(reason: string): void;
    reactivate(): void;
    updateLastUsed(): void;
}
//# sourceMappingURL=authentication-credential.d.ts.map