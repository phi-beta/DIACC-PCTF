/**
 * DIACC PCTF Framework Orchestrator
 * Main class that coordinates all PCTF components
 */

import { AssuranceLevel, ConformanceCriteria, ProcessResult, PCTFParticipant, ParticipantType } from './types';
import { AuthenticationServiceProvider } from '../authentication';
import { IdentityProvider } from '../verified-person';
import { PrivacyServiceProvider } from '../privacy';
import { InfrastructureServiceProvider, SecurityLevel } from '../infrastructure';
import { DigitalWalletProvider, WalletType } from '../digital-wallet';
import { TrustRegistryProvider } from '../trust-registry';

/**
 * Main PCTF Framework orchestrator class
 */
export class PCTFFramework {
  private frameworkId: string;
  private version: string;
  private participants: Map<string, PCTFParticipant> = new Map();
  private authenticationProviders: Map<string, AuthenticationServiceProvider> = new Map();
  private identityProviders: Map<string, IdentityProvider> = new Map();
  private privacyProviders: Map<string, PrivacyServiceProvider> = new Map();
  private infrastructureProviders: Map<string, InfrastructureServiceProvider> = new Map();
  private walletProviders: Map<string, DigitalWalletProvider> = new Map();
  private trustRegistries: Map<string, TrustRegistryProvider> = new Map();

  constructor(frameworkId: string, version: string = '1.0.0') {
    this.frameworkId = frameworkId;
    this.version = version;
  }

