/**
 * DIACC PCTF Trust Registry Service (PCTF13)
 * Provides ecosystem participant verification and trust establishment
 */

import { 
  AssuranceLevel, 
  RiskLevel, 
  ConformanceCriteria, 
  TrustedProcess, 
  ProcessResult, 
  ProcessStatus,
  ParticipantType 
} from '../shared/types';

/**
 * Trust status levels
 */
export enum TrustStatus {
  TRUSTED = 'TRUSTED',
  PROVISIONAL = 'PROVISIONAL',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  UNKNOWN = 'UNKNOWN'
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
  trustScore: number; // 0-100
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
export class TrustRegistryProvider implements TrustedProcess {
  public readonly processId: string;
  public readonly name: string;
  public readonly description: string;
  public status: ProcessStatus;
  public readonly assuranceLevel: AssuranceLevel;

  private registryId: string;
  private governanceFramework: string;
  private trustEntries: Map<string, TrustRegistryEntry> = new Map();
  private verificationHistory: Map<string, TrustVerificationResult[]> = new Map();

  constructor(
    registryId: string,
    name: string,
    governanceFramework: string = 'DIACC-PCTF',
    assuranceLevel: AssuranceLevel = AssuranceLevel.LOA2
  ) {
    this.registryId = registryId;
    this.processId = `TRUST-REG-${registryId}`;
    this.name = name;
    this.description = 'PCTF Trust Registry Service Provider';
    this.status = ProcessStatus.PENDING;
    this.assuranceLevel = assuranceLevel;
    this.governanceFramework = governanceFramework;
  }

