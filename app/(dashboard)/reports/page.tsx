import { Download, BarChart3, FileText, Shield } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      name: 'DSAR Compliance Report',
      description: 'Response time statistics and completion rates',
      icon: FileText,
      lastGenerated: '2 hours ago',
    },
    {
      name: 'Data Source Inventory',
      description: 'All registered connectors and PII categories',
      icon: BarChart3,
      lastGenerated: '1 day ago',
    },
    {
      name: 'Security Audit',
      description: 'Authentication events and data access logs',
      icon: Shield,
      lastGenerated: '3 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Reports</h1>
        <p className="mt-1 text-gray-600">
          Generate audit reports for regulators
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-600">30-Day Adherence</p>
          <p className="mt-2 text-3xl font-bold text-green-600">98.5%</p>
          <p className="mt-2 text-sm text-gray-600">
            All DSARs completed within GDPR timeframe
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">4.2 days</p>
          <p className="mt-2 text-sm text-gray-600">Well below 30-day limit</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-600">Total Requests</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">142</p>
          <p className="mt-2 text-sm text-gray-600">Last 90 days</p>
        </div>
      </div>

      {/* Available Reports */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Reports</h2>
        {reports.map((report, i) => {
          const Icon = report.icon;
          return (
            <div key={i} className="rounded-lg border bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {report.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {report.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    CSV
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Report Builder */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Custom Report Builder</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select className="mt-1 w-full rounded-lg border px-3 py-2">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select className="mt-1 w-full rounded-lg border px-3 py-2">
              <option>DSAR Summary</option>
              <option>Connector Health</option>
              <option>Access Logs</option>
              <option>Compliance Score</option>
            </select>
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Generate Report
        </button>
      </div>
    </div>
  );
}
