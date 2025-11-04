import Link from 'next/link';
import { Plus, FileText, Clock, CheckCircle } from 'lucide-react';

export default function DSARPage() {
  const requests = [
    {
      id: 'DSAR-001',
      type: 'Access',
      email: 'user@example.com',
      status: 'in_progress',
      submitted: '2 hours ago',
      urgent: true,
      progress: '3/5 sources',
    },
    {
      id: 'DSAR-002',
      type: 'Delete',
      email: 'test@example.com',
      status: 'completed',
      submitted: '1 day ago',
      urgent: false,
      progress: '5/5 sources',
    },
    {
      id: 'DSAR-003',
      type: 'Export',
      email: 'demo@example.com',
      status: 'pending_review',
      submitted: '3 hours ago',
      urgent: false,
      progress: '0/5 sources',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DSAR Requests</h1>
          <p className="mt-1 text-gray-600">
            Submit and track data subject access requests
          </p>
        </div>
        <Link
          href="/dsar/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Request
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>All Statuses</option>
          <option>Pending Review</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>All Types</option>
          <option>Access</option>
          <option>Delete</option>
          <option>Export</option>
          <option>Correct</option>
        </select>
        <input
          type="text"
          placeholder="Search by email..."
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      {/* Requests Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {request.id}
                    </span>
                    {request.urgent && (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                        Urgent
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    {request.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {request.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {request.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {request.status === 'in_progress' && (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    )}
                    {request.status === 'pending_review' && (
                      <FileText className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-sm capitalize text-gray-900">
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {request.progress}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {request.submitted}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dsar/${request.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
