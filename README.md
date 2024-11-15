## Ploom E2E Test Automation Project

This repository contains automated end-to-end tests for Ploom website using Playwright with TypeScript.

# Tech Stack
- Playwright
- TypeScript
- Node.js

# Prerequisites
- Node.js (version 14 or higher)
- npm

## Installation & Setup

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

## Available Commands
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests for specific market
npm run test:uk
npm run test:pl

# Run specific test file
npx playwright test src/tests/cart.spec.ts

# Run tests with HTML report
npm run test:report

## Test Cases

# Cart Functionality

Add product to cart
Remove product from cart
Verify cart count


# Product Page Integrity

Check for broken links
Verify images load correctly



## Features

# POM (Page Object Model) design pattern
# Multi-market support (UK, PL)
# Automatic cookie consent and age verification handling
# Screenshot capture on test failure
# HTML reporting
# TypeScript implementation
# Market-specific configurations