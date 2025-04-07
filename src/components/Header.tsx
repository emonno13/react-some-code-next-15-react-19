import Link from 'next/link';
import { getAuthStatus } from '@/lib/auth';
import { LogoutButton } from './LogoutButton';

export async function Header() {
  const { isAuthenticated } = await getAuthStatus();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/me"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Profile
            </Link>
          )}
        </nav>
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
