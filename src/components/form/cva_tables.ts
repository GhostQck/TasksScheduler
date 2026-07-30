import { cva } from 'class-variance-authority';

export const inputVars = cva(
  'peer block rounded-full py-3 px-4 w-full text-sm text-txt duration-200 transition-all ease-in-out focus:outline-none',
  {
    variants: {
      intent: {
        solid: 'bg-fg-800 shadow-lg hover:bg-fg-600 hover:shadow-xl focus:bg-fg-600 focus:ring-2 focus:ring-txt/30',

        transparent_bg: 'bg-bg ring-2 ring-txt/30 hover:ring-txt focus:ring-txt',
      },
    },
    defaultVariants: {
      intent: 'solid',
    }
  }
);

export const labelVars = cva(
  'pointer-events-none absolute bg-transparent rounded-full p-1 text-sm left-4 top-1/2 -translate-y-1/2 opacity-50 uppercase duration-200 transition-all  peer-focus:top-0 peer-focus:text-xs peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-100',
  {
    variants: {
      intent: {
        solid: 'peer-focus:bg-fg-600 peer-[:not(:placeholder-shown)]:bg-fg-600',

        transparent_bg: 'peer-focus:bg-bg peer-[:not(:placeholder-shown)]:bg-bg',
      },
    },
    defaultVariants: {
      intent: 'solid',
    }
  }
);