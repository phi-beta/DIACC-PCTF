"use strict";
/**
 * DIACC PCTF Digital Wallet Service (PCTF12)
 * Provides digital identity and asset management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalWalletProvider = exports.WalletOperation = exports.SecurityFeature = exports.WalletType = void 0;
const types_1 = require("../shared/types");
/**
 * Digital wallet types
 */
var WalletType;
(function (WalletType) {
    WalletType["MOBILE"] = "MOBILE";
    WalletType["WEB"] = "WEB";
    WalletType["HARDWARE"] = "HARDWARE";
    WalletType["CLOUD"] = "CLOUD";
    WalletType["HYBRID"] = "HYBRID";
})(WalletType || (exports.WalletType = WalletType = {}));
/**
 * Wallet security features
 */
var SecurityFeature;
(function (SecurityFeature) {
    SecurityFeature["BIOMETRIC_AUTH"] = "BIOMETRIC_AUTH";
    SecurityFeature["MULTI_FACTOR_AUTH"] = "MULTI_FACTOR_AUTH";
    SecurityFeature["HARDWARE_SECURITY_MODULE"] = "HARDWARE_SECURITY_MODULE";
    SecurityFeature["SECURE_ENCLAVE"] = "SECURE_ENCLAVE";
    SecurityFeature["END_TO_END_ENCRYPTION"] = "END_TO_END_ENCRYPTION";
})(SecurityFeature || (exports.SecurityFeature = SecurityFeature = {}));
/**
 * Wallet operation types
 */
var WalletOperation;
(function (WalletOperation) {
    WalletOperation["STORE_CREDENTIAL"] = "STORE_CREDENTIAL";
    WalletOperation["RETRIEVE_CREDENTIAL"] = "RETRIEVE_CREDENTIAL";
    WalletOperation["PRESENT_CREDENTIAL"] = "PRESENT_CREDENTIAL";
    WalletOperation["REVOKE_CREDENTIAL"] = "REVOKE_CREDENTIAL";
    WalletOperation["BACKUP_WALLET"] = "BACKUP_WALLET";
    WalletOperation["RESTORE_WALLET"] = "RESTORE_WALLET";
})(WalletOperation || (exports.WalletOperation = WalletOperation = {}));
/**
 * Digital Wallet Provider
 * Implements PCTF12 - Digital Wallet component
 */
