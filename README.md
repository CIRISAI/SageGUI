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

pnpm install

cp .env.example .env.local
# Configure your environment variables

pnpm prisma migrate deploy
pnpm dev
```

Visit http://localhost:3000

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

**Version**: 1.0.0-alpha (November 2025)

### Implemented
- Core DSAR workflow
- SQL connector support
- Privacy schema management
- Basic reporting

### Planned
- REST API connectors
- Enhanced reporting
- Bulk operations
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
