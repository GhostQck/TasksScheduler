'use client';

import { useTransition } from 'react';
import { logoutUser } from '@/app/login/actions';

import { LogOut, Loader } from 'lucide-react';
import { Button } from '../ui/button';

export default function Logout() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      intent='square'
      className='bg-neg-800 text-neg-200 hover:text-neg-200 hover:bg-neg-600'
    >
      {isPending ? (
        <Loader size={20} strokeWidth={2} />
      ) : (
        <LogOut size={20} strokeWidth={2} />
      )}
    </Button>
  );
}