"use strict";
/**
 * Authentication Session
 * Represents an authenticated session with security controls
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationSession = void 0;
/**
 * Authentication Session class
 */
class AuthenticationSession {
    constructor(sessionId, subjectId, assuranceLevel, initiatedAt, maxDuration // in minutes
    ) {
        this.sessionId = sessionId;
        this.subjectId = subjectId;
        this.assuranceLevel = assuranceLevel;
        this.initiatedAt = initiatedAt;
        this.expiresAt = new Date(initiatedAt.getTime() + maxDuration * 60 * 1000);
        this.isActive = true;
        this.lastActivity = initiatedAt;
    }
    terminate() {
        this.isActive = false;
    }
    isExpired() {
        return new Date() > this.expiresAt;
    }
    updateActivity() {
        this.lastActivity = new Date();
    }
    extendSession(additionalMinutes) {
        if (this.isActive && !this.isExpired()) {
            this.expiresAt = new Date(this.expiresAt.getTime() + additionalMinutes * 60 * 1000);
        }
    }
    getRemainingTime() {
        if (!this.isActive || this.isExpired()) {
            return 0;
        }
        return Math.max(0, this.expiresAt.getTime() - new Date().getTime()) / (1000 * 60); // in minutes
    }
}
exports.AuthenticationSession = AuthenticationSession;
//# sourceMappingURL=authentication-session.js.map