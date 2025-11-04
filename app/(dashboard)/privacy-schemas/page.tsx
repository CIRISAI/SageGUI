import Link from 'next/link';
import { Plus, Lock, FileCode } from 'lucide-react';

export default function PrivacySchemasPage() {
  const schemas = [
    {
      id: '1',
      name: 'User Database Schema',
      description: 'Privacy mapping for main user database',
      tables: 5,
      piiFields: 12,
      updated: '2 days ago',
    },
    {
      id: '2',
      name: 'Analytics Schema',
      description: 'Privacy mapping for analytics data',
      tables: 3,
      piiFields: 8,
      updated: '1 week ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Schemas</h1>
          <p className="mt-1 text-gray-600">
            Manage PII mappings and data classifications
          </p>
        </div>
        <Link
          href="/privacy-schemas/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Schema
        </Link>
      </div>

      {/* Schema Templates */}
      <div className="rounded-lg border bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <FileCode className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">
              Schema Templates Available
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Pre-built templates for PostgreSQL, MySQL, and common SaaS
              applications
            </p>
          </div>
        </div>
      </div>

      {/* Schemas List */}
      <div className="grid gap-4 md:grid-cols-2">
        {schemas.map((schema) => (
          <div key={schema.id} className="rounded-lg border bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{schema.name}</h3>
                  <p className="text-sm text-gray-600">{schema.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tables:</span>
                <span className="font-medium text-gray-900">
                  {schema.tables}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">PII Fields:</span>
                <span className="font-medium text-gray-900">
                  {schema.piiFields}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last updated:</span>
                <span className="text-gray-900">{schema.updated}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                Edit
              </button>
              <button className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                Validate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schema Editor Preview */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Schema Format Example</h2>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
          {`version: "1.0"
database: "customer_db"
tables:
  users:
    pii_columns:
      - name: "email"
        category: "contact_info"
        retention_days: 2555
      - name: "phone"
        category: "contact_info"
      - name: "ssn"
        category: "sensitive_id"
        encrypted: true
    identity_columns:
      - "user_id"
      - "email"`}
        </pre>
      </div>
    </div>
  );
}
