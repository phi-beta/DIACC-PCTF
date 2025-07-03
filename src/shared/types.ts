/**
 * Core types and enums for DIACC PCTF implementation
 */

/**
 * Levels of Assurance as defined in PCTF
 */
export enum AssuranceLevel {
  LOA1 = 'LOA1',
  LOA2 = 'LOA2', 
  LOA3 = 'LOA3',
  LOA4 = 'LOA4'
}

/**
 * Risk levels for framework assessments
 */
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}

/**
 * Status enumeration for various processes
 */
export enum ProcessStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED'
}

/**
 * Common interface for conformance criteria
 */
export interface ConformanceCriteria {
  id: string;
  description: string;
  assuranceLevel: AssuranceLevel;
  riskLevel: RiskLevel;
  isRequired: boolean;
  mitigationStrategies: string[];
}

/**
 * Base interface for trusted processes
 */
export interface TrustedProcess {
  processId: string;
  name: string;
  description: string;
  status: ProcessStatus;
  assuranceLevel: AssuranceLevel;
  executeProcess(): Promise<ProcessResult>;
  validateInput(input: any): boolean;
  logActivity(activity: string): void;
}

/**
 * Result of a trusted process execution
 */
export interface ProcessResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
  timestamp: Date;
}

/**
 * Base interface for PCTF participants
 */
export interface PCTFParticipant {
  participantId: string;
  name: string;
  type: ParticipantType;
  certificationLevel: AssuranceLevel;
  isActive: boolean;
  registrationDate: Date;
}

/**
 * Types of participants in the PCTF ecosystem
 */
export enum ParticipantType {
  CREDENTIAL_SERVICE_PROVIDER = 'CREDENTIAL_SERVICE_PROVIDER',
  AUTHENTICATION_SERVICE_PROVIDER = 'AUTHENTICATION_SERVICE_PROVIDER',
  IDENTITY_PROVIDER = 'IDENTITY_PROVIDER',
  VERIFIER = 'VERIFIER',
  ISSUER = 'ISSUER',
  WALLET_PROVIDER = 'WALLET_PROVIDER',
  TRUST_REGISTRY = 'TRUST_REGISTRY',
  RELYING_PARTY = 'RELYING_PARTY'
}

/**
 * Personal information handling principles (PIPEDA aligned)
 */
export enum PrivacyPrinciple {
  ACCOUNTABILITY = 'ACCOUNTABILITY',
  IDENTIFYING_PURPOSE = 'IDENTIFYING_PURPOSE',
  CONSENT = 'CONSENT',
  LIMITING_COLLECTION = 'LIMITING_COLLECTION',
  LIMITING_USE_DISCLOSURE = 'LIMITING_USE_DISCLOSURE',
  ACCURACY = 'ACCURACY',
  SAFEGUARDS = 'SAFEGUARDS',
  OPENNESS = 'OPENNESS',
  INDIVIDUAL_ACCESS = 'INDIVIDUAL_ACCESS',
  CHALLENGING_COMPLIANCE = 'CHALLENGING_COMPLIANCE'
}

/**
 * Credential status enumeration
 */
export enum CredentialStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED'
}

/**
 * Evidence types for identity verification
 */
export enum EvidenceType {
  GOVERNMENT_ISSUED_ID = 'GOVERNMENT_ISSUED_ID',
  BIOMETRIC = 'BIOMETRIC',
  KNOWLEDGE_BASED = 'KNOWLEDGE_BASED',
  SOCIAL_VERIFICATION = 'SOCIAL_VERIFICATION',
  DOCUMENT_VERIFICATION = 'DOCUMENT_VERIFICATION'
}
