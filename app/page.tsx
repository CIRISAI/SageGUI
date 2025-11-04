import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
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
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
