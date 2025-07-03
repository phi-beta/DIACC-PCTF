/**
 * Authentication Session
 * Represents an authenticated session with security controls
 */

import { AssuranceLevel } from '../types';

/**
 * Session parameters for session initiation
 */
export interface SessionParameters {
  assuranceLevel: AssuranceLevel;
  maxDuration: number; // in minutes
  allowConcurrentSessions?: boolean;
  requireReauthentication?: boolean;
}

/**
 * Authentication Session class
 */
export class AuthenticationSession {
  public sessionId: string;
  public subjectId: string;
  public assuranceLevel: AssuranceLevel;
  public initiatedAt: Date;
  public expiresAt: Date;
  public isActive: boolean;
  public lastActivity?: Date;
  public ipAddress?: string;
  public userAgent?: string;

  constructor(
    sessionId: string,
    subjectId: string,
    assuranceLevel: AssuranceLevel,
    initiatedAt: Date,
    maxDuration: number // in minutes
  ) {
    this.sessionId = sessionId;
    this.subjectId = subjectId;
    this.assuranceLevel = assuranceLevel;
    this.initiatedAt = initiatedAt;
    this.expiresAt = new Date(initiatedAt.getTime() + maxDuration * 60 * 1000);
    this.isActive = true;
    this.lastActivity = initiatedAt;
  }

  terminate(): void {
    this.isActive = false;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  updateActivity(): void {
    this.lastActivity = new Date();
  }

  extendSession(additionalMinutes: number): void {
    if (this.isActive && !this.isExpired()) {
      this.expiresAt = new Date(this.expiresAt.getTime() + additionalMinutes * 60 * 1000);
    }
  }

  getRemainingTime(): number {
    if (!this.isActive || this.isExpired()) {
      return 0;
    }
    return Math.max(0, this.expiresAt.getTime() - new Date().getTime()) / (1000 * 60); // in minutes
  }
}
