import { Activity, Database, FileText, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Overview of your GDPR compliance status
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Compliance Score
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600">94%</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-[94%] rounded-full bg-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Data Sources
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">All connectors healthy</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Requests
              </p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">3</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">2 urgent</p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Completed This Month
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">28</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-green-600">+12% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  type: 'DSAR Request',
                  description: 'Access request submitted for user@example.com',
                  time: '5 minutes ago',
                  status: 'in_progress',
                },
                {
                  type: 'Connector Test',
                  description: 'Production DB health check completed',
                  time: '1 hour ago',
                  status: 'completed',
                },
                {
                  type: 'DSAR Request',
                  description: 'Delete request completed for test@example.com',
                  time: '2 hours ago',
                  status: 'completed',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">System Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-sm text-gray-900">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
