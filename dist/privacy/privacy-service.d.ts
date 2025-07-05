/**
 * DIACC PCTF04 - Privacy Component
 * Describes requirements for handling personal information associated with digital identity,
 * aligned with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)
 */
import { ProcessResult, ConformanceCriteria } from '../shared/types';
/**
 * Privacy Service Provider implementing PCTF04 requirements
 */
export declare class PrivacyServiceProvider {
    private providerId;
    private name;
    private privacyPolicies;
    private consentRecords;
    private personalInformationInventory;
    constructor(providerId: string, name: string);
    /**
     * PIPEDA Principle 1: Accountability
     * Ensure organization is responsible for personal information under its control
     */
    implementAccountability(accountabilityFramework: AccountabilityFramework): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 2: Identifying Purposes
     * Identify the purposes for which personal information is collected
     */
    identifyCollectionPurposes(purposeSpecification: PurposeSpecification): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 3: Consent
     * Obtain knowledge and consent of the individual for collection, use, or disclosure
     */
    obtainConsent(consentRequest: ConsentRequest): Promise<ProcessResult>;
    /**
     * Process consent decision from individual
     */
    processConsentDecision(consentId: string, decision: ConsentDecision): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 4: Limiting Collection
     * Limit collection of personal information to what is necessary for identified purposes
     */
    limitCollection(collectionRequest: CollectionRequest): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 5: Limiting Use, Disclosure, and Retention
     * Use or disclose personal information only for purposes for which it was collected
     */
    limitUseDisclosure(useRequest: UseDisclosureRequest): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 6: Accuracy
     * Ensure personal information is accurate, complete, and up-to-date
     */
    ensureAccuracy(recordId: string): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 7: Safeguards
     * Protect personal information with appropriate security safeguards
     */
    implementSafeguards(safeguardSpecification: SafeguardSpecification): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 8: Openness
     * Make information about policies and practices relating to personal information readily available
     */
    ensureOpenness(opennessRequirements: OpennessRequirements): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 9: Individual Access
     * Provide individuals with access to their personal information
     */
    provideIndividualAccess(accessRequest: AccessRequest): Promise<ProcessResult>;
    /**
     * PIPEDA Principle 10: Challenging Compliance
     * Provide mechanism for individuals to challenge compliance with privacy principles
     */
    handleComplianceChallenge(challenge: ComplianceChallenge): Promise<ProcessResult>;
    /**
     * Get conformance criteria for Privacy component
     */
    getConformanceCriteria(): ConformanceCriteria[];
    private designatePrivacyOfficer;
    private establishPrivacyPolicies;
    private implementPrivacyTraining;
    private validatePurposeSpecification;
    private generatePolicyId;
    private generateConsentId;
    private generateRecordId;
    private generateChallengeId;
    private validateConsentRequest;
    private generateConsentForm;
    private validateCollectionLimits;
    private checkCollectionConsent;
    private validateUseDisclosure;
    private assessAccuracy;
    private implementPhysicalSafeguards;
    private implementTechnicalSafeguards;
    private implementAdministrativeSafeguards;
    private publishPrivacyPolicy;
    private publishContactInformation;
    private publishPracticesInformation;
    private verifyIndividualIdentity;
    private retrievePersonalInformation;
    private prepareAccessResponse;
    private investigateChallenge;
    private respondToChallenge;
}
export declare class PrivacyPolicy {
    policyId: string;
    purposes: CollectionPurpose[];
    dataCategories: DataCategory[];
    effectiveDate: Date;
    lastUpdated: Date;
    constructor(policyId: string, purposes: CollectionPurpose[], dataCategories: DataCategory[], effectiveDate: Date);
}
export declare class ConsentRecord {
    consentId: string;
    individualId: string;
    purposes: CollectionPurpose[];
    dataCategories: DataCategory[];
    status: ConsentStatus;
    requestedAt: Date;
    decidedAt?: Date;
    expiresAt?: Date;
    constructor(consentId: string, individualId: string, purposes: CollectionPurpose[], dataCategories: DataCategory[], status: ConsentStatus, requestedAt: Date);
    updateDecision(decision: ConsentDecision): void;
}
export declare class PersonalInformationRecord {
    recordId: string;
    individualId: string;
    dataElements: DataElement[];
    purposes: CollectionPurpose[];
    collectedAt: Date;
    lastAccessed?: Date;
    useDisclosureLog: UseDisclosureLog[];
    accuracyFlags: string[];
    constructor(recordId: string, individualId: string, dataElements: DataElement[], purposes: CollectionPurpose[], collectedAt: Date);
    logUseDisclosure(request: UseDisclosureRequest): void;
    flagForUpdate(issues: string[]): void;
}
export interface AccountabilityFramework {
    privacyOfficer: PrivacyOfficer;
    policies: PrivacyPolicyTemplate[];
    trainingProgram: PrivacyTrainingProgram;
}
export interface PrivacyOfficer {
    name: string;
    title: string;
    contactInfo: ContactInformation;
}
export interface PurposeSpecification {
    purposes: CollectionPurpose[];
    dataCategories: DataCategory[];
}
export interface CollectionPurpose {
    purposeId: string;
    description: string;
    isRequired: boolean;
    legalBasis: string;
}
export interface DataCategory {
    categoryId: string;
    name: string;
    description: string;
    sensitivity: DataSensitivity;
}
export declare enum DataSensitivity {
    PUBLIC = "PUBLIC",
    INTERNAL = "INTERNAL",
    CONFIDENTIAL = "CONFIDENTIAL",
    RESTRICTED = "RESTRICTED"
}
export interface ConsentRequest {
    individualId: string;
    purposes: CollectionPurpose[];
    dataCategories: DataCategory[];
    requesterInfo: string;
}
export interface ConsentDecision {
    granted: boolean;
    purposes: string[];
    conditions?: string[];
    expiresAt?: Date;
}
export declare enum ConsentStatus {
    PENDING = "PENDING",
    GRANTED = "GRANTED",
    DENIED = "DENIED",
    WITHDRAWN = "WITHDRAWN",
    EXPIRED = "EXPIRED"
}
export interface CollectionRequest {
    individualId: string;
    dataElements: DataElement[];
    purposes: CollectionPurpose[];
    collectionMethod: string;
}
export interface DataElement {
    elementId: string;
    name: string;
    value: any;
    category: DataCategory;
    isRequired: boolean;
}
export interface UseDisclosureRequest {
    recordId: string;
    purpose: string;
    recipient: string;
    dataElements: string[];
    justification: string;
}
export interface UseDisclosureLog {
    timestamp: Date;
    purpose: string;
    recipient: string;
    dataElements: string[];
}
export interface SafeguardSpecification {
    physicalSafeguards: PhysicalSafeguard[];
    technicalSafeguards: TechnicalSafeguard[];
    administrativeSafeguards: AdministrativeSafeguard[];
}
export interface PhysicalSafeguard {
    type: string;
    description: string;
    implemented: boolean;
}
export interface TechnicalSafeguard {
    type: string;
    description: string;
    implemented: boolean;
}
export interface AdministrativeSafeguard {
    type: string;
    description: string;
    implemented: boolean;
}
export interface OpennessRequirements {
    privacyPolicy: PrivacyPolicyTemplate;
    contactInfo: ContactInformation;
    practicesInfo: PracticesInformation;
}
export interface PrivacyPolicyTemplate {
    title: string;
    content: string;
    lastUpdated: Date;
}
export interface ContactInformation {
    name: string;
    email: string;
    phone: string;
    address: string;
}
export interface PracticesInformation {
    dataHandlingPractices: string;
    securityMeasures: string;
    retentionPolicies: string;
}
export interface AccessRequest {
    individualId: string;
    requestedInformation: string[];
    requestedFormat: string;
    verificationMethod: string;
}
export interface ComplianceChallenge {
    individualId: string;
    challengeType: string;
    description: string;
    requestedAction: string;
}
export declare class ComplianceChallengeRecord {
    challengeId: string;
    individualId: string;
    challengeType: string;
    description: string;
    submittedAt: Date;
    status: string;
    constructor(challengeId: string, individualId: string, challengeType: string, description: string, submittedAt: Date);
}
export interface AccuracyAssessment {
    isAccurate: boolean;
    issues: string[];
}
export declare class ConsentForm {
    purposes: CollectionPurpose[];
    dataCategories: DataCategory[];
    constructor(purposes: CollectionPurpose[], dataCategories: DataCategory[]);
}
export declare class PersonalInformationSummary {
    individualId: string;
    records: PersonalInformationRecord[];
    constructor(individualId: string, records: PersonalInformationRecord[]);
}
export declare class AccessResponse {
    personalInfo: PersonalInformationSummary;
    format: string;
    constructor(personalInfo: PersonalInformationSummary, format: string);
}
export declare class ChallengeInvestigation {
    challengeId: string;
    findings: string;
    isCompliant: boolean;
    constructor(challengeId: string, findings: string, isCompliant: boolean);
}
export declare class ChallengeResponse {
    challengeId: string;
    response: string;
    respondedAt: Date;
    constructor(challengeId: string, response: string, respondedAt: Date);
}
export interface PrivacyTrainingProgram {
    name: string;
    modules: string[];
    frequency: string;
}
//# sourceMappingURL=privacy-service.d.ts.map