import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps extends React.ComponentProps<typeof Link> {}

export default function NavLink({
  children,
  className,
  ...props
}: NavLinkProps) {
  return (
    <Link
      className={cn(
        'py-1 px-4 bg-txt cursor-pointer rounded-md duration-200 transition-all ease-in-out hover:brightness-110 hover:shadow-md',
        className
      )}
      {...props}
    >{children}</Link>
  );
}