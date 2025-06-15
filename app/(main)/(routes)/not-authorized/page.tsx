import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p className="text-xl mt-3 text-gray-500">
        You do not have permissions to access that role
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
