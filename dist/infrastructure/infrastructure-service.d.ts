/**
 * DIACC PCTF Infrastructure Service (PCTF08)
 * Provides technology and operations for trusted infrastructure
 */
import { AssuranceLevel, ConformanceCriteria, TrustedProcess, ProcessResult, ProcessStatus } from '../shared/types';
/**
 * Infrastructure security levels
 */
export declare enum SecurityLevel {
    BASIC = "BASIC",
    ENHANCED = "ENHANCED",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
/**
 * Infrastructure component types
 */
export declare enum InfrastructureComponent {
    NETWORK = "NETWORK",
    STORAGE = "STORAGE",
    COMPUTE = "COMPUTE",
    SECURITY = "SECURITY",
    MONITORING = "MONITORING",
    BACKUP = "BACKUP"
}
/**
 * Infrastructure monitoring metrics
 */
export interface InfrastructureMetrics {
    componentId: string;
    componentType: InfrastructureComponent;
    availability: number;
    performance: number;
    securityScore: number;
    lastUpdated: Date;
    alerts: InfrastructureAlert[];
}
/**
 * Infrastructure alert interface
 */
export interface InfrastructureAlert {
    alertId: string;
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
    message: string;
    component: InfrastructureComponent;
    timestamp: Date;
    resolved: boolean;
}
/**
 * Infrastructure configuration interface
 */
export interface InfrastructureConfig {
    componentId: string;
    componentType: InfrastructureComponent;
    securityLevel: SecurityLevel;
    configuration: Record<string, any>;
    certifications: string[];
    complianceStandards: string[];
}
/**
 * PCTF Infrastructure Service Provider
 * Implements PCTF08 - Infrastructure component
 */
export declare class InfrastructureServiceProvider implements TrustedProcess {
    readonly processId: string;
    readonly name: string;
    readonly description: string;
    status: ProcessStatus;
    readonly assuranceLevel: AssuranceLevel;
    private providerId;
    private securityLevel;
    private components;
    private metrics;
    private alerts;
    constructor(providerId: string, name: string, securityLevel?: SecurityLevel, assuranceLevel?: AssuranceLevel);
    /**
     * Execute infrastructure process
     */
    executeProcess(): Promise<ProcessResult>;
    /**
     * Register an infrastructure component
     */
    registerComponent(config: InfrastructureConfig): Promise<ProcessResult>;
    /**
     * Get infrastructure metrics
     */
    getMetrics(componentId?: string): InfrastructureMetrics[];
    /**
     * Get active alerts
     */
    getActiveAlerts(): InfrastructureAlert[];
    /**
     * Get conformance criteria for infrastructure
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
    private performHealthCheck;
    private validateSecurity;
    private calculateSecurityScore;
    private createAlert;
}
//# sourceMappingURL=infrastructure-service.d.ts.map