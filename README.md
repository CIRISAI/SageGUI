# SageGUI - GDPR Compliance Management Interface

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Web interface for managing GDPR data subject requests through the [CIRISAgent](https://github.com/CIRISAI/CIRISAgent) multi-source DSAR orchestration system.

## Overview

SageGUI provides a management interface for:
- Processing data subject access requests (DSARs) across multiple data sources
- Managing database connections and privacy schemas
- Tracking GDPR compliance metrics
- Generating audit reports

## Architecture

```
SageGUI (Next.js) → TypeScript SDK → CIRISAgent API → Data Sources
```

## Current Features

- Multi-source DSAR submission and tracking
- SQL database connector management
- YAML-based privacy schema editor
- Basic compliance reporting
- Role-based access control

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Running CIRISAgent instance with multi-source-dsar-orchestration branch

### Setup

```bash
git clone https://github.com/CIRISAI/SageGUI.git
cd SageGUI

# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env.local
# Edit .env.local with your CIRISAgent API URL and credentials

# Start development server
pnpm dev
```

Visit http://localhost:3000

### Project Structure

```
SageGUI/
├── app/                        # Next.js 14 App Router
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── dashboard/         # Main dashboard
│   │   ├── data-sources/      # Connector management
│   │   ├── dsar/              # DSAR requests
│   │   ├── privacy-schemas/   # Privacy schema editor
│   │   ├── reports/           # Compliance reports
│   │   └── settings/          # System settings
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── providers.tsx          # React Query provider
├── components/
│   └── layouts/               # Layout components (Sidebar, Header)
├── lib/
│   ├── ciris-sdk/            # TypeScript SDK
│   │   ├── client.ts         # Main CIRIS client
│   │   ├── transport.ts      # HTTP transport layer
│   │   ├── types/            # Type definitions
│   │   └── resources/        # API resources
│   └── utils.ts              # Utility functions
└── ...config files
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-ciris-instance.com
CIRIS_API_KEY=your-api-key
DATABASE_URL=postgresql://user:pass@localhost:5432/sage
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

## Privacy Schema Format

```yaml
version: 1.0
source:
  type: postgresql
  identifier: users_db
  
tables:
  users:
    pii_fields:
      - email: {type: email, purpose: authentication}
      - first_name: {type: name, purpose: identification}
    retention: 7_years
```

## Development Status

**Version**: 0.0.1 (November 2025)

### Current Release (v0.0.1)
This is the initial foundation release with:
- ✅ Project structure and configuration
- ✅ TypeScript SDK foundation (Transport, Resources, Types)
- ✅ Base page layouts and navigation
- ✅ Dashboard, Data Sources, DSAR, Privacy Schemas, Reports, Settings pages
- ✅ UI components structure (ready for shadcn/ui)

### Next Steps (v0.1.0)
- Implement React Query hooks for data fetching
- Add shadcn/ui components
- Connect pages to CIRISAgent API
- Add form validation with Zod
- Implement real-time DSAR progress tracking

### Planned (v1.0.0)
- REST API connectors
- Enhanced reporting with charts
- Bulk DSAR operations
- NextAuth authentication
- Privacy schema validation
- Internationalization

## License

This project is licensed under the GNU Affero General Public License v3.0.

**Important**: The AGPL requires that any modifications to SageGUI deployed as a network service must have their source code made available. For proprietary modifications, contact sales@ciris.ai for commercial licensing.

## Commercial Support

CIRIS L3C offers:
- Commercial licensing for proprietary use
- Deployment assistance
- Privacy schema development
- Custom connector development

Contact: sales@ciris.ai

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Acknowledgments

- Built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)
- Based on [ScoutGUI](https://github.com/CIRISAI/ScoutGUI) architecture
