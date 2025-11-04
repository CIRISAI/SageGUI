import Link from 'next/link';
import {
  ArrowLeft,
  FileSearch,
  Trash2,
  Download,
  Edit,
} from 'lucide-react';

export default function NewDSARPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dsar"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to DSAR Requests
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Submit DSAR Request
        </h1>
        <p className="mt-1 text-gray-600">
          Create a new data subject access request
        </p>
      </div>

      {/* Request Type Selection */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Select Request Type</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button className="rounded-lg border bg-white p-6 text-center hover:border-blue-600 hover:bg-blue-50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileSearch className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Access</h3>
            <p className="mt-1 text-sm text-gray-600">
              Request all personal data
            </p>
          </button>

          <button className="rounded-lg border bg-white p-6 text-center hover:border-red-600 hover:bg-red-50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Delete</h3>
            <p className="mt-1 text-sm text-gray-600">
              Right to be forgotten
            </p>
          </button>

          <button className="rounded-lg border bg-white p-6 text-center hover:border-green-600 hover:bg-green-50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Export</h3>
            <p className="mt-1 text-sm text-gray-600">
              Download data in format
            </p>
          </button>

          <button className="rounded-lg border bg-white p-6 text-center hover:border-purple-600 hover:bg-purple-50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Edit className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Correct</h3>
            <p className="mt-1 text-sm text-gray-600">
              Update incorrect data
            </p>
          </button>
        </div>
      </div>

      {/* Request Form */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Request Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="user@example.com"
            />
            <p className="mt-1 text-sm text-gray-600">
              Email of the data subject
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Identifier
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="user-12345 or discord:123456789"
            />
            <p className="mt-1 text-sm text-gray-600">
              Additional identifier (Discord ID, user ID, etc.)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Details
            </label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2"
              rows={4}
              placeholder="Optional: Add any additional context..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urgent"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="urgent" className="text-sm text-gray-700">
              Mark as urgent (requires immediate attention)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Submit Request
            </button>
            <Link
              href="/dsar"
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
