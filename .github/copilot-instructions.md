<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# DIACC PCTF Implementation Project

This project implements the Digital Identity and Authentication Council of Canada (DIACC) Pan-Canadian Trust Framework (PCTF) criteria and components.

## Framework Components

The PCTF consists of the following normative components:
- **Authentication** (PCTF03): Credential issuance, authentication, session management
- **Verified Person** (PCTF05): Identity proofing and verification processes
- **Privacy** (PCTF04): Personal information handling aligned with PIPEDA
- **Infrastructure** (PCTF08): Technology and operations for trusted infrastructure
- **Digital Wallet** (PCTF12): Digital identity and asset management
- **Trust Registries** (PCTF13): Ecosystem participant verification
- **Credentials** (PCTF07): Credential lifecycle management
- **Verified Organization** (PCTF06): Organization identity verification
- **Notice & Consent** (PCTF02): Personal information collection and consent

## Code Structure Guidelines

- Use TypeScript interfaces to define conformance criteria
- Implement trusted processes as class methods
- Follow PCTF terminology for class and method names
- Include risk management and mitigation strategies
- Implement levels of assurance where applicable
- Include proper documentation for all components

## Development Notes

- Focus on implementing the framework's structure and terminology
- Each component should include its trusted processes, roles, and conformance requirements
- Use enums for standardized values like assurance levels
- Include proper error handling and validation
- Follow enterprise-grade coding patterns and practices
