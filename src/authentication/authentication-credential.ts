/**
 * Authentication Credential
 * Represents a credential issued by an Authentication Service Provider
 */

import { AssuranceLevel, CredentialStatus } from '../types';

export enum CredentialType {
  PASSWORD = 'PASSWORD',
  BIOMETRIC = 'BIOMETRIC',
  CERTIFICATE = 'CERTIFICATE',
  TOKEN = 'TOKEN',
  SMARTCARD = 'SMARTCARD'
}

/**
 * Authentication Credential class
 */
export class AuthenticationCredential {
  public credentialId: string;
  public subjectId: string;
  public credentialType: CredentialType;
  public assuranceLevel: AssuranceLevel;
  public issuedAt: Date;
  public expiresAt: Date;
  public status: CredentialStatus;
  public lastUsed?: Date;
  public suspensionReason?: string;
  public revocationReason?: string;
  public revokedAt?: Date;

  constructor(
    credentialId: string,
    subjectId: string,
    credentialType: CredentialType,
    assuranceLevel: AssuranceLevel,
    issuedAt: Date,
    expiresAt: Date
  ) {
    this.credentialId = credentialId;
    this.subjectId = subjectId;
    this.credentialType = credentialType;
    this.assuranceLevel = assuranceLevel;
    this.issuedAt = issuedAt;
    this.expiresAt = expiresAt;
    this.status = CredentialStatus.ACTIVE;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  suspend(reason: string): void {
    this.status = CredentialStatus.SUSPENDED;
    this.suspensionReason = reason;
  }

  revoke(reason: string): void {
    this.status = CredentialStatus.REVOKED;
    this.revocationReason = reason;
    this.revokedAt = new Date();
  }

  reactivate(): void {
    if (this.status === CredentialStatus.SUSPENDED) {
      this.status = CredentialStatus.ACTIVE;
      this.suspensionReason = undefined;
    }
  }

  updateLastUsed(): void {
    this.lastUsed = new Date();
  }
}
