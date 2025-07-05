/**
 * Authentication Session
 * Represents an authenticated session with security controls
 */
import { AssuranceLevel } from '../shared/types';
/**
 * Session parameters for session initiation
 */
export interface SessionParameters {
    assuranceLevel: AssuranceLevel;
    maxDuration: number;
    allowConcurrentSessions?: boolean;
    requireReauthentication?: boolean;
}
/**
 * Authentication Session class
 */
export declare class AuthenticationSession {
    sessionId: string;
    subjectId: string;
    assuranceLevel: AssuranceLevel;
    initiatedAt: Date;
    expiresAt: Date;
    isActive: boolean;
    lastActivity?: Date;
    ipAddress?: string;
    userAgent?: string;
    constructor(sessionId: string, subjectId: string, assuranceLevel: AssuranceLevel, initiatedAt: Date, maxDuration: number);
    terminate(): void;
    isExpired(): boolean;
    updateActivity(): void;
    extendSession(additionalMinutes: number): void;
    getRemainingTime(): number;
}
//# sourceMappingURL=authentication-session.d.ts.map