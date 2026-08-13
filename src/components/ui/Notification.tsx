'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { NotifyMessage, MSGS_MAP } from '@/lib/notifies';
import NotifyBlock from './NotifyBlock';

const DISMISS_TIME = 4000;

export default function Notification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [notify, setNotify] = useState<NotifyMessage | null>(null);
  const [isFading, setIsFading] = useState(false);

  const handleClose = () => {
    setIsFading(true);
    setTimeout(() => {
      setNotify(null);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    const notifyKey = searchParams.get('notify');

    if (notifyKey && MSGS_MAP[notifyKey]) {
      const notifyInfo = MSGS_MAP[notifyKey];

      setNotify({
        id: Date.now().toString(),
        ...notifyInfo,
      });
      setIsFading(false);

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('notify');

      const paramString = newParams.toString();
      const cleanUrl = paramString ? `${pathname}?${paramString}` : pathname;

      router.replace(cleanUrl, { scroll: false });

      const timer = setTimeout(() => {
        handleClose();
      }, DISMISS_TIME);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname, router]);

  if (!notify) return null;

  return (
    <div className='fixed top-5 right-5 z-50 max-w-sm w-full pointer-events-auto select-none'>
      <NotifyBlock
        intent={notify.type}
        title={notify.title}
        description={notify.description}
        dismissTime={DISMISS_TIME}
        onClose={handleClose}
      />
    </div>
  );
}