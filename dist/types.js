"use strict";
/**
 * Core types and enums for DIACC PCTF implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceType = exports.CredentialStatus = exports.PrivacyPrinciple = exports.ParticipantType = exports.ProcessStatus = exports.RiskLevel = exports.AssuranceLevel = void 0;
/**
 * Levels of Assurance as defined in PCTF
 */
var AssuranceLevel;
(function (AssuranceLevel) {
    AssuranceLevel["LOA1"] = "LOA1";
    AssuranceLevel["LOA2"] = "LOA2";
    AssuranceLevel["LOA3"] = "LOA3";
    AssuranceLevel["LOA4"] = "LOA4";
})(AssuranceLevel || (exports.AssuranceLevel = AssuranceLevel = {}));
/**
 * Risk levels for framework assessments
 */
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "LOW";
    RiskLevel["MEDIUM"] = "MEDIUM";
    RiskLevel["HIGH"] = "HIGH";
    RiskLevel["VERY_HIGH"] = "VERY_HIGH";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
/**
 * Status enumeration for various processes
 */
var ProcessStatus;
(function (ProcessStatus) {
    ProcessStatus["PENDING"] = "PENDING";
    ProcessStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProcessStatus["COMPLETED"] = "COMPLETED";
    ProcessStatus["FAILED"] = "FAILED";
    ProcessStatus["SUSPENDED"] = "SUSPENDED";
    ProcessStatus["REVOKED"] = "REVOKED";
})(ProcessStatus || (exports.ProcessStatus = ProcessStatus = {}));
/**
 * Types of participants in the PCTF ecosystem
 */
var ParticipantType;
(function (ParticipantType) {
    ParticipantType["CREDENTIAL_SERVICE_PROVIDER"] = "CREDENTIAL_SERVICE_PROVIDER";
    ParticipantType["AUTHENTICATION_SERVICE_PROVIDER"] = "AUTHENTICATION_SERVICE_PROVIDER";
    ParticipantType["IDENTITY_PROVIDER"] = "IDENTITY_PROVIDER";
    ParticipantType["VERIFIER"] = "VERIFIER";
    ParticipantType["ISSUER"] = "ISSUER";
    ParticipantType["WALLET_PROVIDER"] = "WALLET_PROVIDER";
    ParticipantType["TRUST_REGISTRY"] = "TRUST_REGISTRY";
    ParticipantType["RELYING_PARTY"] = "RELYING_PARTY";
})(ParticipantType || (exports.ParticipantType = ParticipantType = {}));
/**
 * Personal information handling principles (PIPEDA aligned)
 */
var PrivacyPrinciple;
(function (PrivacyPrinciple) {
    PrivacyPrinciple["ACCOUNTABILITY"] = "ACCOUNTABILITY";
    PrivacyPrinciple["IDENTIFYING_PURPOSE"] = "IDENTIFYING_PURPOSE";
    PrivacyPrinciple["CONSENT"] = "CONSENT";
    PrivacyPrinciple["LIMITING_COLLECTION"] = "LIMITING_COLLECTION";
    PrivacyPrinciple["LIMITING_USE_DISCLOSURE"] = "LIMITING_USE_DISCLOSURE";
    PrivacyPrinciple["ACCURACY"] = "ACCURACY";
    PrivacyPrinciple["SAFEGUARDS"] = "SAFEGUARDS";
    PrivacyPrinciple["OPENNESS"] = "OPENNESS";
    PrivacyPrinciple["INDIVIDUAL_ACCESS"] = "INDIVIDUAL_ACCESS";
    PrivacyPrinciple["CHALLENGING_COMPLIANCE"] = "CHALLENGING_COMPLIANCE";
})(PrivacyPrinciple || (exports.PrivacyPrinciple = PrivacyPrinciple = {}));
/**
 * Credential status enumeration
 */
var CredentialStatus;
(function (CredentialStatus) {
    CredentialStatus["ACTIVE"] = "ACTIVE";
    CredentialStatus["SUSPENDED"] = "SUSPENDED";
    CredentialStatus["REVOKED"] = "REVOKED";
    CredentialStatus["EXPIRED"] = "EXPIRED";
})(CredentialStatus || (exports.CredentialStatus = CredentialStatus = {}));
/**
 * Evidence types for identity verification
 */
var EvidenceType;
(function (EvidenceType) {
    EvidenceType["GOVERNMENT_ISSUED_ID"] = "GOVERNMENT_ISSUED_ID";
    EvidenceType["BIOMETRIC"] = "BIOMETRIC";
    EvidenceType["KNOWLEDGE_BASED"] = "KNOWLEDGE_BASED";
    EvidenceType["SOCIAL_VERIFICATION"] = "SOCIAL_VERIFICATION";
    EvidenceType["DOCUMENT_VERIFICATION"] = "DOCUMENT_VERIFICATION";
})(EvidenceType || (exports.EvidenceType = EvidenceType = {}));
//# sourceMappingURL=types.js.map