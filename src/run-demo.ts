#!/usr/bin/env node

/**
 * Demo runner for DIACC PCTF Framework
 */

import { demonstratePCTFFramework } from './demo';

async function runDemo() {
  try {
    await demonstratePCTFFramework();
  } catch (error) {
    console.error('Demo failed:', error);
    process.exit(1);
  }
}

runDemo();
