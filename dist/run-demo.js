#!/usr/bin/env node
"use strict";
/**
 * Demo runner for DIACC PCTF Framework
 */
Object.defineProperty(exports, "__esModule", { value: true });
const demo_1 = require("./demo");
async function runDemo() {
    try {
        await (0, demo_1.demonstratePCTFFramework)();
    }
    catch (error) {
        console.error('Demo failed:', error);
        process.exit(1);
    }
}
runDemo();
//# sourceMappingURL=run-demo.js.map