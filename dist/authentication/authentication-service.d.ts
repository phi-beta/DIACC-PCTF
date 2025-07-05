/**
 * DIACC PCTF03 - Authentication Component
 * Describes how verifying identity allows access to digital systems
 */
import { AssuranceLevel, ProcessResult, ConformanceCriteria } from '../shared/types';
import { CredentialType } from './authentication-credential';
import { SessionParameters } from './authentication-session';
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
//# sourceMappingURL=authentication-service.d.ts.map