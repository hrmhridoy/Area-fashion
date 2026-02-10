#!/usr/bin/env bash

# Aria Fashion - Netlify Deploy Script
# Runs before Netlify builds the project
# Set in Netlify: Settings → Build & Deploy → Build settings → Pre-build command

set -e

echo "🚀 Aria Fashion - Pre-build Setup for Netlify"
echo "=============================================="

# Check Node version
echo "📦 Node version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Install dependencies
echo "⬇️  Installing dependencies..."
npm install --legacy-peer-deps

# Type checking
echo "🔍 Running TypeScript check..."
npm run type-check || true

# Linting
echo "✨ Running ESLint..."
npm run lint || true

# Build
echo "🔨 Building Next.js application..."
npm run build

echo ""
echo "✅ Pre-build completed successfully!"
echo ""
echo "📊 Build output:"
echo "  - Framework: Next.js 14"
echo "  - Output: .next"
echo "  - Functions: netlify/functions"
echo ""
