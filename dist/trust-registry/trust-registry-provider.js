"use strict";
/**
 * DIACC PCTF Trust Registry Service (PCTF13)
 * Provides ecosystem participant verification and trust establishment
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustRegistryProvider = exports.TrustStatus = void 0;
const types_1 = require("../shared/types");
/**
 * Trust status levels
 */
var TrustStatus;
(function (TrustStatus) {
    TrustStatus["TRUSTED"] = "TRUSTED";
    TrustStatus["PROVISIONAL"] = "PROVISIONAL";
    TrustStatus["SUSPENDED"] = "SUSPENDED";
    TrustStatus["REVOKED"] = "REVOKED";
    TrustStatus["UNKNOWN"] = "UNKNOWN";
})(TrustStatus || (exports.TrustStatus = TrustStatus = {}));
/**
 * Trust Registry Service Provider
 * Implements PCTF13 - Trust Registry component
 */
class TrustRegistryProvider {
    constructor(registryId, name, governanceFramework = 'DIACC-PCTF', assuranceLevel = types_1.AssuranceLevel.LOA2) {
        this.trustEntries = new Map();
        this.verificationHistory = new Map();
        this.registryId = registryId;
        this.processId = `TRUST-REG-${registryId}`;
        this.name = name;
        this.description = 'PCTF Trust Registry Service Provider';
        this.status = types_1.ProcessStatus.PENDING;
        this.assuranceLevel = assuranceLevel;
        this.governanceFramework = governanceFramework;
    }
    /**
     * Execute trust registry process
     */
    async executeProcess() {
        try {
            this.status = types_1.ProcessStatus.IN_PROGRESS;
            this.logActivity('Trust registry process started');
            // Validate registry integrity
            const integrityCheck = await this.validateRegistryIntegrity();
            if (!integrityCheck.success) {
                this.status = types_1.ProcessStatus.FAILED;
                return integrityCheck;
            }
            // Perform trust score updates
            await this.updateTrustScores();
            // Check for expired entries
            await this.processExpiredEntries();
            this.status = types_1.ProcessStatus.COMPLETED;
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
        }
        catch (error) {
            this.status = types_1.ProcessStatus.FAILED;
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
    async registerParticipant(entry) {
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
     * Verify trust status of a participant
     */
    async verifyTrust(request) {
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
            this.verificationHistory.get(request.participantId).push(verificationResult);
            this.logActivity(`Trust verification completed for ${request.participantId}: ${verificationResult.trustStatus}`);
            return {
                success: true,
                message: 'Trust verification completed',
                data: { verificationResult },
                timestamp: new Date()
            };
        }
        catch (error) {
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
    getTrustEntry(participantId) {
        return this.trustEntries.get(participantId);
    }
    /**
     * Search trust registry by criteria
     */
    searchTrustRegistry(criteria) {
        return Array.from(this.trustEntries.values()).filter(entry => {
            if (criteria.type && entry.type !== criteria.type)
                return false;
            if (criteria.status && entry.status !== criteria.status)
                return false;
            if (criteria.assuranceLevel && entry.assuranceLevel !== criteria.assuranceLevel)
                return false;
            if (criteria.minTrustScore && entry.trustScore < criteria.minTrustScore)
                return false;
            return true;
        });
    }
    /**
     * Update participant status
     */
    async updateParticipantStatus(participantId, status, reason) {
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
        }
        catch (error) {
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
    getVerificationHistory(participantId) {
        return this.verificationHistory.get(participantId) || [];
    }
    /**
     * Get conformance criteria for trust registry
     */
    getConformanceCriteria() {
        return [
            {
                id: 'TRUST-001',
                description: 'Trust registry must maintain accurate participant information',
                assuranceLevel: this.assuranceLevel,
                riskLevel: types_1.RiskLevel.HIGH,
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
                riskLevel: types_1.RiskLevel.MEDIUM,
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
                riskLevel: types_1.RiskLevel.MEDIUM,
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
    validateInput(input) {
        if (!input || typeof input !== 'object') {
            return false;
        }
        const entry = input;
        return !!(entry.participantId &&
            entry.name &&
            entry.type &&
            entry.assuranceLevel &&
            entry.contactInformation);
    }
    /**
     * Log activity
     */
    logActivity(activity) {
        console.log(`[${new Date().toISOString()}] Trust Registry ${this.registryId}: ${activity}`);
    }
    // Private methods
    async validateRegistryIntegrity() {
        const issues = [];
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
    async updateTrustScores() {
        for (const [participantId, entry] of this.trustEntries) {
            const newScore = this.calculateTrustScore(entry);
            if (newScore !== entry.trustScore) {
                entry.trustScore = newScore;
                this.logActivity(`Trust score updated for ${participantId}: ${newScore}`);
            }
        }
    }
    async processExpiredEntries() {
        const now = new Date();
        for (const [participantId, entry] of this.trustEntries) {
            if (entry.expirationDate && entry.expirationDate < now && entry.status === TrustStatus.TRUSTED) {
                entry.status = TrustStatus.SUSPENDED;
                this.logActivity(`Entry ${participantId} suspended due to expiration`);
            }
        }
    }
    async validateCertifications(certifications) {
        const issues = [];
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
    async performTrustVerification(entry, request) {
        const passed = [];
        const failed = [];
        const warnings = [];
        // Check basic status
        if (entry.status === TrustStatus.TRUSTED) {
            passed.push('Trust status verification');
        }
        else {
            failed.push(`Trust status is ${entry.status}`);
        }
        // Check certifications
        const activeCerts = entry.certifications.filter(cert => cert.status === 'ACTIVE' &&
            (!cert.expirationDate || cert.expirationDate > new Date()));
        if (activeCerts.length > 0) {
            passed.push('Active certifications found');
        }
        else {
            failed.push('No active certifications');
        }
        // Check trust score
        if (entry.trustScore >= 70) {
            passed.push('Trust score meets threshold');
        }
        else if (entry.trustScore >= 50) {
            warnings.push('Trust score below recommended threshold');
        }
        else {
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
    calculateTrustScore(entry) {
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
            case types_1.AssuranceLevel.LOA4:
                score += 20;
                break;
            case types_1.AssuranceLevel.LOA3:
                score += 15;
                break;
            case types_1.AssuranceLevel.LOA2:
                score += 10;
                break;
            case types_1.AssuranceLevel.LOA1:
                score += 5;
                break;
        }
        // Certifications contribution
        const activeCerts = entry.certifications.filter(cert => cert.status === 'ACTIVE' &&
            (!cert.expirationDate || cert.expirationDate > new Date()));
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
exports.TrustRegistryProvider = TrustRegistryProvider;
//# sourceMappingURL=trust-registry-provider.js.map