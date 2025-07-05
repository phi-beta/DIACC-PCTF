/**
 * DIACC PCTF Infrastructure Service (PCTF08)
 * Provides technology and operations for trusted infrastructure
 */

import { 
  AssuranceLevel, 
  RiskLevel, 
  ConformanceCriteria, 
  TrustedProcess, 
  ProcessResult, 
  ProcessStatus 
} from '../shared/types';

/**
 * Infrastructure security levels
 */
export enum SecurityLevel {
  BASIC = 'BASIC',
  ENHANCED = 'ENHANCED',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Infrastructure component types
 */
export enum InfrastructureComponent {
  NETWORK = 'NETWORK',
  STORAGE = 'STORAGE',
  COMPUTE = 'COMPUTE',
  SECURITY = 'SECURITY',
  MONITORING = 'MONITORING',
  BACKUP = 'BACKUP'
}

/**
 * Infrastructure monitoring metrics
 */
export interface InfrastructureMetrics {
  componentId: string;
  componentType: InfrastructureComponent;
  availability: number; // percentage
  performance: number; // response time in ms
  securityScore: number; // 0-100
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
export class InfrastructureServiceProvider implements TrustedProcess {
  public readonly processId: string;
  public readonly name: string;
  public readonly description: string;
  public status: ProcessStatus;
  public readonly assuranceLevel: AssuranceLevel;

  private providerId: string;
  private securityLevel: SecurityLevel;
  private components: Map<string, InfrastructureConfig> = new Map();
  private metrics: Map<string, InfrastructureMetrics> = new Map();
  private alerts: InfrastructureAlert[] = [];

  constructor(
    providerId: string,
    name: string,
    securityLevel: SecurityLevel = SecurityLevel.ENHANCED,
    assuranceLevel: AssuranceLevel = AssuranceLevel.LOA2
  ) {
    this.providerId = providerId;
    this.processId = `INFRA-${providerId}`;
    this.name = name;
    this.description = 'PCTF Infrastructure Service Provider';
    this.status = ProcessStatus.PENDING;
    this.assuranceLevel = assuranceLevel;
    this.securityLevel = securityLevel;
  }

