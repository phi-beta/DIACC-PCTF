/**
 * DIACC PCTF03 - Authentication Component
 * Describes how verifying identity allows access to digital systems
 */
import { AssuranceLevel, ProcessResult, ConformanceCriteria, CredentialStatus } from './types';
/**
 * Authentication Service Provider implementing PCTF03 requirements
 */
export declare class AuthenticationServiceProvider {
    private participantId;
    private name;
    private assuranceLevel;
    private credentials;
    constructor(participantId: string, name: string, assuranceLevel: AssuranceLevel);
    /**
     * Trusted Process: Credential Issuance
     * Issues authentication credentials to verified subjects
     */
    issueCredential(subjectId: string, credentialType: CredentialType): Promise<ProcessResult>;
    /**
     * Trusted Process: Authentication
     * Verifies credentials and establishes subject identity
     */
    authenticate(credentialId: string, authenticationFactor: string): Promise<ProcessResult>;
    /**
     * Trusted Process: Session Initiation
     * Establishes authenticated sessions with appropriate security controls
     */
    initiateSession(subjectId: string, sessionParameters: SessionParameters): Promise<ProcessResult>;
    /**
     * Trusted Process: Credential Suspension/Recovery/Maintenance/Revocation
     */
    suspendCredential(credentialId: string, reason: string): Promise<ProcessResult>;
    revokeCredential(credentialId: string, reason: string): Promise<ProcessResult>;
    /**
     * Get conformance criteria for Authentication component
     */
    getConformanceCriteria(): ConformanceCriteria[];
    private generateCredentialId;
    private generateSessionId;
    private calculateExpirationDate;
    private validateAuthenticationFactor;
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
}
/**
 * Authentication Session class
 */
export declare class AuthenticationSession {
    sessionId: string;
    subjectId: string;
    assuranceLevel: AssuranceLevel;
    initiatedAt: Date;
    expiresAt: Date;
    isActive: boolean;
    constructor(sessionId: string, subjectId: string, assuranceLevel: AssuranceLevel, initiatedAt: Date, maxDuration: number);
    terminate(): void;
    isExpired(): boolean;
}
/**
 * Credential types supported
 */
export declare enum CredentialType {
    PASSWORD = "PASSWORD",
    BIOMETRIC = "BIOMETRIC",
    CERTIFICATE = "CERTIFICATE",
    TOKEN = "TOKEN",
    SMARTCARD = "SMARTCARD"
}
/**
 * Session parameters for session initiation
 */
export interface SessionParameters {
    assuranceLevel: AssuranceLevel;
    maxDuration: number;
    allowConcurrentSessions?: boolean;
    requireReauthentication?: boolean;
}
//# sourceMappingURL=authentication.d.ts.map