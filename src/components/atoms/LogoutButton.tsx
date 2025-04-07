'use client';

import { http } from '@/services/http';

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await http.post('/api/logout', null, {});
      // Force a complete page refresh to clear all cache
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500"
    >
      Logout
    </button>
  );
}
