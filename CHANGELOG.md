# Changelog

All notable changes to SageGUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-11-04

### Added

#### Project Foundation
- Initial Next.js 14 project setup with App Router
- TypeScript configuration with strict mode
- Tailwind CSS configuration with custom theme
- ESLint and Prettier configuration
- Git configuration and .gitignore

#### TypeScript SDK
- HTTP Transport layer with timeout and error handling
- Base Resource class for API resources
- Type definitions for DSAR operations
- Type definitions for connector management
- DSARMultiSourceResource implementation
- ConnectorsResource implementation
- CIRISClient main client class

#### UI Structure
- Root layout with React Query provider
- Dashboard layout with sidebar and header navigation
- Landing page with project introduction

#### Pages
- **Dashboard** - Compliance overview with status cards and activity timeline
- **Data Sources** - Connector management with grid view and add new flow
- **DSAR Requests** - Request list with filtering and new request form
- **Privacy Schemas** - Schema library with YAML examples
- **Reports** - Compliance reports with download options
- **Settings** - System configuration for GDPR, identity resolution, and security

#### Components
- Sidebar navigation with active state
- Header with user menu and notifications placeholder
- Layout components for dashboard structure

#### Utilities
- `cn()` function for className merging
- Date formatting utilities
- Byte size formatting
- String truncation helper

### Documentation
- Comprehensive README with installation instructions
- Project structure overview
- Environment variable configuration
- Privacy schema format examples
- Implementation plan in claude.md

### Notes
This is the foundation release. All pages are static placeholders ready to be connected to the CIRISAgent API in the next release.

## [Unreleased]

### Planned for v0.1.0
- React Query hooks for data fetching
- shadcn/ui component integration
- Form validation with Zod
- Connect pages to live CIRISAgent API
- Real-time DSAR progress tracking
- Error handling and loading states

### Planned for v1.0.0
- NextAuth authentication and authorization
- REST API connector support
- Privacy schema validation
- Enhanced reporting with charts
- Bulk DSAR operations
- WebSocket support for real-time updates
- Internationalization (i18n)