  /**
   * Execute infrastructure process
   */
  async executeProcess(): Promise<ProcessResult> {
    try {
      this.status = ProcessStatus.IN_PROGRESS;
      this.logActivity('Infrastructure service process started');

      // Perform infrastructure health checks
      const healthCheck = await this.performHealthCheck();
      if (!healthCheck.success) {
        this.status = ProcessStatus.FAILED;
        return healthCheck;
      }

      // Validate security compliance
      const securityValidation = await this.validateSecurity();
      if (!securityValidation.success) {
        this.status = ProcessStatus.FAILED;
        return securityValidation;
      }

      this.status = ProcessStatus.COMPLETED;
      this.logActivity('Infrastructure service process completed successfully');

      return {
        success: true,
        message: 'Infrastructure service validated successfully',
        data: {
          providerId: this.providerId,
          securityLevel: this.securityLevel,
          componentCount: this.components.size,
          healthStatus: 'HEALTHY'
        },
        timestamp: new Date()
      };
    } catch (error) {
      this.status = ProcessStatus.FAILED;
      return {
        success: false,
        message: 'Infrastructure service process failed',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Register an infrastructure component
   */
  async registerComponent(config: InfrastructureConfig): Promise<ProcessResult> {
    try {
      if (!this.validateInput(config)) {
        return {
          success: false,
          message: 'Invalid infrastructure component configuration',
          timestamp: new Date()
        };
      }

      this.components.set(config.componentId, config);
      this.logActivity(`Infrastructure component registered: ${config.componentId}`);

      // Initialize metrics for the component
      const initialMetrics: InfrastructureMetrics = {
        componentId: config.componentId,
        componentType: config.componentType,
        availability: 100,
        performance: 0,
        securityScore: this.calculateSecurityScore(config),
        lastUpdated: new Date(),
        alerts: []
      };

      this.metrics.set(config.componentId, initialMetrics);

      return {
        success: true,
        message: 'Infrastructure component registered successfully',
        data: { componentId: config.componentId },
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to register infrastructure component',
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date()
      };
    }
  }

  /**
   * Get infrastructure metrics
   */
  getMetrics(componentId?: string): InfrastructureMetrics[] {
    if (componentId) {
      const metrics = this.metrics.get(componentId);
      return metrics ? [metrics] : [];
    }
    return Array.from(this.metrics.values());
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): InfrastructureAlert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  /**
   * Get conformance criteria for infrastructure
   */
  getConformanceCriteria(): ConformanceCriteria[] {
    return [
      {
        id: 'INFRA-001',
        description: 'Infrastructure components must meet minimum security standards',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.HIGH,
        isRequired: true,
        mitigationStrategies: [
          'Implement multi-layered security controls',
          'Regular security assessments and audits',
          'Continuous monitoring and alerting'
        ]
      },
      {
        id: 'INFRA-002',
        description: 'Infrastructure must maintain 99.9% availability',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.MEDIUM,
        isRequired: true,
        mitigationStrategies: [
          'Implement redundancy and failover mechanisms',
          'Regular backup and disaster recovery testing',
          'Performance monitoring and capacity planning'
        ]
      },
      {
        id: 'INFRA-003',
        description: 'All infrastructure changes must be logged and auditable',
        assuranceLevel: this.assuranceLevel,
        riskLevel: RiskLevel.MEDIUM,
        isRequired: true,
        mitigationStrategies: [
          'Comprehensive audit logging',
          'Change management processes',
          'Regular compliance reviews'
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

    const config = input as InfrastructureConfig;
    return !!(
      config.componentId &&
      config.componentType &&
      config.securityLevel &&
      config.configuration
    );
  }

  /**
   * Log activity
   */
  logActivity(activity: string): void {
    console.log(`[${new Date().toISOString()}] Infrastructure Service ${this.providerId}: ${activity}`);
  }

  // Private methods
  private async performHealthCheck(): Promise<ProcessResult> {
    const unhealthyComponents: string[] = [];

    for (const [componentId, metrics] of this.metrics) {
      if (metrics.availability < 99.0 || metrics.securityScore < 80) {
        unhealthyComponents.push(componentId);
      }
    }

    if (unhealthyComponents.length > 0) {
      return {
        success: false,
        message: 'Infrastructure health check failed',
        errors: [`Unhealthy components: ${unhealthyComponents.join(', ')}`],
        timestamp: new Date()
      };
    }

    return {
      success: true,
      message: 'Infrastructure health check passed',
      timestamp: new Date()
    };
  }

  private async validateSecurity(): Promise<ProcessResult> {
    const securityIssues: string[] = [];

    for (const [componentId, config] of this.components) {
      if (config.securityLevel === SecurityLevel.BASIC && this.assuranceLevel !== AssuranceLevel.LOA1) {
        securityIssues.push(`Component ${componentId} has insufficient security level`);
      }

      if (!config.certifications || config.certifications.length === 0) {
        securityIssues.push(`Component ${componentId} lacks required certifications`);
      }
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

  private calculateSecurityScore(config: InfrastructureConfig): number {
    let score = 50; // Base score

    // Security level contribution
    switch (config.securityLevel) {
      case SecurityLevel.CRITICAL:
        score += 40;
        break;
      case SecurityLevel.HIGH:
        score += 30;
        break;
      case SecurityLevel.ENHANCED:
        score += 20;
        break;
      case SecurityLevel.BASIC:
        score += 10;
        break;
    }

    // Certifications contribution
    score += Math.min(config.certifications?.length * 5 || 0, 20);

    // Compliance standards contribution
    score += Math.min(config.complianceStandards?.length * 3 || 0, 15);

    return Math.min(score, 100);
  }

  private createAlert(severity: InfrastructureAlert['severity'], message: string, component: InfrastructureComponent): void {
    const alert: InfrastructureAlert = {
      alertId: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      severity,
      message,
      component,
      timestamp: new Date(),
      resolved: false
    };

    this.alerts.push(alert);
    this.logActivity(`Alert created: ${severity} - ${message}`);
  }
}
