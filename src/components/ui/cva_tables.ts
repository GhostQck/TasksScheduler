import { cva } from 'class-variance-authority';
import type { NotifyTypes } from '@/lib/notifies';
import { CircleX, CircleCheck, Info, LucideIcon } from 'lucide-react';

export const NOTIFY_ICON_MAP: Record<NotifyTypes, LucideIcon> = {
  error: CircleX,
  success: CircleCheck,
  info: Info,
};

type NotifyVariants = Record<NotifyTypes, string>;

export const notifyVars = cva(
  'relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 ease-out',
  {
    variants: {
      intent: {
        error: 'bg-neg-800/30 border-neg-200/30 text-neg-200 shadow-neg-600/20',
        success: 'bg-pos-800/30 border-pos-200/30 text-pos-200 shadow-pos-600/20',
        info: 'bg-white/30 border-white/30 text-white shadow-white/20',
      } satisfies NotifyVariants,
    },
    defaultVariants: {
      intent: 'error',
    },
  }
);

const BUTTON_TYPES = [
  'menu',
  'square',
  'tight',
  'submit',
  'cancel',
  'circle',
  'auth',
  'create'
] as const;

export type ButtonIntent = (typeof BUTTON_TYPES)[number];

type ButtonVariants = Record<ButtonIntent, string>;

export const buttonVars = cva(
  'inline-flex items-center justify-center cursor-pointer capitalize transition-all transition-200 ease-in-out',
  {
    variants: {
      intent: {
        menu: 'py-1 px-3 bg-hl-800 text-txt rounded-md shadow-sm shadow-black/30 hover:bg-hl-600 hover:shadow-md',
        
        square: 'p-0 w-[2rem] aspect-square bg-hl-800 text-txt rounded-md shadow-sm shadow-black/30 hover:bg-hl-600 hover:shadow-md',
        
        tight: 'px-1 bg-hl-600 text-txt rounded-sm shadow-sm shadow-black/30 hover:bg-hl',
        
        submit: 'py-3 px-4 w-40 bg-bg rounded-lg font-bold text-sm text-pos ring-inset ring-2 ring-pos hover:bg-pos hover:text-bg',
        
        cancel: 'py-3 px-4 w-40 bg-bg rounded-lg font-bold text-sm text-neg ring-inset ring-2 ring-neg hover:bg-neg hover:text-bg',

        circle: 'p-0 w-[2rem] rounded-full aspect-square shadow-md bg-txt-low hover:bg-txt-sub',

        auth: 'py-3 px-4 w-full bg-hl-800 text-sm rounded-full ring-2 ring-hl-800 text-txt uppercase hover:bg-hl-600 hover:ring-hl-600 active:ring-txt',

        create: 'p-0 w-[3rem] rounded-full aspect-square shadow-md bg-hl hover:bg-hl-400',
      } satisfies ButtonVariants,
    },
    defaultVariants: {
      intent: 'menu',
    }
  }
);