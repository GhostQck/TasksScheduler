import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVars = cva(
  'inline-flex items-center justify-center cursor-pointer capitalize transition-all transition-200 ease-in-out',
  {
    variants: {
      intent: {
        menu: 'py-1 px-3 bg-hl-800 text-txt rounded-md shadow-sm shadow-black/30 hover:bg-hl-600 hover:shadow-md',
        
        square: 'p-0 w-[2rem] aspect-square bg-hl-800 text-txt rounded-md shadow-sm shadow-black/30 hover:bg-hl-600 hover:shadow-md',
        
        tight: 'px-1 bg-hl-600 text-txt rounded-sm shadow-sm shadow-black/30 hover:bg-hl',
        
        submit: 'py-3 px-4 w-40 bg-bg rounded-lg font-bold text-sm text-pos ring-inset ring-2 ring-pos hover:bg-pos hover:text-bg',
        
        cancel: 'py-3 px-4 w-40 bg-bg rounded-lg font-bold text-sm text-neg ring-inset ring-2 ring-neg hover:bg-neg hover:text-bg',
      },
    },
    defaultVariants: {
      intent: 'menu',
    }
  }
);

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