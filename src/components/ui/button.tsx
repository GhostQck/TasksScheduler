import { ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVars } from './cva_tables';

interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVars> {}

export const Button = ({
  className,
  intent,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVars({ intent }), className)}
      {...props}
    >{children}</button>
  );
};