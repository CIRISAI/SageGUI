# SageGUI Implementation Plan

**Version**: 1.0
**Date**: November 2025
**Based On**: ScoutGUI architecture + CIRISAgent multi-source-dsar-orchestration APIs

---

## Executive Summary

SageGUI is a Next.js 14 web application for managing GDPR compliance through the CIRISAgent multi-source DSAR orchestration system. This document provides a comprehensive implementation plan for building SageGUI from the ground up, leveraging:

- **ScoutGUI's TypeScript SDK patterns** (adapted for DSAR operations)
- **shadcn/ui components** (consistent, accessible UI)
- **CIRISAgent multi-source APIs** (DSAR orchestration, connectors, privacy schemas)

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [TypeScript SDK Implementation](#3-typescript-sdk-implementation)
4. [Core Pages & Features](#4-core-pages--features)
5. [shadcn/ui Component Integration](#5-shadcnui-component-integration)
6. [State Management & Data Fetching](#6-state-management--data-fetching)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Development Workflow](#8-development-workflow)
9. [Testing Strategy](#9-testing-strategy)
10. [Deployment](#10-deployment)
11. [Phase 1 MVP Checklist](#11-phase-1-mvp-checklist)

---

## 1. Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS 3.4+
- **State Management**: TanStack Query v5 (React Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (compliance metrics)
- **Code Editor**: Monaco Editor (privacy schemas)

### Backend Integration
- **SDK**: Custom TypeScript SDK (based on ScoutGUI patterns)
- **API**: CIRISAgent REST API (multi-source-dsar-orchestration branch)
- **Auth**: NextAuth.js with JWT
- **Real-time**: Server-Sent Events (DSAR progress tracking)

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Testing**: Vitest + React Testing Library + Playwright
- **Git Hooks**: Husky + lint-staged

---

## 2. Project Structure

```
SageGUI/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth layout group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Protected layout group
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard home
│   │   ├── data-sources/
│   │   │   ├── page.tsx         # Connector list
│   │   │   ├── new/
│   │   │   │   └── page.tsx     # New connector form
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Connector details
│   │   ├── dsar/
│   │   │   ├── page.tsx         # DSAR list
│   │   │   ├── new/
│   │   │   │   └── page.tsx     # Submit DSAR
│   │   │   └── [ticketId]/
│   │   │       └── page.tsx     # DSAR details
│   │   ├── privacy-schemas/
│   │   │   ├── page.tsx         # Schema library
│   │   │   └── editor/
│   │   │       └── page.tsx     # Schema editor
│   │   ├── reports/
│   │   │   └── page.tsx         # Compliance reports
│   │   ├── settings/
│   │   │   └── page.tsx         # Settings
│   │   └── layout.tsx           # Dashboard layout
│   ├── api/                     # API routes (NextAuth, proxies)
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── progress/
│   │       └── [ticketId]/
│   │           └── route.ts     # SSE endpoint for DSAR progress
│   ├── layout.tsx               # Root layout
│   └── providers.tsx            # Client-side providers
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── table.tsx
│   │   └── ...                  # Other shadcn components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── status-cards.tsx
│   │   ├── activity-timeline.tsx
│   │   └── alerts-panel.tsx
│   ├── data-sources/            # Data source components
│   │   ├── connector-card.tsx
│   │   ├── connector-form.tsx
│   │   ├── privacy-schema-editor.tsx
│   │   └── connection-test.tsx
│   ├── dsar/                    # DSAR components
│   │   ├── dsar-form.tsx
│   │   ├── dsar-table.tsx
│   │   ├── dsar-status-badge.tsx
│   │   ├── multi-source-progress.tsx
│   │   └── results-viewer.tsx
│   ├── layouts/                 # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── shared/                  # Shared components
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       └── page-header.tsx
├── lib/
│   ├── ciris-sdk/               # TypeScript SDK (core focus)
│   │   ├── client.ts            # Main CIRISClient class
│   │   ├── transport.ts         # HTTP transport layer
│   │   ├── types/               # Shared types
│   │   │   ├── common.ts
│   │   │   ├── dsar.ts
│   │   │   ├── connectors.ts
│   │   │   └── index.ts
│   │   └── resources/           # API resource classes
│   │       ├── base.ts          # BaseResource class
│   │       ├── dsar.ts          # DSAR operations
│   │       ├── dsar-multi-source.ts
│   │       ├── connectors.ts    # Connector management
│   │       ├── privacy-schemas.ts
│   │       └── reports.ts
│   ├── hooks/                   # React hooks
│   │   ├── use-ciris-client.ts
│   │   ├── use-connectors.ts
│   │   ├── use-dsar.ts
│   │   └── use-progress.ts      # SSE hook for DSAR progress
│   ├── utils/                   # Utility functions
│   │   ├── cn.ts                # className utility
│   │   ├── validators.ts        # Zod schemas
│   │   └── formatters.ts
│   └── auth.ts                  # NextAuth configuration
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 3. TypeScript SDK Implementation

The TypeScript SDK is the **core integration layer** between SageGUI and CIRISAgent. It should follow patterns from ScoutGUI but be adapted for DSAR-specific operations.

### 3.1 Base Architecture

#### `lib/ciris-sdk/transport.ts`
```typescript
/**
 * HTTP transport layer for API communication
 */
export interface TransportOptions {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

export class Transport {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(options: TransportOptions) {
    this.baseURL = options.baseURL;
    this.timeout = options.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(options.apiKey && { 'Authorization': `Bearer ${options.apiKey}` }),
      ...options.headers,
    };
  }

  async request<T>(config: RequestConfig): Promise<T> {
    const url = new URL(config.path, this.baseURL);

    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method: config.method,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(
          error.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          error
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      throw new APIError('Network error', 0, error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Convenience methods
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: 'GET', path, params });
  }

  async post<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', path, data });
  }

  async put<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', path, data });
  }

  async patch<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', path, data });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', path });
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

#### `lib/ciris-sdk/resources/base.ts`
```typescript
import { Transport } from '../transport';

/**
 * Base class for all API resources
 */
export abstract class BaseResource {
  constructor(protected transport: Transport) {}
}
```

### 3.2 Type Definitions

#### `lib/ciris-sdk/types/dsar.ts`
```typescript
/**
 * DSAR-related type definitions
 */

export type DSARRequestType = 'access' | 'delete' | 'export' | 'correct';
export type DSARStatus =
  | 'pending_review'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type ExportFormat = 'json' | 'xml' | 'csv';

export interface MultiSourceDSARRequest {
  request_type: DSARRequestType;
  email: string;
  user_identifier: string;
  export_format?: ExportFormat;
  corrections?: Record<string, any>;
  details?: string;
  urgent?: boolean;
}

export interface MultiSourceDSARResponse {
  success: boolean;
  data: {
    ticket_id: string;
    status: DSARStatus;
    submitted_at: string;
    estimated_completion?: string;
  };
}

export interface SourceStatus {
  source_id: string;
  source_name: string;
  source_type: 'ciris' | 'sql' | 'rest' | 'hl7';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress_percentage?: number;
  error_message?: string;
  completed_at?: string;
}

export interface MultiSourceDSARStatusResponse {
  ticket_id: string;
  request_type: DSARRequestType;
  email: string;
  user_identifier: string;
  status: DSARStatus;
  submitted_at: string;
  completed_at?: string;
  sources: SourceStatus[];
  overall_progress_percentage: number;
}

export interface PartialResultsResponse {
  ticket_id: string;
  sources_completed: number;
  sources_total: number;
  results: {
    source_id: string;
    source_name: string;
    data: any;
    retrieved_at: string;
  }[];
}

export interface DSARTicketSummary {
  ticket_id: string;
  request_type: DSARRequestType;
  email: string;
  status: DSARStatus;
  submitted_at: string;
  completed_at?: string;
  urgent: boolean;
}

export interface DSARListResponse {
  tickets: DSARTicketSummary[];
  total: number;
  page: number;
  page_size: number;
}
```

#### `lib/ciris-sdk/types/connectors.ts`
```typescript
/**
 * Connector-related type definitions
 */

export type ConnectorType = 'sql' | 'rest' | 'hl7';
export type DatabaseType = 'postgres' | 'mysql' | 'sqlite' | 'mssql' | 'oracle';
export type AuthType = 'none' | 'basic' | 'bearer' | 'oauth2' | 'api_key';

export interface SQLConnectorConfig {
  connector_name: string;
  database_type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl_enabled?: boolean;
  privacy_schema?: string; // YAML string
  max_connections?: number;
  timeout_seconds?: number;
}

export interface RESTConnectorConfig {
  connector_name: string;
  base_url: string;
  auth_type: AuthType;
  auth_credentials?: Record<string, string>;
  headers?: Record<string, string>;
  privacy_endpoints?: string; // JSON string
  timeout_seconds?: number;
}

export interface ConnectorInfo {
  connector_id: string;
  connector_name: string;
  connector_type: ConnectorType;
  status: 'healthy' | 'unhealthy' | 'unknown';
  last_tested?: string;
  last_test_latency_ms?: number;
  created_at: string;
  updated_at: string;
}

export interface ConnectorRegistrationResponse {
  success: boolean;
  data: {
    connector_id: string;
    connector_name: string;
    connector_type: ConnectorType;
  };
}

export interface ConnectorListResponse {
  connectors: ConnectorInfo[];
  total: number;
}

export interface ConnectorTestResult {
  connector_id: string;
  success: boolean;
  latency_ms?: number;
  error_message?: string;
  tested_at: string;
}

export interface ConnectorUpdateRequest {
  connector_name?: string;
  config?: Partial<SQLConnectorConfig | RESTConnectorConfig>;
  privacy_schema?: string;
}
```

### 3.3 Resource Implementations

#### `lib/ciris-sdk/resources/dsar-multi-source.ts`
```typescript
import { BaseResource } from './base';
import {
  MultiSourceDSARRequest,
  MultiSourceDSARResponse,
  MultiSourceDSARStatusResponse,
  PartialResultsResponse,
  DSARListResponse,
} from '../types/dsar';

export class DSARMultiSourceResource extends BaseResource {
  /**
   * Submit a multi-source DSAR request
   */
  async submitMultiSource(
    data: MultiSourceDSARRequest
  ): Promise<MultiSourceDSARResponse> {
    return this.transport.post('/v1/dsar/multi-source', data);
  }

  /**
   * Get status of a multi-source DSAR request
   */
  async getStatus(ticketId: string): Promise<MultiSourceDSARStatusResponse> {
    return this.transport.get(`/v1/dsar/multi-source/${ticketId}`);
  }

  /**
   * Get partial results from completed sources
   */
  async getPartialResults(ticketId: string): Promise<PartialResultsResponse> {
    return this.transport.get(`/v1/dsar/multi-source/${ticketId}/partial`);
  }

  /**
   * Cancel a DSAR request
   */
  async cancel(ticketId: string): Promise<{ success: boolean }> {
    return this.transport.delete(`/v1/dsar/multi-source/${ticketId}`);
  }

  /**
   * List all DSAR tickets with optional filtering
   */
  async list(params?: {
    page?: number;
    page_size?: number;
    status?: string;
    request_type?: string;
    urgent?: boolean;
  }): Promise<DSARListResponse> {
    return this.transport.get('/v1/dsar/multi-source', params);
  }
}
```

#### `lib/ciris-sdk/resources/connectors.ts`
```typescript
import { BaseResource } from './base';
import {
  SQLConnectorConfig,
  RESTConnectorConfig,
  ConnectorRegistrationResponse,
  ConnectorListResponse,
  ConnectorInfo,
  ConnectorTestResult,
  ConnectorUpdateRequest,
} from '../types/connectors';

export class ConnectorsResource extends BaseResource {
  /**
   * Register a SQL database connector
   */
  async registerSQL(
    config: SQLConnectorConfig
  ): Promise<ConnectorRegistrationResponse> {
    return this.transport.post('/v1/connectors/sql', {
      connector_type: 'sql',
      config,
    });
  }

  /**
   * Register a REST API connector
   */
  async registerREST(
    config: RESTConnectorConfig
  ): Promise<ConnectorRegistrationResponse> {
    return this.transport.post('/v1/connectors/rest', {
      connector_type: 'rest',
      config,
    });
  }

  /**
   * List all connectors with optional filtering
   */
  async list(params?: {
    connector_type?: string;
    status?: string;
  }): Promise<ConnectorListResponse> {
    return this.transport.get('/v1/connectors', params);
  }

  /**
   * Get connector details
   */
  async get(connectorId: string): Promise<ConnectorInfo> {
    return this.transport.get(`/v1/connectors/${connectorId}`);
  }

  /**
   * Test connector connection
   */
  async test(connectorId: string): Promise<ConnectorTestResult> {
    return this.transport.post(`/v1/connectors/${connectorId}/test`);
  }

  /**
   * Update connector configuration
   */
  async update(
    connectorId: string,
    update: ConnectorUpdateRequest
  ): Promise<{ success: boolean }> {
    return this.transport.patch(`/v1/connectors/${connectorId}`, update);
  }

  /**
   * Delete a connector
   */
  async delete(connectorId: string): Promise<{ success: boolean }> {
    return this.transport.delete(`/v1/connectors/${connectorId}`);
  }
}
```

#### `lib/ciris-sdk/resources/privacy-schemas.ts`
```typescript
import { BaseResource } from './base';

export interface PrivacySchema {
  schema_id: string;
  name: string;
  description?: string;
  schema_yaml: string;
  created_at: string;
  updated_at: string;
}

export interface PrivacySchemaListResponse {
  schemas: PrivacySchema[];
  total: number;
}

export class PrivacySchemasResource extends BaseResource {
  /**
   * List all privacy schemas
   */
  async list(): Promise<PrivacySchemaListResponse> {
    return this.transport.get('/v1/privacy-schemas');
  }

  /**
   * Get a specific schema
   */
  async get(schemaId: string): Promise<PrivacySchema> {
    return this.transport.get(`/v1/privacy-schemas/${schemaId}`);
  }

  /**
   * Create a new privacy schema
   */
  async create(data: {
    name: string;
    description?: string;
    schema_yaml: string;
  }): Promise<{ success: boolean; schema_id: string }> {
    return this.transport.post('/v1/privacy-schemas', data);
  }

  /**
   * Update a privacy schema
   */
  async update(
    schemaId: string,
    data: Partial<{ name: string; description: string; schema_yaml: string }>
  ): Promise<{ success: boolean }> {
    return this.transport.patch(`/v1/privacy-schemas/${schemaId}`, data);
  }

  /**
   * Delete a privacy schema
   */
  async delete(schemaId: string): Promise<{ success: boolean }> {
    return this.transport.delete(`/v1/privacy-schemas/${schemaId}`);
  }

  /**
   * Validate a privacy schema
   */
  async validate(schemaYaml: string): Promise<{
    valid: boolean;
    errors?: string[];
  }> {
    return this.transport.post('/v1/privacy-schemas/validate', {
      schema_yaml: schemaYaml,
    });
  }
}
```

### 3.4 Main Client

#### `lib/ciris-sdk/client.ts`
```typescript
import { Transport, TransportOptions } from './transport';
import { DSARMultiSourceResource } from './resources/dsar-multi-source';
import { ConnectorsResource } from './resources/connectors';
import { PrivacySchemasResource } from './resources/privacy-schemas';

export interface CIRISClientOptions extends TransportOptions {}

/**
 * Main CIRIS API client
 */
export class CIRISClient {
  private transport: Transport;

  // Resource instances
  public readonly dsarMultiSource: DSARMultiSourceResource;
  public readonly connectors: ConnectorsResource;
  public readonly privacySchemas: PrivacySchemasResource;

  constructor(options: CIRISClientOptions = {}) {
    const baseURL = options.baseURL || process.env.NEXT_PUBLIC_API_URL || '';
    const apiKey = options.apiKey || process.env.CIRIS_API_KEY;

    if (!baseURL) {
      throw new Error('CIRIS API baseURL is required');
    }

    this.transport = new Transport({
      ...options,
      baseURL,
      apiKey,
    });

    // Initialize resources
    this.dsarMultiSource = new DSARMultiSourceResource(this.transport);
    this.connectors = new ConnectorsResource(this.transport);
    this.privacySchemas = new PrivacySchemasResource(this.transport);
  }
}

// Export singleton instance
let clientInstance: CIRISClient | null = null;

export function getCIRISClient(options?: CIRISClientOptions): CIRISClient {
  if (!clientInstance) {
    clientInstance = new CIRISClient(options);
  }
  return clientInstance;
}
```

### 3.5 React Integration

#### `lib/hooks/use-ciris-client.ts`
```typescript
'use client';

import { useMemo } from 'react';
import { CIRISClient, getCIRISClient } from '../ciris-sdk/client';

export function useCIRISClient(): CIRISClient {
  return useMemo(() => getCIRISClient(), []);
}
```

#### `lib/hooks/use-connectors.ts`
```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCIRISClient } from './use-ciris-client';
import type {
  SQLConnectorConfig,
  RESTConnectorConfig,
  ConnectorUpdateRequest
} from '../ciris-sdk/types/connectors';

export function useConnectors(connectorType?: string) {
  const client = useCIRISClient();

  return useQuery({
    queryKey: ['connectors', connectorType],
    queryFn: () => client.connectors.list({ connector_type: connectorType }),
  });
}

export function useConnector(connectorId: string) {
  const client = useCIRISClient();

  return useQuery({
    queryKey: ['connectors', connectorId],
    queryFn: () => client.connectors.get(connectorId),
    enabled: !!connectorId,
  });
}

export function useRegisterSQLConnector() {
  const client = useCIRISClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: SQLConnectorConfig) =>
      client.connectors.registerSQL(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}

export function useTestConnector() {
  const client = useCIRISClient();

  return useMutation({
    mutationFn: (connectorId: string) => client.connectors.test(connectorId),
  });
}

export function useUpdateConnector() {
  const client = useCIRISClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      connectorId,
      update
    }: {
      connectorId: string;
      update: ConnectorUpdateRequest
    }) => client.connectors.update(connectorId, update),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['connectors', variables.connectorId]
      });
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}

export function useDeleteConnector() {
  const client = useCIRISClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (connectorId: string) => client.connectors.delete(connectorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}
```

#### `lib/hooks/use-dsar.ts`
```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCIRISClient } from './use-ciris-client';
import type { MultiSourceDSARRequest } from '../ciris-sdk/types/dsar';

export function useDSARList(params?: {
  page?: number;
  status?: string;
  request_type?: string;
}) {
  const client = useCIRISClient();

  return useQuery({
    queryKey: ['dsar', 'list', params],
    queryFn: () => client.dsarMultiSource.list(params),
  });
}

export function useDSARStatus(ticketId: string, refetchInterval?: number) {
  const client = useCIRISClient();

  return useQuery({
    queryKey: ['dsar', 'status', ticketId],
    queryFn: () => client.dsarMultiSource.getStatus(ticketId),
    enabled: !!ticketId,
    refetchInterval: refetchInterval || false,
  });
}

export function useSubmitDSAR() {
  const client = useCIRISClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MultiSourceDSARRequest) =>
      client.dsarMultiSource.submitMultiSource(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dsar', 'list'] });
    },
  });
}

export function useCancelDSAR() {
  const client = useCIRISClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId: string) => client.dsarMultiSource.cancel(ticketId),
    onSuccess: (_, ticketId) => {
      queryClient.invalidateQueries({ queryKey: ['dsar', 'status', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['dsar', 'list'] });
    },
  });
}
```

#### `lib/hooks/use-progress.ts`
```typescript
'use client';

import { useEffect, useState } from 'react';
import type { MultiSourceDSARStatusResponse } from '../ciris-sdk/types/dsar';

/**
 * Hook for real-time DSAR progress updates via Server-Sent Events
 */
export function useDSARProgress(ticketId: string) {
  const [status, setStatus] = useState<MultiSourceDSARStatusResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ticketId) return;

    const eventSource = new EventSource(`/api/progress/${ticketId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as MultiSourceDSARStatusResponse;
        setStatus(data);
      } catch (err) {
        setError(err as Error);
      }
    };

    eventSource.onerror = (err) => {
      setError(new Error('SSE connection failed'));
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [ticketId]);

  return { status, error };
}
```

---

## 4. Core Pages & Features

### 4.1 Dashboard (`/dashboard`)

**Purpose**: Overview of GDPR compliance status

**Key Metrics**:
- Compliance score (0-100%)
- Active data sources
- Pending DSAR requests
- Monthly completions

**Components**:
```typescript
// components/dashboard/status-cards.tsx
export function StatusCards({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.compliance_score}%</div>
          <Progress value={data.compliance_score} className="mt-2" />
        </CardContent>
      </Card>
      {/* Other cards... */}
    </div>
  );
}

// components/dashboard/activity-timeline.tsx
export function ActivityTimeline({ activities }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.map((activity) => (
          <TimelineItem key={activity.id} activity={activity} />
        ))}
      </CardContent>
    </Card>
  );
}

