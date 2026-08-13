import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { NOTIFY_ICON_MAP, notifyVars } from './cva_tables';
import { X } from 'lucide-react';

interface NotifyBlockProps
extends React.ComponentProps<'div'>,
VariantProps<typeof notifyVars> {
  title: string;
  description: string;
  dismissTime: number;
  onClose: () => void;
}

export default function NotifyBlock({
  className,
  intent,
  title,
  description,
  dismissTime,
  onClose,
  ...props
}: NotifyBlockProps) {
  const IconComponent = NOTIFY_ICON_MAP[intent || 'info'];

  return (
    <div
      className={cn(notifyVars({ intent }), className)}
      {...props}
    >
      <div className='shrink-0 mt-0.5'>
        <IconComponent />
      </div>

      <div className='flex-1'>
        <h4 className='text-sm font-semibold text-white leading-right'>
          {title}
        </h4>
        <p className='text-xs mt-1 leading-relaxed'>
          {description}
        </p>
      </div>

      <button
        onClick={onClose}
        className='shrink-0 p-1 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer'
        aria-label='Close Notification'
      ><X /></button>

      <div className='absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50 overflow-hidden'>
        <div
          className='h-full transition-all ease-linear bg-white/40'
          style={{
            animation: `notify-progress ${dismissTime}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}