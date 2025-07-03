"use strict";
/**
 * DIACC PCTF Implementation Demo
 *
 * This file demonstrates how to use the PCTF framework implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstratePCTFFramework = demonstratePCTFFramework;
const index_1 = require("./index");
/**
 * Demo function showing PCTF framework usage
 */
async function demonstratePCTFFramework() {
    console.log('🚀 DIACC PCTF Framework Demo\n');
    // Initialize the PCTF Framework
    const framework = new index_1.PCTFFramework('DEMO-PCTF-001', '1.0.0');
    console.log('✅ PCTF Framework initialized');
    // Create sample participants
    const authServiceProvider = {
        participantId: 'ASP-001',
        name: 'SecureAuth Services Inc.',
        type: index_1.ParticipantType.AUTHENTICATION_SERVICE_PROVIDER,
        certificationLevel: index_1.AssuranceLevel.LOA3,
        isActive: true,
        registrationDate: new Date()
    };
    const identityProvider = {
        participantId: 'IDP-001',
        name: 'TrustedID Solutions',
        type: index_1.ParticipantType.IDENTITY_PROVIDER,
        certificationLevel: index_1.AssuranceLevel.LOA3,
        isActive: true,
        registrationDate: new Date()
    };
    const relyingParty = {
        participantId: 'RP-001',
        name: 'Government Services Portal',
        type: index_1.ParticipantType.RELYING_PARTY,
        certificationLevel: index_1.AssuranceLevel.LOA2,
        isActive: true,
        registrationDate: new Date()
    };
    // Register participants
    console.log('\n📋 Registering participants...');
    const authRegResult = await framework.registerParticipant(authServiceProvider);
    console.log(`   Authentication Provider: ${authRegResult.success ? '✅' : '❌'} ${authRegResult.message}`);
    const idpRegResult = await framework.registerParticipant(identityProvider);
    console.log(`   Identity Provider: ${idpRegResult.success ? '✅' : '❌'} ${idpRegResult.message}`);
    const rpRegResult = await framework.registerParticipant(relyingParty);
    console.log(`   Relying Party: ${rpRegResult.success ? '✅' : '❌'} ${rpRegResult.message}`);
    // Demonstrate Authentication Service
    console.log('\n🔐 Authentication Service Demo...');
    const authProvider = framework.getAuthenticationProvider('ASP-001');
    if (authProvider) {
        // Issue a credential
        const credResult = await authProvider.issueCredential('USER-001', index_1.CredentialType.BIOMETRIC);
        console.log(`   Credential Issuance: ${credResult.success ? '✅' : '❌'} ${credResult.message}`);
        if (credResult.success && credResult.data?.credentialId) {
            // Authenticate using the credential
            const authResult = await authProvider.authenticate(credResult.data.credentialId, 'biometric-template-123');
            console.log(`   Authentication: ${authResult.success ? '✅' : '❌'} ${authResult.message}`);
            if (authResult.success && authResult.data?.subjectId) {
                // Initiate session
                const sessionResult = await authProvider.initiateSession(authResult.data.subjectId, {
                    assuranceLevel: index_1.AssuranceLevel.LOA3,
                    maxDuration: 60 // 60 minutes
                });
                console.log(`   Session Initiation: ${sessionResult.success ? '✅' : '❌'} ${sessionResult.message}`);
            }
        }
    }
    // Demonstrate Identity Provider Service
    console.log('\n👤 Identity Provider Demo...');
    const idProvider = framework.getIdentityProvider('IDP-001');
    if (idProvider) {
        // Perform identity resolution
        const identityInfo = {
            coreAttributes: {
                givenName: 'John',
                familyName: 'Doe',
                dateOfBirth: new Date('1990-01-01'),
                address: {
                    streetAddress: '123 Main St',
                    city: 'Toronto',
                    province: 'ON',
                    postalCode: 'M5V 3A8',
                    country: 'Canada'
                }
            }
        };
        const resolutionResult = await idProvider.performIdentityResolution(identityInfo);
        console.log(`   Identity Resolution: ${resolutionResult.success ? '✅' : '❌'} ${resolutionResult.message}`);
        if (resolutionResult.success && resolutionResult.data?.personId) {
            // Establish identity
            const evidencePackage = {
                primaryEvidence: [{
                        evidenceId: 'EVIDENCE-001',
                        evidenceType: 'GOVERNMENT_ISSUED_ID',
                        issuer: 'Service Canada',
                        issuedDate: new Date('2020-01-01'),
                        expirationDate: new Date('2030-01-01'),
                        requiredFields: []
                    }]
            };
            const establishResult = await idProvider.establishIdentity(resolutionResult.data.personId, identityInfo, evidencePackage);
            console.log(`   Identity Establishment: ${establishResult.success ? '✅' : '❌'} ${establishResult.message}`);
        }
    }
    // Demonstrate Privacy Service
    console.log('\n🔒 Privacy Service Demo...');
    const privacyProvider = framework.getPrivacyProvider('RP-001');
    if (privacyProvider) {
        // Implement accountability framework
        const accountabilityResult = await privacyProvider.implementAccountability({
            privacyOfficer: {
                name: 'Jane Smith',
                title: 'Chief Privacy Officer',
                contactInfo: {
                    name: 'Jane Smith',
                    email: 'privacy@example.com',
                    phone: '+1-555-0123',
                    address: '123 Privacy St, Toronto, ON'
                }
            },
            policies: [],
            trainingProgram: {
                name: 'Privacy Fundamentals',
                modules: ['PIPEDA Principles', 'Data Handling', 'Incident Response'],
                frequency: 'Annual'
            }
        });
        console.log(`   Accountability Framework: ${accountabilityResult.success ? '✅' : '❌'} ${accountabilityResult.message}`);
        // Obtain consent
        const consentResult = await privacyProvider.obtainConsent({
            individualId: 'USER-001',
            purposes: [{
                    purposeId: 'AUTH-001',
                    description: 'User authentication for government services',
                    isRequired: true,
                    legalBasis: 'Legitimate interest'
                }],
            dataCategories: [{
                    categoryId: 'IDENTITY-001',
                    name: 'Identity Information',
                    description: 'Basic identity attributes for verification',
                    sensitivity: 'CONFIDENTIAL'
                }],
            requesterInfo: 'Government Services Portal'
        });
        console.log(`   Consent Obtainment: ${consentResult.success ? '✅' : '❌'} ${consentResult.message}`);
    }
    // Assess conformance
    console.log('\n📊 Conformance Assessment...');
    const conformanceResult = await framework.assessConformance('ASP-001');
    console.log(`   Authentication Provider Conformance: ${conformanceResult.success ? '✅' : '❌'} ${conformanceResult.message}`);
    // Validate ecosystem
    console.log('\n🌐 Ecosystem Validation...');
    const ecosystemResult = await framework.validateEcosystem();
    console.log(`   Ecosystem Validation: ${ecosystemResult.success ? '✅' : '❌'} ${ecosystemResult.message}`);
    // Generate status report
    console.log('\n📈 Framework Status Report...');
    const statusReport = framework.generateStatusReport();
    console.log(`   Framework ID: ${statusReport.frameworkId}`);
    console.log(`   Version: ${statusReport.version}`);
    console.log(`   Total Participants: ${statusReport.participantSummary.total}`);
    console.log(`   Active Participants: ${statusReport.participantSummary.active}`);
    console.log(`   Authentication Providers: ${statusReport.componentSummary.authenticationProviders}`);
    console.log(`   Identity Providers: ${statusReport.componentSummary.identityProviders}`);
    console.log(`   Privacy Providers: ${statusReport.componentSummary.privacyProviders}`);
    console.log('\n🎉 DIACC PCTF Framework Demo completed successfully!');
}
// Run the demo if this file is executed directly
// Commented out to prevent auto-execution during compilation
// if (require.main === module) {
//   demonstratePCTFFramework().catch(console.error);
// }
//# sourceMappingURL=demo.js.map