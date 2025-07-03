/**
 * DIACC PCTF Framework Orchestrator
 * Main class that coordinates all PCTF components
 */
import { ProcessResult, PCTFParticipant, ParticipantType } from './types';
import { AuthenticationServiceProvider } from './authentication';
import { IdentityProvider } from './verified-person';
import { PrivacyServiceProvider } from './privacy';
/**
 * Main PCTF Framework orchestrator class
 */
export declare class PCTFFramework {
    private frameworkId;
    private version;
    private participants;
    private authenticationProviders;
    private identityProviders;
    private privacyProviders;
    constructor(frameworkId: string, version?: string);
    /**
     * Register a participant in the PCTF ecosystem
     */
    registerParticipant(participant: PCTFParticipant): Promise<ProcessResult>;
    /**
     * Get authentication service provider by participant ID
     */
    getAuthenticationProvider(participantId: string): AuthenticationServiceProvider | undefined;
    /**
     * Get identity provider by participant ID
     */
    getIdentityProvider(participantId: string): IdentityProvider | undefined;
    /**
     * Get privacy service provider by participant ID
     */
    getPrivacyProvider(participantId: string): PrivacyServiceProvider | undefined;
    /**
     * Assess conformance for a participant across all applicable PCTF components
     */
    assessConformance(participantId: string): Promise<ProcessResult>;
    /**
     * Get all registered participants
     */
    getParticipants(): PCTFParticipant[];
    /**
     * Get participants by type
     */
    getParticipantsByType(type: ParticipantType): PCTFParticipant[];
    /**
     * Validate framework ecosystem integrity
     */
    validateEcosystem(): Promise<ProcessResult>;
    /**
     * Generate framework status report
     */
    generateStatusReport(): FrameworkStatusReport;
    private validateParticipant;
    private initializeServiceProviders;
    private assessComponentConformance;
    private checkInteroperability;
    private getParticipantCountByType;
}
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
    };
    complianceStatus: string;
}
//# sourceMappingURL=framework.d.ts.map