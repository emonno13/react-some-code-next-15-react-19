/* eslint-disable @next/next/no-html-link-for-pages */
import { getAuthStatus } from '@/lib/helpers/auth';
import { cn } from '@/lib/helpers/utils';
import { headers } from 'next/headers';
import { LogoutButton } from '../atoms/LogoutButton';

export const dynamic = 'force-dynamic';

export async function Header() {
  const { isAuthenticated } = await getAuthStatus();
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '/';
  console.log('currentPath', currentPath);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <a
            href="/"
            className={cn(
              'text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400',
              { 'text-blue-600 dark:text-blue-400': currentPath === '/' }
            )}
          >
            Home
          </a>
          {isAuthenticated && (
            <a
              href="/me"
              className={cn(
                'text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400',
                { 'text-blue-600 dark:text-blue-400': currentPath === '/me' }
              )}
            >
              Profile
            </a>
          )}
        </nav>
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <a
            href="/login"
            className={cn(
              'rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500',
              { 'bg-blue-700 dark:bg-blue-500': currentPath === '/login' }
            )}
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