class DigitalWalletProvider {
    constructor(walletId, ownerId, walletType, name, assuranceLevel = types_1.AssuranceLevel.LOA2) {
        this.credentials = new Map();
        this.activityLog = [];
        this.isLocked = true;
        this.walletId = walletId;
        this.ownerId = ownerId;
        this.walletType = walletType;
        this.processId = `WALLET-${walletId}`;
        this.name = name;
        this.description = 'PCTF Digital Wallet Provider';
        this.status = types_1.ProcessStatus.PENDING;
        this.assuranceLevel = assuranceLevel;
        this.securityFeatures = this.getDefaultSecurityFeatures(walletType);
    }
    /**
     * Execute wallet process
     */
    async executeProcess() {
        try {
            this.status = types_1.ProcessStatus.IN_PROGRESS;
            this.logActivity('Digital wallet process started');
            // Validate wallet security
            const securityValidation = await this.validateSecurity();
            if (!securityValidation.success) {
                this.status = types_1.ProcessStatus.FAILED;
                return securityValidation;
            }
            // Verify credential integrity
            const credentialValidation = await this.validateCredentials();
            if (!credentialValidation.success) {
                this.status = types_1.ProcessStatus.FAILED;
                return credentialValidation;
            }
            this.status = types_1.ProcessStatus.COMPLETED;
            this.logActivity('Digital wallet process completed successfully');
            return {
                success: true,
                message: 'Digital wallet validated successfully',
                data: {
                    walletId: this.walletId,
                    walletType: this.walletType,
                    credentialCount: this.credentials.size,
                    securityFeatures: this.securityFeatures
                },
                timestamp: new Date()
            };
        }
        catch (error) {
            this.status = types_1.ProcessStatus.FAILED;
            return {
                success: false,
                message: 'Digital wallet process failed',
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                timestamp: new Date()
            };
        }
    }
    /**
     * Unlock wallet with authentication
     */
    async unlockWallet(authenticationProof) {
        try {
            if (!this.validateInput(authenticationProof)) {
                return {
                    success: false,
                    message: 'Invalid authentication proof',
                    timestamp: new Date()
                };
            }
            // Simulate authentication validation
            const isValid = await this.validateAuthentication(authenticationProof);
            if (!isValid) {
                this.logWalletActivity(WalletOperation.RETRIEVE_CREDENTIAL, undefined, 'FAILURE', 'Authentication failed');
                return {
                    success: false,
                    message: 'Authentication failed',
                    timestamp: new Date()
                };
            }
            this.isLocked = false;
            this.logWalletActivity(WalletOperation.RETRIEVE_CREDENTIAL, undefined, 'SUCCESS', 'Wallet unlocked');
            return {
                success: true,
                message: 'Wallet unlocked successfully',
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to unlock wallet',
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                timestamp: new Date()
            };
        }
    }
    /**
     * Store a digital credential in the wallet
     */
    async storeCredential(credential) {
        try {
            if (this.isLocked) {
                return {
                    success: false,
                    message: 'Wallet is locked',
                    timestamp: new Date()
                };
            }
            if (!this.validateInput(credential)) {
                return {
                    success: false,
                    message: 'Invalid credential data',
                    timestamp: new Date()
                };
            }
            // Verify credential proof
            const proofValidation = await this.verifyCredentialProof(credential);
            if (!proofValidation.success) {
                this.logWalletActivity(WalletOperation.STORE_CREDENTIAL, credential.credentialId, 'FAILURE', 'Proof verification failed');
                return proofValidation;
            }
            this.credentials.set(credential.credentialId, credential);
            this.logWalletActivity(WalletOperation.STORE_CREDENTIAL, credential.credentialId, 'SUCCESS', 'Credential stored');
            return {
                success: true,
                message: 'Credential stored successfully',
                data: { credentialId: credential.credentialId },
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to store credential',
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                timestamp: new Date()
            };
        }
    }
    /**
     * Retrieve a credential from the wallet
     */
    async retrieveCredential(credentialId) {
        try {
            if (this.isLocked) {
                return {
                    success: false,
                    message: 'Wallet is locked',
                    timestamp: new Date()
                };
            }
            const credential = this.credentials.get(credentialId);
            if (!credential) {
                this.logWalletActivity(WalletOperation.RETRIEVE_CREDENTIAL, credentialId, 'FAILURE', 'Credential not found');
                return {
                    success: false,
                    message: 'Credential not found',
                    timestamp: new Date()
                };
            }
            // Check credential status
            if (credential.status !== types_1.CredentialStatus.ACTIVE) {
                this.logWalletActivity(WalletOperation.RETRIEVE_CREDENTIAL, credentialId, 'FAILURE', `Credential status: ${credential.status}`);
                return {
                    success: false,
                    message: `Credential is ${credential.status.toLowerCase()}`,
                    timestamp: new Date()
                };
            }
            this.logWalletActivity(WalletOperation.RETRIEVE_CREDENTIAL, credentialId, 'SUCCESS', 'Credential retrieved');
            return {
                success: true,
                message: 'Credential retrieved successfully',
                data: { credential },
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve credential',
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                timestamp: new Date()
            };
        }
    }
    /**
     * Present credentials for verification
     */
    async presentCredentials(credentialIds, presentationRequest) {
        try {
            if (this.isLocked) {
                return {
                    success: false,
                    message: 'Wallet is locked',
                    timestamp: new Date()
                };
            }
            const presentedCredentials = [];
            const errors = [];
            for (const credentialId of credentialIds) {
                const credential = this.credentials.get(credentialId);
                if (!credential) {
                    errors.push(`Credential ${credentialId} not found`);
                    continue;
                }
                if (credential.status !== types_1.CredentialStatus.ACTIVE) {
                    errors.push(`Credential ${credentialId} is ${credential.status.toLowerCase()}`);
                    continue;
                }
                presentedCredentials.push(credential);
            }
            if (errors.length > 0) {
                return {
                    success: false,
                    message: 'Credential presentation failed',
                    errors,
                    timestamp: new Date()
                };
            }
            this.logWalletActivity(WalletOperation.PRESENT_CREDENTIAL, credentialIds.join(','), 'SUCCESS', 'Credentials presented');
            return {
                success: true,
                message: 'Credentials presented successfully',
                data: {
                    credentials: presentedCredentials,
                    presentationId: `PRES-${Date.now()}`
                },
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to present credentials',
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                timestamp: new Date()
            };
        }
    }
    /**
     * Get wallet activity log
     */
    getActivityLog(limit) {
        const activities = this.activityLog.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        return limit ? activities.slice(0, limit) : activities;
    }
    /**
     * Get all stored credentials
     */
    getAllCredentials() {
        return Array.from(this.credentials.values()).filter(cred => cred.status === types_1.CredentialStatus.ACTIVE);
    }
    /**
     * Get conformance criteria for digital wallet
     */
    getConformanceCriteria() {
        return [
            {
                id: 'WALLET-001',
                description: 'Digital wallet must implement strong authentication mechanisms',
                assuranceLevel: this.assuranceLevel,
                riskLevel: types_1.RiskLevel.HIGH,
                isRequired: true,
                mitigationStrategies: [
                    'Multi-factor authentication required',
                    'Biometric authentication where supported',
                    'Hardware security module integration'
                ]
            },
            {
                id: 'WALLET-002',
                description: 'Credentials must be stored with end-to-end encryption',
                assuranceLevel: this.assuranceLevel,
                riskLevel: types_1.RiskLevel.HIGH,
                isRequired: true,
                mitigationStrategies: [
                    'AES-256 encryption for credential storage',
                    'Key derivation from user authentication',
                    'Secure key management practices'
                ]
            },
            {
                id: 'WALLET-003',
                description: 'All wallet operations must be logged and auditable',
                assuranceLevel: this.assuranceLevel,
                riskLevel: types_1.RiskLevel.MEDIUM,
                isRequired: true,
                mitigationStrategies: [
                    'Comprehensive audit logging',
                    'Tamper-evident log storage',
                    'Regular log review and analysis'
                ]
            }
        ];
    }
    /**
     * Validate input data
     */
    validateInput(input) {
        return input !== null && input !== undefined;
    }
    /**
     * Log activity
     */
    logActivity(activity) {
        console.log(`[${new Date().toISOString()}] Digital Wallet ${this.walletId}: ${activity}`);
    }
    // Private methods
    getDefaultSecurityFeatures(walletType) {
        const features = [SecurityFeature.END_TO_END_ENCRYPTION];
        switch (walletType) {
            case WalletType.HARDWARE:
                features.push(SecurityFeature.HARDWARE_SECURITY_MODULE);
                break;
            case WalletType.MOBILE:
                features.push(SecurityFeature.BIOMETRIC_AUTH, SecurityFeature.SECURE_ENCLAVE);
                break;
            case WalletType.WEB:
            case WalletType.CLOUD:
                features.push(SecurityFeature.MULTI_FACTOR_AUTH);
                break;
            case WalletType.HYBRID:
                features.push(SecurityFeature.MULTI_FACTOR_AUTH, SecurityFeature.BIOMETRIC_AUTH);
                break;
        }
        return features;
    }
    async validateSecurity() {
        const securityIssues = [];
        // Check minimum security features based on assurance level
        if (this.assuranceLevel === types_1.AssuranceLevel.LOA3 || this.assuranceLevel === types_1.AssuranceLevel.LOA4) {
            if (!this.securityFeatures.includes(SecurityFeature.MULTI_FACTOR_AUTH) &&
                !this.securityFeatures.includes(SecurityFeature.BIOMETRIC_AUTH)) {
                securityIssues.push('High assurance levels require multi-factor or biometric authentication');
            }
        }
        if (!this.securityFeatures.includes(SecurityFeature.END_TO_END_ENCRYPTION)) {
            securityIssues.push('End-to-end encryption is required');
        }
        if (securityIssues.length > 0) {
            return {
                success: false,
                message: 'Security validation failed',
                errors: securityIssues,
                timestamp: new Date()
            };
        }
        return {
            success: true,
            message: 'Security validation passed',
            timestamp: new Date()
        };
    }
    async validateCredentials() {
        const issues = [];
        for (const [credentialId, credential] of this.credentials) {
            // Check expiration
            if (credential.expirationDate && credential.expirationDate < new Date()) {
                credential.status = types_1.CredentialStatus.EXPIRED;
                issues.push(`Credential ${credentialId} has expired`);
            }
            // Validate proof structure
            if (!credential.proof || !credential.proof.signature) {
                issues.push(`Credential ${credentialId} has invalid proof`);
            }
        }
        if (issues.length > 0) {
            this.logActivity(`Credential validation issues found: ${issues.length}`);
        }
        return {
            success: true,
            message: `Credential validation completed with ${issues.length} issues`,
            data: { issues },
            timestamp: new Date()
        };
    }
    async validateAuthentication(authenticationProof) {
        // Simplified authentication validation
        // In a real implementation, this would verify biometrics, passwords, etc.
        return authenticationProof && authenticationProof.type && authenticationProof.value;
    }
    async verifyCredentialProof(credential) {
        // Simplified proof verification
        // In a real implementation, this would verify cryptographic signatures
        if (!credential.proof || !credential.proof.signature || !credential.proof.verificationMethod) {
            return {
                success: false,
                message: 'Invalid credential proof',
                timestamp: new Date()
            };
        }
        return {
            success: true,
            message: 'Credential proof verified',
            timestamp: new Date()
        };
    }
    logWalletActivity(operation, credentialId, result, details) {
        const activity = {
            activityId: `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            operation,
            credentialId,
            timestamp: new Date(),
            result,
            details
        };
        this.activityLog.push(activity);
        this.logActivity(`${operation}: ${result} - ${details}`);
    }
}
exports.DigitalWalletProvider = DigitalWalletProvider;
//# sourceMappingURL=digital-wallet-provider.js.map