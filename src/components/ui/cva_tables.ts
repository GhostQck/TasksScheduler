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
  'relateive overflow-hidden flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 ease-out',
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