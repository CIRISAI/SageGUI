import Link from 'next/link';
import { Database, Plus, Activity } from 'lucide-react';

export default function DataSourcesPage() {
  const connectors = [
    {
      id: '1',
      name: 'Production Database',
      type: 'PostgreSQL',
      status: 'healthy',
      lastTested: '5 minutes ago',
      latency: 45,
    },
    {
      id: '2',
      name: 'User API',
      type: 'REST',
      status: 'healthy',
      lastTested: '10 minutes ago',
      latency: 120,
    },
    {
      id: '3',
      name: 'Analytics DB',
      type: 'MySQL',
      status: 'healthy',
      lastTested: '1 hour ago',
      latency: 67,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Sources</h1>
          <p className="mt-1 text-gray-600">
            Manage external data connectors and privacy schemas
          </p>
        </div>
        <Link
          href="/data-sources/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Data Source
        </Link>
      </div>

      {/* Connectors Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {connectors.map((connector) => (
          <div key={connector.id} className="rounded-lg border bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {connector.name}
                  </h3>
                  <p className="text-sm text-gray-600">{connector.type}</p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                {connector.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last tested:</span>
                <span className="text-gray-900">{connector.lastTested}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Latency:</span>
                <span className="text-gray-900">{connector.latency}ms</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                Test
              </button>
              <button className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State when no connectors */}
      {connectors.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-12">
          <Activity className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No data sources yet
          </h3>
          <p className="mt-2 text-center text-gray-600">
            Get started by adding your first data source connector
          </p>
          <Link
            href="/data-sources/new"
            className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Data Source
          </Link>
        </div>
      )}
    </div>
  );
}