// components/dashboard/alerts-panel.tsx
export function AlertsPanel({ alerts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.failed_connectors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Failed Connectors</AlertTitle>
            <AlertDescription>
              {alerts.failed_connectors.length} connector(s) need attention
            </AlertDescription>
          </Alert>
        )}
        {/* Other alerts... */}
      </CardContent>
    </Card>
  );
}
```

**Page Implementation**:
```typescript
// app/(dashboard)/dashboard/page.tsx
import { StatusCards } from '@/components/dashboard/status-cards';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';

export default async function DashboardPage() {
  // Fetch dashboard data server-side
  const data = await getDashboardData();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatusCards data={data} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityTimeline activities={data.recent_activity} />
        </div>
        <AlertsPanel alerts={data.alerts} />
      </div>
    </div>
  );
}
```

### 4.2 Data Sources (`/data-sources`)

**Features**:
- List all connectors with filtering
- Register new SQL/REST connectors
- Test connection health
- Edit privacy schemas
- Delete connectors

**Components**:
```typescript
// components/data-sources/connector-card.tsx
export function ConnectorCard({ connector }: { connector: ConnectorInfo }) {
  const { mutate: testConnector, isPending } = useTestConnector();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5" />
            <CardTitle>{connector.connector_name}</CardTitle>
          </div>
          <Badge variant={connector.status === 'healthy' ? 'success' : 'destructive'}>
            {connector.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div>Type: {connector.connector_type}</div>
          <div>Last tested: {formatDate(connector.last_tested)}</div>
          {connector.last_test_latency_ms && (
            <div>Latency: {connector.last_test_latency_ms}ms</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => testConnector(connector.connector_id)}
          disabled={isPending}
        >
          Test Connection
        </Button>
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}

// components/data-sources/connector-form.tsx
export function SQLConnectorForm({ onSuccess }: Props) {
  const form = useForm<SQLConnectorConfig>({
    resolver: zodResolver(sqlConnectorSchema),
  });

  const { mutate: register, isPending } = useRegisterSQLConnector();

  const onSubmit = (data: SQLConnectorConfig) => {
    register(data, {
      onSuccess: () => {
        toast.success('Connector registered successfully');
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="connector_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Connector Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Production Database" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Other fields... */}
        <Button type="submit" disabled={isPending}>
          Register Connector
        </Button>
      </form>
    </Form>
  );
}
```

### 4.3 DSAR Requests (`/dsar`)

**Features**:
- Submit new DSAR (Access, Delete, Export, Correct)
- List all requests with filtering
- Track real-time progress
- View results and download packages

**Components**:
```typescript
// components/dsar/dsar-form.tsx
export function DSARForm({ onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const form = useForm<MultiSourceDSARRequest>({
    resolver: zodResolver(dsarRequestSchema),
  });

  const { mutate: submit, isPending } = useSubmitDSAR();

  const onSubmit = (data: MultiSourceDSARRequest) => {
    submit(data, {
      onSuccess: (response) => {
        toast.success(`DSAR submitted: ${response.data.ticket_id}`);
        onSuccess?.(response.data.ticket_id);
      },
    });
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={step} totalSteps={4} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <RequestTypeStep form={form} />}
          {step === 2 && <UserIdentificationStep form={form} />}
          {step === 3 && <TypeSpecificFieldsStep form={form} />}
          {step === 4 && <ReviewStep form={form} />}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step < 4 ? (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                Submit Request
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

// components/dsar/multi-source-progress.tsx
export function MultiSourceProgress({ ticketId }: { ticketId: string }) {
  const { status } = useDSARProgress(ticketId);

  if (!status) return <LoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={status.overall_progress_percentage} className="mb-4" />
        <div className="space-y-2">
          {status.sources.map((source) => (
            <div key={source.source_id} className="flex items-center gap-2">
              {source.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
              {source.status === 'failed' && <XCircle className="h-4 w-4 text-red-500" />}
              {source.status === 'in_progress' && <Clock className="h-4 w-4 text-yellow-500" />}
              <span>{source.source_name}</span>
              {source.progress_percentage && (
                <span className="text-sm text-muted-foreground">
                  {source.progress_percentage}%
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 4.4 Privacy Schemas (`/privacy-schemas`)

**Features**:
- YAML/JSON editor with syntax highlighting
- Schema validation
- Template library
- Visual schema builder (future)

**Components**:
```typescript
// components/data-sources/privacy-schema-editor.tsx
import Editor from '@monaco-editor/react';

export function PrivacySchemaEditor({
  initialSchema,
  onSave
}: Props) {
  const [schema, setSchema] = useState(initialSchema || '');
  const [format, setFormat] = useState<'yaml' | 'json'>('yaml');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateSchema = async (content: string) => {
    const result = await client.privacySchemas.validate(content);
    setValidationErrors(result.errors || []);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Tabs value={format} onValueChange={(v) => setFormat(v as any)}>
          <TabsList>
            <TabsTrigger value="yaml">YAML</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => onSave(schema)}>Save Schema</Button>
      </div>

      <Editor
        height="500px"
        language={format}
        value={schema}
        onChange={(value) => {
          setSchema(value || '');
          validateSchema(value || '');
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />

      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul>
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
```

---

## 5. shadcn/ui Component Integration

### 5.1 Installation

```bash
pnpm dlx shadcn-ui@latest init
```

**Configuration** (`components.json`):
```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 5.2 Required Components

Install these shadcn/ui components for SageGUI:

```bash
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add form
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add label
pnpm dlx shadcn-ui@latest add select
pnpm dlx shadcn-ui@latest add table
pnpm dlx shadcn-ui@latest add tabs
pnpm dlx shadcn-ui@latest add toast
pnpm dlx shadcn-ui@latest add alert
pnpm dlx shadcn-ui@latest add badge
pnpm dlx shadcn-ui@latest add progress
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add skeleton
```

### 5.3 Custom Theme

**Color Palette** (`app/globals.css`):
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --primary: 217 91% 60%;        /* Blue - Trust */
    --primary-foreground: 210 40% 98%;

    --secondary: 262 83% 58%;       /* Purple - Authority */
    --secondary-foreground: 210 40% 98%;

    --success: 142 76% 36%;         /* Green - Compliance */
    --success-foreground: 210 40% 98%;

    --warning: 38 92% 50%;          /* Yellow - Attention */
    --warning-foreground: 210 40% 98%;

    --destructive: 0 84% 60%;       /* Red - Violation */
    --destructive-foreground: 210 40% 98%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 217 91% 60%;

    --radius: 0.5rem;
  }
}
```

---

## 6. State Management & Data Fetching

### 6.1 TanStack Query Setup

**Provider** (`app/providers.tsx`):
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Root Layout** (`app/layout.tsx`):
```typescript
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 6.2 Server-Sent Events for Progress

**API Route** (`app/api/progress/[ticketId]/route.ts`):
```typescript
import { NextRequest } from 'next/server';
import { getCIRISClient } from '@/lib/ciris-sdk/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const client = getCIRISClient();

      // Poll status every 2 seconds
      const interval = setInterval(async () => {
        try {
          const status = await client.dsarMultiSource.getStatus(ticketId);

          const data = `data: ${JSON.stringify(status)}\n\n`;
          controller.enqueue(encoder.encode(data));

          // Close stream if completed or failed
          if (['completed', 'failed', 'cancelled'].includes(status.status)) {
            clearInterval(interval);
            controller.close();
          }
        } catch (error) {
          clearInterval(interval);
          controller.error(error);
        }
      }, 2000);

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

## 7. Authentication & Authorization

### 7.1 NextAuth Setup

**Configuration** (`lib/auth.ts`):
```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Authenticate against CIRISAgent
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.apiKey = user.api_key;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.apiKey = token.apiKey as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
```

### 7.2 Role-Based Access Control

**Middleware** (`middleware.ts`):
```typescript
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }
      if (req.nextUrl.pathname.startsWith('/data-sources')) {
        return token?.role === 'ADMIN' || token?.role === 'SYSTEM_ADMIN';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/data-sources/:path*', '/dsar/:path*'],
};
```

---

## 8. Development Workflow

### 8.1 Initial Setup

```bash
# Clone repository
git clone https://github.com/CIRISAI/SageGUI.git
cd SageGUI

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Initialize shadcn/ui
pnpm dlx shadcn-ui@latest init

# Install required components
pnpm dlx shadcn-ui@latest add button card dialog form table tabs toast

# Run development server
pnpm dev
```

### 8.2 Environment Variables

**`.env.example`**:
```env
# CIRISAgent API
NEXT_PUBLIC_API_URL=http://localhost:8000
CIRIS_API_KEY=your-api-key-here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Database (if using Prisma for local state)
DATABASE_URL=postgresql://user:password@localhost:5432/sage

# Optional: Sentry, Analytics, etc.
NEXT_PUBLIC_SENTRY_DSN=
```

### 8.3 Development Commands

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## 9. Testing Strategy

### 9.1 Unit Tests (Vitest)

**SDK Tests** (`lib/ciris-sdk/__tests__/client.test.ts`):
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CIRISClient } from '../client';

describe('CIRISClient', () => {
  let client: CIRISClient;

  beforeEach(() => {
    client = new CIRISClient({
      baseURL: 'http://localhost:8000',
      apiKey: 'test-key',
    });
  });

  it('should initialize with resources', () => {
    expect(client.dsarMultiSource).toBeDefined();
    expect(client.connectors).toBeDefined();
    expect(client.privacySchemas).toBeDefined();
  });

  it('should submit a DSAR request', async () => {
    const mockResponse = {
      success: true,
      data: { ticket_id: 'test-123', status: 'pending_review' },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await client.dsarMultiSource.submitMultiSource({
      request_type: 'access',
      email: 'test@example.com',
      user_identifier: 'user-123',
    });

    expect(result.data.ticket_id).toBe('test-123');
  });
});
```

**Component Tests** (`components/dsar/__tests__/dsar-form.test.tsx`):
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DSARForm } from '../dsar-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('DSARForm', () => {
  it('should render form steps', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DSARForm onSuccess={vi.fn()} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/request type/i)).toBeInTheDocument();
  });

  it('should validate email input', async () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DSARForm onSuccess={vi.fn()} />
      </QueryClientProvider>
    );

    const emailInput = container.querySelector('input[name="email"]');
    fireEvent.change(emailInput!, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput!);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

### 9.2 E2E Tests (Playwright)

**DSAR Workflow** (`tests/e2e/dsar-workflow.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test.describe('DSAR Workflow', () => {
  test('should submit and track a DSAR request', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    // Navigate to DSAR
    await page.goto('/dsar/new');

    // Fill form
    await page.click('text=Access Request');
    await page.click('button:has-text("Next")');

    await page.fill('input[name="email"]', 'subject@example.com');
    await page.fill('input[name="user_identifier"]', 'user-123');
    await page.click('button:has-text("Next")');

    await page.click('button:has-text("Submit Request")');

    // Verify submission
    await expect(page.locator('text=/DSAR submitted/i')).toBeVisible();

    // Check progress
    await expect(page.locator('[role="progressbar"]')).toBeVisible();
  });
});
```

---

## 10. Deployment

### 10.1 Docker Setup

**Dockerfile**:
```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  sage-gui:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://your-ciris-instance.com
      - CIRIS_API_KEY=${CIRIS_API_KEY}
      - NEXTAUTH_URL=https://sage.yourdomain.com
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    restart: unless-stopped
```

### 10.2 Vercel Deployment

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

---

## 11. Phase 1 MVP Checklist

### 11.1 Foundation (Week 1)

- [ ] **Project Setup**
  - [ ] Initialize Next.js 14 project with TypeScript
  - [ ] Install and configure shadcn/ui
  - [ ] Set up Tailwind CSS
  - [ ] Configure ESLint, Prettier, Husky

- [ ] **TypeScript SDK**
  - [ ] Implement `Transport` class
  - [ ] Create `BaseResource` class
  - [ ] Define core types (`dsar.ts`, `connectors.ts`)
  - [ ] Implement `DSARMultiSourceResource`
  - [ ] Implement `ConnectorsResource`
  - [ ] Implement `PrivacySchemasResource`
  - [ ] Create `CIRISClient` main class
  - [ ] Write SDK unit tests

- [ ] **Authentication**
  - [ ] Set up NextAuth.js
  - [ ] Create login page
  - [ ] Implement role-based middleware
  - [ ] Add protected routes

### 11.2 Core Features (Week 2)

- [ ] **Dashboard Page**
  - [ ] Create dashboard layout
  - [ ] Implement status cards component
  - [ ] Build activity timeline
  - [ ] Add alerts panel
  - [ ] Fetch dashboard data server-side

- [ ] **Data Sources Page**
  - [ ] Build connector list view
  - [ ] Implement SQL connector form
  - [ ] Add connection testing functionality
  - [ ] Create privacy schema editor (Monaco)
  - [ ] Add connector CRUD operations
  - [ ] Write React Query hooks

- [ ] **DSAR Page**
  - [ ] Create DSAR submission form (multi-step)
  - [ ] Implement DSAR list with filtering
  - [ ] Build real-time progress component
  - [ ] Add SSE endpoint for progress tracking
  - [ ] Create results viewer modal
  - [ ] Add download functionality

### 11.3 Polish & Testing (Week 3)

- [ ] **UI/UX**
  - [ ] Add loading states
  - [ ] Implement error boundaries
  - [ ] Add toast notifications
  - [ ] Ensure responsive design
  - [ ] Test accessibility (WCAG 2.1 AA)

- [ ] **Testing**
  - [ ] Write unit tests for SDK
  - [ ] Add component tests
  - [ ] Create E2E tests for critical paths
  - [ ] Test error handling

- [ ] **Documentation**
  - [ ] Update README with setup instructions
  - [ ] Document SDK usage
  - [ ] Create user guide
  - [ ] Add inline code comments

- [ ] **Deployment**
  - [ ] Create Dockerfile
  - [ ] Set up CI/CD pipeline
  - [ ] Deploy to staging
  - [ ] Perform final testing
  - [ ] Deploy to production

---

## 12. Next Steps After MVP

### Phase 2 Features (Weeks 4-6)
- REST API connectors
- HL7 connectors
- Advanced compliance reporting
- Identity resolution graph visualization
- Bulk DSAR operations
- Webhook notifications

### Phase 3 Features (Weeks 7+)
- AI-assisted privacy schema generation
- Automated compliance scoring
- Multi-language support
- Mobile-responsive improvements
- Advanced analytics dashboard
- Slack/Discord bot integration

---

## Appendix: Quick Reference

### Key Files to Create

1. **SDK Core**:
   - `lib/ciris-sdk/client.ts`
   - `lib/ciris-sdk/transport.ts`
   - `lib/ciris-sdk/resources/dsar-multi-source.ts`
   - `lib/ciris-sdk/resources/connectors.ts`

2. **React Hooks**:
   - `lib/hooks/use-ciris-client.ts`
   - `lib/hooks/use-dsar.ts`
   - `lib/hooks/use-connectors.ts`
   - `lib/hooks/use-progress.ts`

3. **Pages**:
   - `app/(dashboard)/dashboard/page.tsx`
   - `app/(dashboard)/data-sources/page.tsx`
   - `app/(dashboard)/dsar/page.tsx`
   - `app/(dashboard)/dsar/new/page.tsx`

4. **Components**:
   - `components/dashboard/status-cards.tsx`
   - `components/data-sources/connector-card.tsx`
   - `components/dsar/dsar-form.tsx`
   - `components/dsar/multi-source-progress.tsx`

### Command Cheatsheet

```bash
# Development
pnpm dev                          # Start dev server
pnpm build                        # Build for production
pnpm type-check                   # Run TypeScript check
pnpm lint                         # Run ESLint

# Testing
pnpm test                         # Run unit tests
pnpm test:watch                   # Run tests in watch mode
pnpm test:e2e                     # Run E2E tests

# shadcn/ui
pnpm dlx shadcn-ui@latest add <component>  # Add component
```

### Environment Setup

```bash
# Required environment variables
NEXT_PUBLIC_API_URL=http://localhost:8000
CIRIS_API_KEY=your-api-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

---

**End of Implementation Plan**

This document provides a comprehensive blueprint for building SageGUI. Follow the phase 1 checklist to build the MVP, then iterate based on user feedback and expand with phase 2 and 3 features.

For questions or clarifications, refer to:
- [CIRISAgent multi-source-dsar-orchestration branch](https://github.com/CIRISAI/CIRISAgent/tree/multi-source-dsar-orchestration)
- [ScoutGUI reference implementation](https://github.com/CIRISAI/ScoutGUI)
- [shadcn/ui documentation](https://ui.shadcn.com)
