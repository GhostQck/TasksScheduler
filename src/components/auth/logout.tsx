'use client';

import { useTransition } from 'react';
import { logoutUser } from '@/app/login/actions';

import { Loader } from 'lucide-react';
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
      intent='cancel'
      className='bg-neg-200/40'
    >
      {isPending ? (
        <>
          <Loader strokeWidth={2} className='inline-block mr-2 size-[1.1rem] -translate-y-[0.1rem]' />
          Loading...
        </>
      ) : 'Log Out'}
    </Button>
  );
}