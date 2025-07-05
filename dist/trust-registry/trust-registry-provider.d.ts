/**
 * DIACC PCTF Trust Registry Service (PCTF13)
 * Provides ecosystem participant verification and trust establishment
 */
import { AssuranceLevel, ConformanceCriteria, TrustedProcess, ProcessResult, ProcessStatus, ParticipantType } from '../shared/types';
/**
 * Trust status levels
 */
export declare enum TrustStatus {
    TRUSTED = "TRUSTED",
    PROVISIONAL = "PROVISIONAL",
    SUSPENDED = "SUSPENDED",
    REVOKED = "REVOKED",
    UNKNOWN = "UNKNOWN"
}
/**
 * Trust registry entry interface
 */
export interface TrustRegistryEntry {
    participantId: string;
    name: string;
    type: ParticipantType;
    status: TrustStatus;
    assuranceLevel: AssuranceLevel;
    certifications: TrustCertification[];
    registrationDate: Date;
    lastVerified: Date;
    expirationDate?: Date;
    trustScore: number;
    governanceFramework: string;
    contactInformation: TrustRegistryContactInfo;
    publicKeys: PublicKeyInfo[];
}
/**
 * Trust certification interface
 */
export interface TrustCertification {
    certificationId: string;
    issuingAuthority: string;
    certificationStandard: string;
    issuanceDate: Date;
    expirationDate?: Date;
    scope: string[];
    status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'REVOKED';
}
/**
 * Trust registry contact information interface
 */
export interface TrustRegistryContactInfo {
    organizationName: string;
    contactPerson: string;
    email: string;
    phone?: string;
    address: {
        street: string;
        city: string;
        province: string;
        postalCode: string;
        country: string;
    };
    website?: string;
}
/**
 * Public key information interface
 */
export interface PublicKeyInfo {
    keyId: string;
    keyType: string;
    publicKey: string;
    usage: string[];
    validFrom: Date;
    validUntil?: Date;
    algorithm: string;
}
/**
 * Trust verification request interface
 */
export interface TrustVerificationRequest {
    participantId: string;
    requestedBy: string;
    verificationScope: string[];
    requestDate: Date;
}
/**
 * Trust verification result interface
 */
export interface TrustVerificationResult {
    participantId: string;
    trustStatus: TrustStatus;
    trustScore: number;
    verificationDate: Date;
    verificationDetails: {
        criteriaChecked: string[];
        passed: string[];
        failed: string[];
        warnings: string[];
    };
    validity: {
        validFrom: Date;
        validUntil: Date;
    };
}
/**
 * Trust Registry Service Provider
 * Implements PCTF13 - Trust Registry component
 */
export declare class TrustRegistryProvider implements TrustedProcess {
    readonly processId: string;
    readonly name: string;
    readonly description: string;
    status: ProcessStatus;
    readonly assuranceLevel: AssuranceLevel;
    private registryId;
    private governanceFramework;
    private trustEntries;
    private verificationHistory;
    constructor(registryId: string, name: string, governanceFramework?: string, assuranceLevel?: AssuranceLevel);
    /**
     * Execute trust registry process
     */
    executeProcess(): Promise<ProcessResult>;
    /**
     * Register a participant in the trust registry
     */
    registerParticipant(entry: TrustRegistryEntry): Promise<ProcessResult>;
    /**
     * Verify trust status of a participant
     */
    verifyTrust(request: TrustVerificationRequest): Promise<ProcessResult>;
    /**
     * Get trust registry entry for a participant
     */
    getTrustEntry(participantId: string): TrustRegistryEntry | undefined;
    /**
     * Search trust registry by criteria
     */
    searchTrustRegistry(criteria: {
        type?: ParticipantType;
        status?: TrustStatus;
        assuranceLevel?: AssuranceLevel;
        minTrustScore?: number;
    }): TrustRegistryEntry[];
    /**
     * Update participant status
     */
    updateParticipantStatus(participantId: string, status: TrustStatus, reason: string): Promise<ProcessResult>;
    /**
     * Get verification history for a participant
     */
    getVerificationHistory(participantId: string): TrustVerificationResult[];
    /**
     * Get conformance criteria for trust registry
     */
    getConformanceCriteria(): ConformanceCriteria[];
    /**
     * Validate input data
     */
    validateInput(input: any): boolean;
    /**
     * Log activity
     */
    logActivity(activity: string): void;
    private validateRegistryIntegrity;
    private updateTrustScores;
    private processExpiredEntries;
    private validateCertifications;
    private performTrustVerification;
    private calculateTrustScore;
}
//# sourceMappingURL=trust-registry-provider.d.ts.map