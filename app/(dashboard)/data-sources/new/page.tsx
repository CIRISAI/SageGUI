import Link from 'next/link';
import { ArrowLeft, Database, Globe } from 'lucide-react';

export default function NewDataSourcePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/data-sources"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Data Sources
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Data Source</h1>
        <p className="mt-1 text-gray-600">
          Connect a new database or API endpoint
        </p>
      </div>

      {/* Connector Type Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        <button className="rounded-lg border bg-white p-6 text-left hover:border-blue-600 hover:bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">SQL Database</h3>
              <p className="mt-1 text-sm text-gray-600">
                PostgreSQL, MySQL, SQLite, MSSQL, Oracle
              </p>
            </div>
          </div>
        </button>

        <button className="rounded-lg border bg-white p-6 text-left hover:border-blue-600 hover:bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">REST API</h3>
              <p className="mt-1 text-sm text-gray-600">
                Connect to RESTful API endpoints
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* SQL Form Placeholder */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">SQL Database Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Connector Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Production Database"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Database Type
              </label>
              <select className="mt-1 w-full rounded-lg border px-3 py-2">
                <option>PostgreSQL</option>
                <option>MySQL</option>
                <option>SQLite</option>
                <option>MSSQL</option>
                <option>Oracle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Port
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                placeholder="5432"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Host
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="localhost"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                placeholder="postgres"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Test Connection
            </button>
            <button className="rounded-lg border px-4 py-2 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
