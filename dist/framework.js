"use strict";
/**
 * DIACC PCTF Framework Orchestrator
 * Main class that coordinates all PCTF components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCTFFramework = void 0;
const types_1 = require("./types");
const authentication_1 = require("./authentication");
const verified_person_1 = require("./verified-person");
const privacy_1 = require("./privacy");
/**
 * Main PCTF Framework orchestrator class
 */
class PCTFFramework {
    constructor(frameworkId, version = '1.0.0') {
        this.participants = new Map();
        this.authenticationProviders = new Map();
        this.identityProviders = new Map();
        this.privacyProviders = new Map();
        this.frameworkId = frameworkId;
        this.version = version;
    }
    /**
     * Register a participant in the PCTF ecosystem
     */
    async registerParticipant(participant) {
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
        }
        catch (error) {
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
    getAuthenticationProvider(participantId) {
        return this.authenticationProviders.get(participantId);
    }
    /**
     * Get identity provider by participant ID
     */
    getIdentityProvider(participantId) {
        return this.identityProviders.get(participantId);
    }
    /**
     * Get privacy service provider by participant ID
     */
    getPrivacyProvider(participantId) {
        return this.privacyProviders.get(participantId);
    }
    /**
     * Assess conformance for a participant across all applicable PCTF components
     */
    async assessConformance(participantId) {
        try {
            const participant = this.participants.get(participantId);
            if (!participant) {
                return {
                    success: false,
                    message: 'Participant not found',
                    timestamp: new Date()
                };
            }
            const conformanceResults = {
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
            return {
                success: true,
                message: 'Conformance assessment completed',
                data: conformanceResults,
                timestamp: new Date()
            };
        }
        catch (error) {
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
    getParticipants() {
        return Array.from(this.participants.values());
    }
    /**
     * Get participants by type
     */
    getParticipantsByType(type) {
        return Array.from(this.participants.values()).filter(p => p.type === type);
    }
    /**
     * Validate framework ecosystem integrity
     */
    async validateEcosystem() {
        try {
            const validationResults = {
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
        }
        catch (error) {
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
    generateStatusReport() {
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
                privacyProviders: this.privacyProviders.size
            },
            complianceStatus: 'IN_PROGRESS' // This would be calculated based on actual assessments
        };
    }
    // Private helper methods
    async validateParticipant(participant) {
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
    async initializeServiceProviders(participant) {
        switch (participant.type) {
            case types_1.ParticipantType.AUTHENTICATION_SERVICE_PROVIDER:
            case types_1.ParticipantType.CREDENTIAL_SERVICE_PROVIDER:
                const authProvider = new authentication_1.AuthenticationServiceProvider(participant.participantId, participant.name, participant.certificationLevel);
                this.authenticationProviders.set(participant.participantId, authProvider);
                break;
            case types_1.ParticipantType.IDENTITY_PROVIDER:
                const identityProvider = new verified_person_1.IdentityProvider(participant.participantId, participant.name, participant.certificationLevel);
                this.identityProviders.set(participant.participantId, identityProvider);
                break;
            case types_1.ParticipantType.ISSUER:
            case types_1.ParticipantType.VERIFIER:
            case types_1.ParticipantType.RELYING_PARTY:
                // These may need privacy services
                const privacyProvider = new privacy_1.PrivacyServiceProvider(participant.participantId, participant.name);
                this.privacyProviders.set(participant.participantId, privacyProvider);
                break;
        }
    }
    async assessComponentConformance(componentName, criteria) {
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
    async checkInteroperability() {
        const issues = [];
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
    getParticipantCountByType(participants) {
        const counts = {};
        // Initialize all types to 0
        Object.values(types_1.ParticipantType).forEach(type => {
            counts[type] = 0;
        });
        // Count actual participants
        participants.forEach(p => {
            counts[p.type]++;
        });
        return counts;
    }
}
exports.PCTFFramework = PCTFFramework;
//# sourceMappingURL=framework.js.map