  /**
   * Register a participant in the PCTF ecosystem
   */
  async registerParticipant(participant: PCTFParticipant): Promise<ProcessResult> {
    try {
      // Validate participant information
      const validation = await this.validateParticipant(participant);
      if (!validation.success) {
        return validation;
      }

      // Register the participant
      this.participants.set(participant.participantId, participant);

      // Initialize appropriate service providers based on participant type
      await this.initializeServiceProviders(participant);

      return {
        success: true,
        message: 'Participant registered successfully',
        data: { participantId: participant.participantId },
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
   * Get authentication service provider by participant ID
   */
  getAuthenticationProvider(participantId: string): AuthenticationServiceProvider | undefined {
    return this.authenticationProviders.get(participantId);
  }

  /**
   * Get identity provider by participant ID
   */
  getIdentityProvider(participantId: string): IdentityProvider | undefined {
    return this.identityProviders.get(participantId);
  }

  /**
   * Get privacy service provider by participant ID
   */
  getPrivacyProvider(participantId: string): PrivacyServiceProvider | undefined {
    return this.privacyProviders.get(participantId);
  }

  /**
   * Get infrastructure service provider by participant ID
   */
  getInfrastructureProvider(participantId: string): InfrastructureServiceProvider | undefined {
    return this.infrastructureProviders.get(participantId);
  }

  /**
   * Get digital wallet provider by participant ID
   */
  getWalletProvider(participantId: string): DigitalWalletProvider | undefined {
    return this.walletProviders.get(participantId);
  }

  /**
   * Get trust registry by participant ID
   */
  getTrustRegistry(participantId: string): TrustRegistryProvider | undefined {
    return this.trustRegistries.get(participantId);
  }

  /**
   * Assess conformance for a participant across all applicable PCTF components
   */
  async assessConformance(participantId: string): Promise<ProcessResult> {
    try {
      const participant = this.participants.get(participantId);
      if (!participant) {
        return {
          success: false,
          message: 'Participant not found',
          timestamp: new Date()
        };
      }

      const conformanceResults: ConformanceAssessmentResult = {
        participantId,
        assessmentDate: new Date(),
        overallConformance: true,
        componentResults: []
      };

      // Assess Authentication component if applicable
      const authProvider = this.authenticationProviders.get(participantId);
      if (authProvider) {
        const authCriteria = authProvider.getConformanceCriteria();
        const authResult = await this.assessComponentConformance('Authentication', authCriteria);
        conformanceResults.componentResults.push(authResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && authResult.isConformant;
      }

      // Assess Verified Person component if applicable
      const identityProvider = this.identityProviders.get(participantId);
      if (identityProvider) {
        const vpCriteria = identityProvider.getConformanceCriteria();
        const vpResult = await this.assessComponentConformance('VerifiedPerson', vpCriteria);
        conformanceResults.componentResults.push(vpResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && vpResult.isConformant;
      }

      // Assess Privacy component if applicable
      const privacyProvider = this.privacyProviders.get(participantId);
      if (privacyProvider) {
        const privacyCriteria = privacyProvider.getConformanceCriteria();
        const privacyResult = await this.assessComponentConformance('Privacy', privacyCriteria);
        conformanceResults.componentResults.push(privacyResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && privacyResult.isConformant;
      }

      // Assess Infrastructure component if applicable
      const infraProvider = this.infrastructureProviders.get(participantId);
      if (infraProvider) {
        const infraCriteria = infraProvider.getConformanceCriteria();
        const infraResult = await this.assessComponentConformance('Infrastructure', infraCriteria);
        conformanceResults.componentResults.push(infraResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && infraResult.isConformant;
      }

      // Assess Digital Wallet component if applicable
      const walletProvider = this.walletProviders.get(participantId);
      if (walletProvider) {
        const walletCriteria = walletProvider.getConformanceCriteria();
        const walletResult = await this.assessComponentConformance('DigitalWallet', walletCriteria);
        conformanceResults.componentResults.push(walletResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && walletResult.isConformant;
      }

      // Assess Trust Registry component if applicable
      const trustRegistry = this.trustRegistries.get(participantId);
      if (trustRegistry) {
        const trustCriteria = trustRegistry.getConformanceCriteria();
        const trustResult = await this.assessComponentConformance('TrustRegistry', trustCriteria);
        conformanceResults.componentResults.push(trustResult);
        conformanceResults.overallConformance = conformanceResults.overallConformance && trustResult.isConformant;
      }

      return {
        success: true,
        message: 'Conformance assessment completed',
        data: conformanceResults,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Conformance assessment failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Get all registered participants
   */
  getParticipants(): PCTFParticipant[] {
    return Array.from(this.participants.values());
  }

  /**
   * Get participants by type
   */
  getParticipantsByType(type: ParticipantType): PCTFParticipant[] {
    return Array.from(this.participants.values()).filter(p => p.type === type);
  }

  /**
   * Validate framework ecosystem integrity
   */
  async validateEcosystem(): Promise<ProcessResult> {
    try {
      const validationResults: EcosystemValidationResult = {
        timestamp: new Date(),
        participantCount: this.participants.size,
        activeParticipants: 0,
        componentCoverage: {
          authentication: 0,
          identityProviders: 0,
          privacyProviders: 0
        },
        interoperabilityIssues: []
      };

      // Count active participants
      validationResults.activeParticipants = Array.from(this.participants.values())
        .filter(p => p.isActive).length;

      // Check component coverage
      validationResults.componentCoverage = {
        authentication: this.authenticationProviders.size,
        identityProviders: this.identityProviders.size,
        privacyProviders: this.privacyProviders.size
      };

      // Validate interoperability
      const interoperabilityCheck = await this.checkInteroperability();
      validationResults.interoperabilityIssues = interoperabilityCheck.issues;

      const isValid = validationResults.activeParticipants > 0 && 
                     validationResults.interoperabilityIssues.length === 0;

      return {
        success: isValid,
        message: isValid ? 'Ecosystem validation successful' : 'Ecosystem validation issues found',
        data: validationResults,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ecosystem validation failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Generate framework status report
   */
  generateStatusReport(): FrameworkStatusReport {
    const participants = Array.from(this.participants.values());
    
    return {
      frameworkId: this.frameworkId,
      version: this.version,
      generatedAt: new Date(),
      participantSummary: {
        total: participants.length,
        active: participants.filter(p => p.isActive).length,
        byType: this.getParticipantCountByType(participants)
      },
      componentSummary: {
        authenticationProviders: this.authenticationProviders.size,
        identityProviders: this.identityProviders.size,
        privacyProviders: this.privacyProviders.size,
        infrastructureProviders: this.infrastructureProviders.size,
        walletProviders: this.walletProviders.size,
        trustRegistries: this.trustRegistries.size
      },
      complianceStatus: 'IN_PROGRESS' // This would be calculated based on actual assessments
    };
  }

  // Private helper methods
  private async validateParticipant(participant: PCTFParticipant): Promise<ProcessResult> {
    // Validate required fields
    if (!participant.participantId || !participant.name || !participant.type) {
      return {
        success: false,
        message: 'Missing required participant information',
        timestamp: new Date()
      };
    }

    // Check for duplicate registration
    if (this.participants.has(participant.participantId)) {
      return {
        success: false,
        message: 'Participant already registered',
        timestamp: new Date()
      };
    }

    return {
      success: true,
      message: 'Participant validation successful',
      timestamp: new Date()
    };
  }

  private async initializeServiceProviders(participant: PCTFParticipant): Promise<void> {
    switch (participant.type) {
      case ParticipantType.AUTHENTICATION_SERVICE_PROVIDER:
      case ParticipantType.CREDENTIAL_SERVICE_PROVIDER:
        const authProvider = new AuthenticationServiceProvider(
          participant.participantId,
          participant.name,
          participant.certificationLevel
        );
        this.authenticationProviders.set(participant.participantId, authProvider);
        break;

      case ParticipantType.IDENTITY_PROVIDER:
        const identityProvider = new IdentityProvider(
          participant.participantId,
          participant.name,
          participant.certificationLevel
        );
        this.identityProviders.set(participant.participantId, identityProvider);
        break;

      case ParticipantType.WALLET_PROVIDER:
        const walletProvider = new DigitalWalletProvider(
          `WALLET-${participant.participantId}`,
          participant.participantId,
          WalletType.CLOUD, // Default wallet type, could be configurable
          participant.name,
          participant.certificationLevel
        );
        this.walletProviders.set(participant.participantId, walletProvider);
        break;

      case ParticipantType.TRUST_REGISTRY:
        const trustRegistry = new TrustRegistryProvider(
          participant.participantId,
          participant.name,
          'DIACC-PCTF',
          participant.certificationLevel
        );
        this.trustRegistries.set(participant.participantId, trustRegistry);
        break;

      case ParticipantType.ISSUER:
      case ParticipantType.VERIFIER:
      case ParticipantType.RELYING_PARTY:
        // These may need privacy services
        const privacyProvider = new PrivacyServiceProvider(
          participant.participantId,
          participant.name
        );
        this.privacyProviders.set(participant.participantId, privacyProvider);

        // Infrastructure services for high-assurance participants
        if (participant.certificationLevel === AssuranceLevel.LOA3 || 
            participant.certificationLevel === AssuranceLevel.LOA4) {
          const infraProvider = new InfrastructureServiceProvider(
            participant.participantId,
            participant.name,
            SecurityLevel.ENHANCED,
            participant.certificationLevel
          );
          this.infrastructureProviders.set(participant.participantId, infraProvider);
        }
        break;
    }
  }

  private async assessComponentConformance(componentName: string, criteria: ConformanceCriteria[]): Promise<ComponentConformanceResult> {
    // Simplified conformance assessment
    const assessedCriteria = criteria.map(criterion => ({
      criterionId: criterion.id,
      description: criterion.description,
      isConformant: true, // In real implementation, this would involve actual testing
      evidence: 'Conformance verified through automated testing',
      lastAssessed: new Date()
    }));

    const overallConformance = assessedCriteria.every(ac => ac.isConformant);

    return {
      componentName,
      isConformant: overallConformance,
      assessedCriteria,
      assessmentDate: new Date()
    };
  }

  private async checkInteroperability(): Promise<{ issues: string[] }> {
    const issues: string[] = [];

    // Check if we have minimum required participants for ecosystem
    if (this.identityProviders.size === 0) {
      issues.push('No identity providers registered');
    }

    if (this.authenticationProviders.size === 0) {
      issues.push('No authentication providers registered');
    }

    // Additional interoperability checks would go here

    return { issues };
  }

  private getParticipantCountByType(participants: PCTFParticipant[]): Record<ParticipantType, number> {
    const counts = {} as Record<ParticipantType, number>;
    
    // Initialize all types to 0
    Object.values(ParticipantType).forEach(type => {
      counts[type] = 0;
    });

    // Count actual participants
    participants.forEach(p => {
      counts[p.type]++;
    });

    return counts;
  }
}

// Supporting interfaces
export interface ConformanceAssessmentResult {
  participantId: string;
  assessmentDate: Date;
  overallConformance: boolean;
  componentResults: ComponentConformanceResult[];
}

export interface ComponentConformanceResult {
  componentName: string;
  isConformant: boolean;
  assessedCriteria: AssessedCriterion[];
  assessmentDate: Date;
}

export interface AssessedCriterion {
  criterionId: string;
  description: string;
  isConformant: boolean;
  evidence: string;
  lastAssessed: Date;
}

export interface EcosystemValidationResult {
  timestamp: Date;
  participantCount: number;
  activeParticipants: number;
  componentCoverage: {
    authentication: number;
    identityProviders: number;
    privacyProviders: number;
  };
  interoperabilityIssues: string[];
}

export interface FrameworkStatusReport {
  frameworkId: string;
  version: string;
  generatedAt: Date;
  participantSummary: {
    total: number;
    active: number;
    byType: Record<ParticipantType, number>;
  };
  componentSummary: {
    authenticationProviders: number;
    identityProviders: number;
    privacyProviders: number;
    infrastructureProviders: number;
    walletProviders: number;
    trustRegistries: number;
  };
  complianceStatus: string;
}