  /**
   * Execute trust registry process
   */
  async executeProcess(): Promise<ProcessResult> {
    try {
      this.status = ProcessStatus.IN_PROGRESS;
      this.logActivity('Trust registry process started');

      // Validate registry integrity
      const integrityCheck = await this.validateRegistryIntegrity();
      if (!integrityCheck.success) {
        this.status = ProcessStatus.FAILED;
        return integrityCheck;
      }

      // Perform trust score updates
      await this.updateTrustScores();

      // Check for expired entries
      await this.processExpiredEntries();

      this.status = ProcessStatus.COMPLETED;
      this.logActivity('Trust registry process completed successfully');

      return {
        success: true,
        message: 'Trust registry validated successfully',
        data: {
          registryId: this.registryId,
          entryCount: this.trustEntries.size,
          governanceFramework: this.governanceFramework
        },
        timestamp: new Date()
      };
    } catch (error) {
      this.status = ProcessStatus.FAILED;
      return {
        success: false,
        message: 'Trust registry process failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Register a participant in the trust registry
   */
  async registerParticipant(entry: TrustRegistryEntry): Promise<ProcessResult> {
    try {
      if (!this.validateInput(entry)) {
        return {
          success: false,
          message: 'Invalid trust registry entry data',
          timestamp: new Date()
        };
      }

      // Check for existing registration
      if (this.trustEntries.has(entry.participantId)) {
        return {
          success: false,
          message: 'Participant already registered',
          timestamp: new Date()
        };
      }

      // Validate certifications
      const certificationValidation = await this.validateCertifications(entry.certifications);
      if (!certificationValidation.success) {
        return certificationValidation;
      }

      // Calculate initial trust score
      entry.trustScore = this.calculateTrustScore(entry);

      this.trustEntries.set(entry.participantId, entry);
      this.logActivity(`Participant registered: ${entry.participantId}`);

      return {
        success: true,
        message: 'Participant registered successfully',
        data: { 
          participantId: entry.participantId,
          trustScore: entry.trustScore 
        },
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to register participant',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Verify trust status of a participant
   */
  async verifyTrust(request: TrustVerificationRequest): Promise<ProcessResult> {
    try {
      const entry = this.trustEntries.get(request.participantId);
      if (!entry) {
        return {
          success: false,
          message: 'Participant not found in trust registry',
          timestamp: new Date()
        };
      }

      const verificationResult = await this.performTrustVerification(entry, request);
      
      // Store verification history
      if (!this.verificationHistory.has(request.participantId)) {
        this.verificationHistory.set(request.participantId, []);
      }
      this.verificationHistory.get(request.participantId)!.push(verificationResult);

      this.logActivity(`Trust verification completed for ${request.participantId}: ${verificationResult.trustStatus}`);

      return {
        success: true,
        message: 'Trust verification completed',
        data: { verificationResult },
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Trust verification failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Get trust registry entry for a participant
   */
  getTrustEntry(participantId: string): TrustRegistryEntry | undefined {
    return this.trustEntries.get(participantId);
  }

  /**
   * Search trust registry by criteria
   */
  searchTrustRegistry(criteria: {
    type?: ParticipantType;
    status?: TrustStatus;
    assuranceLevel?: AssuranceLevel;
    minTrustScore?: number;
  }): TrustRegistryEntry[] {
    return Array.from(this.trustEntries.values()).filter(entry => {
      if (criteria.type && entry.type !== criteria.type) return false;
      if (criteria.status && entry.status !== criteria.status) return false;
      if (criteria.assuranceLevel && entry.assuranceLevel !== criteria.assuranceLevel) return false;
      if (criteria.minTrustScore && entry.trustScore < criteria.minTrustScore) return false;
      return true;
    });
  }

  /**
   * Update participant status
   */
  async updateParticipantStatus(participantId: string, status: TrustStatus, reason: string): Promise<ProcessResult> {
    try {
      const entry = this.trustEntries.get(participantId);
      if (!entry) {
        return {
          success: false,
          message: 'Participant not found',
          timestamp: new Date()
        };
      }

      const previousStatus = entry.status;
      entry.status = status;
      entry.lastVerified = new Date();

      // Recalculate trust score based on new status
      entry.trustScore = this.calculateTrustScore(entry);

      this.logActivity(`Participant ${participantId} status updated: ${previousStatus} → ${status} (${reason})`);

      return {
        success: true,
        message: 'Participant status updated successfully',
        data: { 
          participantId, 
          previousStatus, 
          newStatus: status,
          trustScore: entry.trustScore 
        },
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update participant status',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Get verification history for a participant
   */
  getVerificationHistory(participantId: string): TrustVerificationResult[] {
    return this.verificationHistory.get(participantId) || [];
  }

  /**
   * Get conformance criteria for trust registry
   */
  getConformanceCriteria(): ConformanceCriteria[] {
    return [
      {
        id: 'TRUST-001',
        description: 'Trust registry must maintain accurate participant information',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.HIGH,
        isRequired: true,
        mitigationStrategies: [
          'Regular verification of participant information',
          'Automated certification status checking',
          'Audit trails for all registry changes'
        ]
      },
      {
        id: 'TRUST-002',
        description: 'Trust scores must be calculated using verifiable criteria',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.MEDIUM,
        isRequired: true,
        mitigationStrategies: [
          'Transparent trust scoring algorithms',
          'Regular trust score recalculation',
          'Third-party validation of scoring methods'
        ]
      },
      {
        id: 'TRUST-003',
        description: 'Registry must provide real-time trust verification',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.MEDIUM,
        isRequired: true,
        mitigationStrategies: [
          'High availability infrastructure',
          'Distributed registry architecture',
          'Real-time status monitoring'
        ]
      }
    ];
  }

  /**
   * Validate input data
   */
  validateInput(input: any): boolean {
    if (!input || typeof input !== 'object') {
      return false;
    }

    const entry = input as TrustRegistryEntry;
    return !!(
      entry.participantId &&
      entry.name &&
      entry.type &&
      entry.assuranceLevel &&
      entry.contactInformation
    );
  }

  /**
   * Log activity
   */
  logActivity(activity: string): void {
    console.log(`[${new Date().toISOString()}] Trust Registry ${this.registryId}: ${activity}`);
  }

  // Private methods
  private async validateRegistryIntegrity(): Promise<ProcessResult> {
    const issues: string[] = [];

    for (const [participantId, entry] of this.trustEntries) {
      // Check for expired entries
      if (entry.expirationDate && entry.expirationDate < new Date()) {
        issues.push(`Entry ${participantId} has expired`);
      }

      // Validate certifications
      for (const cert of entry.certifications) {
        if (cert.expirationDate && cert.expirationDate < new Date()) {
          issues.push(`Certification ${cert.certificationId} for ${participantId} has expired`);
        }
      }

      // Check trust score validity
      if (entry.trustScore < 0 || entry.trustScore > 100) {
        issues.push(`Invalid trust score for ${participantId}: ${entry.trustScore}`);
      }
    }

    if (issues.length > 0) {
      this.logActivity(`Registry integrity issues found: ${issues.length}`);
      return {
        success: false,
        message: 'Registry integrity validation failed',
        errors: issues,
        timestamp: new Date()
      };
    }

    return {
      success: true,
      message: 'Registry integrity validation passed',
      timestamp: new Date()
    };
  }

  private async updateTrustScores(): Promise<void> {
    for (const [participantId, entry] of this.trustEntries) {
      const newScore = this.calculateTrustScore(entry);
      if (newScore !== entry.trustScore) {
        entry.trustScore = newScore;
        this.logActivity(`Trust score updated for ${participantId}: ${newScore}`);
      }
    }
  }

  private async processExpiredEntries(): Promise<void> {
    const now = new Date();
    
    for (const [participantId, entry] of this.trustEntries) {
      if (entry.expirationDate && entry.expirationDate < now && entry.status === TrustStatus.TRUSTED) {
        entry.status = TrustStatus.SUSPENDED;
        this.logActivity(`Entry ${participantId} suspended due to expiration`);
      }
    }
  }

  private async validateCertifications(certifications: TrustCertification[]): Promise<ProcessResult> {
    const issues: string[] = [];

    for (const cert of certifications) {
      if (!cert.certificationId || !cert.issuingAuthority) {
        issues.push('Invalid certification: missing required fields');
      }

      if (cert.expirationDate && cert.expirationDate < new Date()) {
        issues.push(`Certification ${cert.certificationId} has expired`);
      }
    }

    if (issues.length > 0) {
      return {
        success: false,
        message: 'Certification validation failed',
        errors: issues,
        timestamp: new Date()
      };
    }

    return {
      success: true,
      message: 'Certification validation passed',
      timestamp: new Date()
    };
  }

  private async performTrustVerification(entry: TrustRegistryEntry, request: TrustVerificationRequest): Promise<TrustVerificationResult> {
    const passed: string[] = [];
    const failed: string[] = [];
    const warnings: string[] = [];

    // Check basic status
    if (entry.status === TrustStatus.TRUSTED) {
      passed.push('Trust status verification');
    } else {
      failed.push(`Trust status is ${entry.status}`);
    }

    // Check certifications
    const activeCerts = entry.certifications.filter(cert => 
      cert.status === 'ACTIVE' && 
      (!cert.expirationDate || cert.expirationDate > new Date())
    );

    if (activeCerts.length > 0) {
      passed.push('Active certifications found');
    } else {
      failed.push('No active certifications');
    }

    // Check trust score
    if (entry.trustScore >= 70) {
      passed.push('Trust score meets threshold');
    } else if (entry.trustScore >= 50) {
      warnings.push('Trust score below recommended threshold');
    } else {
      failed.push('Trust score too low');
    }

    // Determine overall trust status
    let trustStatus = TrustStatus.TRUSTED;
    if (failed.length > 0) {
      trustStatus = TrustStatus.PROVISIONAL;
    }
    if (entry.status !== TrustStatus.TRUSTED) {
      trustStatus = entry.status;
    }

    return {
      participantId: entry.participantId,
      trustStatus,
      trustScore: entry.trustScore,
      verificationDate: new Date(),
      verificationDetails: {
        criteriaChecked: [...passed, ...failed, ...warnings],
        passed,
        failed,
        warnings
      },
      validity: {
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    };
  }

  private calculateTrustScore(entry: TrustRegistryEntry): number {
    let score = 50; // Base score

    // Status contribution
    switch (entry.status) {
      case TrustStatus.TRUSTED:
        score += 30;
        break;
      case TrustStatus.PROVISIONAL:
        score += 10;
        break;
      case TrustStatus.SUSPENDED:
        score -= 20;
        break;
      case TrustStatus.REVOKED:
        score -= 50;
        break;
    }

    // Assurance level contribution
    switch (entry.assuranceLevel) {
      case AssuranceLevel.LOA4:
        score += 20;
        break;
      case AssuranceLevel.LOA3:
        score += 15;
        break;
      case AssuranceLevel.LOA2:
        score += 10;
        break;
      case AssuranceLevel.LOA1:
        score += 5;
        break;
    }

    // Certifications contribution
    const activeCerts = entry.certifications.filter(cert => 
      cert.status === 'ACTIVE' && 
      (!cert.expirationDate || cert.expirationDate > new Date())
    );
    score += Math.min(activeCerts.length * 5, 20);

    // Time-based factors
    const daysSinceRegistration = Math.floor((Date.now() - entry.registrationDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceRegistration > 365) {
      score += 5; // Bonus for established participants
    }

    const daysSinceLastVerified = Math.floor((Date.now() - entry.lastVerified.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceLastVerified > 90) {
      score -= 5; // Penalty for stale verification
    }

    return Math.max(0, Math.min(100, score));
  }
}
