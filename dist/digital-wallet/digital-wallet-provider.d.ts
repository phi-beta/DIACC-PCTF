/**
 * DIACC PCTF Digital Wallet Service (PCTF12)
 * Provides digital identity and asset management
 */
import { AssuranceLevel, ConformanceCriteria, TrustedProcess, ProcessResult, ProcessStatus, CredentialStatus } from '../shared/types';
/**
 * Digital wallet types
 */
export declare enum WalletType {
    MOBILE = "MOBILE",
    WEB = "WEB",
    HARDWARE = "HARDWARE",
    CLOUD = "CLOUD",
    HYBRID = "HYBRID"
}
/**
 * Wallet security features
 */
export declare enum SecurityFeature {
    BIOMETRIC_AUTH = "BIOMETRIC_AUTH",
    MULTI_FACTOR_AUTH = "MULTI_FACTOR_AUTH",
    HARDWARE_SECURITY_MODULE = "HARDWARE_SECURITY_MODULE",
    SECURE_ENCLAVE = "SECURE_ENCLAVE",
    END_TO_END_ENCRYPTION = "END_TO_END_ENCRYPTION"
}
/**
 * Digital credential interface
 */
export interface DigitalCredential {
    credentialId: string;
    issuer: string;
    subject: string;
    type: string[];
    issuanceDate: Date;
    expirationDate?: Date;
    status: CredentialStatus;
    claims: Record<string, any>;
    proof: CredentialProof;
    metadata: CredentialMetadata;
}
/**
 * Credential proof interface
 */
export interface CredentialProof {
    type: string;
    created: Date;
    verificationMethod: string;
    signature: string;
    nonce?: string;
}
/**
 * Credential metadata interface
 */
export interface CredentialMetadata {
    schemaId: string;
    version: string;
    trustFramework: string;
    assuranceLevel: AssuranceLevel;
    revocationMethod?: string;
}
/**
 * Wallet operation types
 */
export declare enum WalletOperation {
    STORE_CREDENTIAL = "STORE_CREDENTIAL",
    RETRIEVE_CREDENTIAL = "RETRIEVE_CREDENTIAL",
    PRESENT_CREDENTIAL = "PRESENT_CREDENTIAL",
    REVOKE_CREDENTIAL = "REVOKE_CREDENTIAL",
    BACKUP_WALLET = "BACKUP_WALLET",
    RESTORE_WALLET = "RESTORE_WALLET"
}
/**
 * Wallet activity log entry
 */
export interface WalletActivity {
    activityId: string;
    operation: WalletOperation;
    credentialId?: string;
    timestamp: Date;
    result: 'SUCCESS' | 'FAILURE';
    details: string;
    userAgent?: string;
    ipAddress?: string;
}
/**
 * Digital Wallet Provider
 * Implements PCTF12 - Digital Wallet component
 */
export declare class DigitalWalletProvider implements TrustedProcess {
    readonly processId: string;
    readonly name: string;
    readonly description: string;
    status: ProcessStatus;
    readonly assuranceLevel: AssuranceLevel;
    private walletId;
    private walletType;
    private ownerId;
    private securityFeatures;
    private credentials;
    private activityLog;
    private isLocked;
    constructor(walletId: string, ownerId: string, walletType: WalletType, name: string, assuranceLevel?: AssuranceLevel);
    /**
     * Execute wallet process
     */
    executeProcess(): Promise<ProcessResult>;
    /**
     * Unlock wallet with authentication
     */
    unlockWallet(authenticationProof: any): Promise<ProcessResult>;
    /**
     * Store a digital credential in the wallet
     */
    storeCredential(credential: DigitalCredential): Promise<ProcessResult>;
    /**
     * Retrieve a credential from the wallet
     */
    retrieveCredential(credentialId: string): Promise<ProcessResult>;
    /**
     * Present credentials for verification
     */
    presentCredentials(credentialIds: string[], presentationRequest: any): Promise<ProcessResult>;
    /**
     * Get wallet activity log
     */
    getActivityLog(limit?: number): WalletActivity[];
    /**
     * Get all stored credentials
     */
    getAllCredentials(): DigitalCredential[];
    /**
     * Get conformance criteria for digital wallet
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
    private getDefaultSecurityFeatures;
    private validateSecurity;
    private validateCredentials;
    private validateAuthentication;
    private verifyCredentialProof;
    private logWalletActivity;
}
//# sourceMappingURL=digital-wallet-provider.d.ts.map