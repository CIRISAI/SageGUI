import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Banner */}
      <div className="bg-blue-600 px-4 py-3 text-center text-white">
        <p className="text-sm font-medium">
          Sample Dashboard - Product Releasing December 2025
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Sage<span className="text-blue-600">GUI</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            GDPR Compliance Management Interface
          </p>
          <p className="mb-8 text-gray-600">
            Manage data subject access requests, configure data sources, and
            maintain GDPR compliance through a unified interface.
          </p>
          <div className="mb-6 flex flex-col items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
            >
              View Sample Dashboard
            </Link>
            <a
              href="https://scout.ciris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Chat with scout.ciris.ai about the open source CIRIS Agent
              framework
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
