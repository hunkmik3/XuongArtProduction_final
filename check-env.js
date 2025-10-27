#!/usr/bin/env node
/**
 * Check Environment Variables Script
 * Verifies that all required environment variables are set before starting the app
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.magenta}${msg}${colors.reset}\n`),
};

// Required environment variables
const REQUIRED_FRONTEND = [
  'NEXT_PUBLIC_STRAPI_API_URL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const REQUIRED_BACKEND = [
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'JWT_SECRET',
  'DATABASE_CLIENT',
];

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} exists: ${filePath}`);
    return true;
  } else {
    log.error(`${description} not found: ${filePath}`);
    return false;
  }
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const env = {};
  
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

function checkEnvVars(env, required, context) {
  log.title(`Checking ${context} Environment Variables:`);
  
  let allPresent = true;
  const missing = [];
  
  required.forEach(varName => {
    if (env[varName] && env[varName] !== '') {
      log.success(`${varName} is set`);
    } else {
      log.error(`${varName} is missing or empty`);
      missing.push(varName);
      allPresent = false;
    }
  });
  
  return { allPresent, missing };
}

function printSuggestions(missing, envFile) {
  if (missing.length === 0) return;
  
  log.warn(`\nMissing variables in ${envFile}:`);
  missing.forEach(v => {
    console.log(`  - ${v}`);
  });
  
  log.info(`\nPlease add these variables to your ${envFile} file.`);
  log.info(`You can use ${envFile === '.env.local' ? 'env.example' : 'xuongart-new/env.example'} as a template.\n`);
}

// Main execution
function main() {
  console.log('\n' + '='.repeat(60));
  log.title('🔍 XưởngArt Studio - Environment Check');
  console.log('='.repeat(60));
  
  let hasErrors = false;
  
  // Check Frontend
  log.title('📦 Frontend (Next.js)');
  
  const frontendEnvFile = '.env.local';
  const hasFrontendEnv = checkFile(frontendEnvFile, 'Frontend environment file');
  
  if (!hasFrontendEnv) {
    log.warn(`Create ${frontendEnvFile} from env.example template`);
    hasErrors = true;
  } else {
    const frontendEnv = loadEnv(frontendEnvFile);
    const frontendCheck = checkEnvVars(frontendEnv, REQUIRED_FRONTEND, 'Frontend');
    
    if (!frontendCheck.allPresent) {
      printSuggestions(frontendCheck.missing, frontendEnvFile);
      hasErrors = true;
    }
  }
  
  // Check Backend
  log.title('📦 Backend (Strapi)');
  
  const backendEnvFile = path.join('xuongart-new', '.env');
  const hasBackendEnv = checkFile(backendEnvFile, 'Backend environment file');
  
  if (!hasBackendEnv) {
    log.warn(`Create ${backendEnvFile} from xuongart-new/env.example template`);
    hasErrors = true;
  } else {
    const backendEnv = loadEnv(backendEnvFile);
    const backendCheck = checkEnvVars(backendEnv, REQUIRED_BACKEND, 'Backend');
    
    if (!backendCheck.allPresent) {
      printSuggestions(backendCheck.missing, backendEnvFile);
      hasErrors = true;
    }
    
    // Check APP_KEYS format
    if (backendEnv.APP_KEYS) {
      const keys = backendEnv.APP_KEYS.split(',');
      if (keys.length < 4) {
        log.warn('APP_KEYS should contain at least 4 keys separated by commas');
        log.info('Generate keys with: node -p "require(\'crypto\').randomBytes(48).toString(\'base64\')"');
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  if (hasErrors) {
    log.error('Environment check failed! Please fix the issues above.');
    log.info('\nQuick fix:');
    console.log('  1. Copy env.example to .env.local');
    console.log('  2. Copy xuongart-new/env.example to xuongart-new/.env');
    console.log('  3. Fill in your credentials');
    console.log('  4. Run this script again\n');
    process.exit(1);
  } else {
    log.success('All environment variables are properly configured! 🎉');
    log.info('\nYou can now run:');
    console.log('  - npm run dev          (Frontend only)');
    console.log('  - npm run dev:all      (Frontend + Backend)');
    console.log('  - npm run dev:strapi   (Backend only)\n');
  }
  console.log('='.repeat(60) + '\n');
}

// Run
main();

