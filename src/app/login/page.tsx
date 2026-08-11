'use client';

import React, { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

import { authUser, type AuthFormState } from './actions';

import { CircleX, Loader } from 'lucide-react';

import { InputLabel } from '@/components/form/input';
import { Button } from '@/components/ui/button';

const initialState: AuthFormState = {};

export default function Login() {
  const [
    state,
    formAction,
    isPending
  ] = useActionState(authUser, initialState);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';

  return (
    <main className='flex flex-col min-h-screen pt-[30vh] w-full justify-start items-center'>
      <section className='flex flex-col w-100 p-4 bg-fg rounded-xl shadow-lg items-center'>
        <h1 className='mb-2 font-extrabold uppercase select-none md:text-2xl lg:text-4xl'>Authorization</h1>

        <hr className='h-1 w-full mb-4 bg-hl/40 rounded-full border-0' />

        <form
          action={formAction}
          className='flex flex-col w-70 gap-4'
        >
          <input type='hidden' name='redirectTo' value={redirectTo} />

          <InputLabel
            id='auth_user'
            name='auth_user'
            type='text'
            maxLength={320}
            labelText='Username'
            intent='transparent_fg'
            labelCN='text-slate-200'
            required
          />

          <InputLabel
            id='auth_pwd'
            name='auth_pwd'
            type='password'
            maxLength={30}
            labelText='Password'
            intent='transparent_fg'
            labelCN='text-slate-200'
            required
          />

          <Button
            type='submit'
            intent='auth'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader strokeWidth={2} className='inline-block mr-2 size-[1.1rem] -translate-y-[0.1rem]' />
                Authenticating...
              </>
            ) : 'Log In'}
          </Button>
        </form>
      </section>

      {state?.error && <ErrorBlock>{state.error}</ErrorBlock>}
    </main>
  );
}

function ErrorBlock({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='w-100 mt-4 p-4 bg-neg-200/40 shadow-lg rounded-xl ring-2 ring-inset ring-neg/70 text-center text-sm text-neg/70 font-semibold uppercase select-none pointer-events-none'>
      <CircleX strokeWidth={2} className='inline-block mr-2 size-[1.1rem] -translate-y-[0.1rem]'/>
      {children}
    </div>
  );
}