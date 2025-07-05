/**
 * DIACC PCTF05 - Verified Person Component
 * Describes identity proofing, linking a subject accessing online services to a real-life person
 */
import { AssuranceLevel, ProcessResult, ProcessStatus, ConformanceCriteria, EvidenceType } from './shared/types';
/**
 * Identity Provider implementing PCTF05 requirements
 */
export declare class IdentityProvider {
    private providerId;
    private name;
    private assuranceLevel;
    private verifiedPersons;
    private identityProofingSessions;
    constructor(providerId: string, name: string, assuranceLevel: AssuranceLevel);
    /**
     * Trusted Process: Establishing Sources of Identity Evidence
     * Determines and validates acceptable sources of identity evidence
     */
    establishEvidenceSources(evidenceRequirements: EvidenceRequirement[]): Promise<ProcessResult>;
    /**
     * Trusted Process: Identity Resolution
     * Determines if the collected identity information refers to a real person
     */
    performIdentityResolution(identityInformation: IdentityInformation): Promise<ProcessResult>;
    /**
     * Trusted Process: Identity Establishment
     * Creates a unique digital identity representation for the verified person
     */
    establishIdentity(personId: string, identityInformation: IdentityInformation, evidencePackage: EvidencePackage): Promise<ProcessResult>;
    /**
     * Trusted Process: Validating Identity Information
     * Verifies the authenticity and accuracy of provided identity information
     */
    validateIdentityInformation(identityInformation: IdentityInformation): Promise<ProcessResult>;
    /**
     * Trusted Process: Identity Verification
     * Confirms that the identity information corresponds to a real, unique person
     */
    verifyIdentity(personId: string, verificationMethod: VerificationMethod): Promise<ProcessResult>;
    /**
     * Trusted Process: Evidence Validation
     * Validates the authenticity and integrity of identity evidence
     */
    validateEvidence(evidence: IdentityEvidence): Promise<ProcessResult>;
    /**
     * Trusted Process: Identity Presentation
     * Presents verified identity information to authorized parties
     */
    presentIdentity(personId: string, requesterInfo: RequesterInfo, requestedAttributes: string[]): Promise<ProcessResult>;
    /**
     * Trusted Process: Identity Maintenance
     * Maintains and updates verified person information over time
     */
    maintainIdentity(personId: string, updateRequest: IdentityUpdateRequest): Promise<ProcessResult>;
    /**
     * Get conformance criteria for Verified Person component
     */
    getConformanceCriteria(): ConformanceCriteria[];
    private getAcceptableEvidenceSources;
    private calculateResolutionScore;
    private getMinimumResolutionScore;
    private generatePersonId;
    private validateCoreAttributes;
    private validateSupportingDocuments;
    private validateBiometricData;
    private aggregateValidationResults;
    private performVerification;
    private checkAuthenticity;
    private checkIntegrity;
    private checkCurrency;
    private checkCompleteness;
    private authorizeRequester;
    private extractRequestedAttributes;
    private validateUpdateRequest;
}
export declare class VerifiedPerson {
    personId: string;
    identityInformation: IdentityInformation;
    evidencePackage: EvidencePackage;
    assuranceLevel: AssuranceLevel;
    establishedAt: Date;
    verificationStatus: VerificationStatus;
    verifiedAt?: Date;
    verificationMethod?: VerificationMethod;
    lastUpdated?: Date;
    constructor(personId: string, identityInformation: IdentityInformation, evidencePackage: EvidencePackage, assuranceLevel: AssuranceLevel, establishedAt: Date);
    updateInformation(updatedAttributes: Partial<CoreAttributes>): void;
}
export interface IdentityInformation {
    coreAttributes: CoreAttributes;
    supportingDocuments?: SupportingDocument[];
    biometricData?: BiometricData;
}
export interface CoreAttributes {
    givenName: string;
    familyName: string;
    dateOfBirth: Date;
    placeOfBirth?: string;
    address: Address;
    phoneNumber?: string;
    emailAddress?: string;
}
export interface Address {
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}
export interface EvidencePackage {
    primaryEvidence: IdentityEvidence[];
    secondaryEvidence?: IdentityEvidence[];
    biometricEvidence?: BiometricEvidence[];
}
export interface IdentityEvidence {
    evidenceId: string;
    evidenceType: EvidenceType;
    issuer: string;
    issuedDate: Date;
    expirationDate: Date;
    requiredFields: FieldDefinition[];
}
export interface BiometricEvidence {
    biometricType: BiometricType;
    template: string;
    qualityScore: number;
    captureDate: Date;
}
export interface FieldDefinition {
    fieldName: string;
    value: any;
    isRequired: boolean;
}
export interface SupportingDocument {
    documentType: string;
    documentNumber: string;
    issuer: string;
    issuedDate: Date;
    expirationDate?: Date;
}
export interface BiometricData {
    fingerprints?: BiometricEvidence[];
    faceImage?: BiometricEvidence[];
    iris?: BiometricEvidence[];
}
export declare enum BiometricType {
    FINGERPRINT = "FINGERPRINT",
    FACE = "FACE",
    IRIS = "IRIS",
    VOICE = "VOICE"
}
export declare enum VerificationStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    VERIFIED = "VERIFIED",
    FAILED = "FAILED",
    SUSPENDED = "SUSPENDED"
}
export declare enum VerificationMethod {
    IN_PERSON = "IN_PERSON",
    REMOTE_SUPERVISED = "REMOTE_SUPERVISED",
    REMOTE_UNSUPERVISED = "REMOTE_UNSUPERVISED"
}
export interface EvidenceRequirement {
    evidenceType: EvidenceType;
    assuranceLevel: AssuranceLevel;
    isRequired: boolean;
}
export interface EvidenceSource {
    sourceId: string;
    sourceName: string;
    evidenceType: EvidenceType;
    trustLevel: number;
}
export interface ValidationResult {
    isValid: boolean;
    score: number;
    details: string;
}
export interface EvidenceValidationCheck {
    type: 'AUTHENTICITY' | 'INTEGRITY' | 'CURRENCY' | 'COMPLETENESS';
    passed: boolean;
}
export interface RequesterInfo {
    requesterId: string;
    requesterName: string;
    purpose: string;
    isAuthorized: boolean;
}
export interface IdentityUpdateRequest {
    personId: string;
    updatedAttributes: Partial<CoreAttributes>;
    reason: string;
    requestedBy: string;
}
export declare class IdentityProofingSession {
    sessionId: string;
    personId: string;
    status: ProcessStatus;
    startedAt: Date;
    completedAt?: Date;
    currentStep: string;
    constructor(sessionId: string, personId: string);
}
//# sourceMappingURL=verified-person.d.ts.map