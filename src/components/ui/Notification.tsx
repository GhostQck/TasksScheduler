'use client';

import { useState, useEffect, useCallback } from 'react';
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

  const handleClose = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setNotify(null);
      setIsFading(false);
    }, 300);
  }, []);

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
    }
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (!notify) return;

    const timer = setTimeout(() => {
      handleClose();
    }, DISMISS_TIME);

    return () => clearTimeout(timer);
  }, [notify, handleClose]);

  if (!notify) return null;

  return (
    <div className='fixed top-5 right-5 z-50 max-w-sm w-full pointer-events-auto select-none'>
      <NotifyBlock
        intent={notify.type}
        title={notify.title}
        description={notify.description}
        dismissTime={DISMISS_TIME}
        onClose={handleClose}
        className={
          isFading ? 'opacity-0 translate-x-4 scale-95' : 'opacity-100 translate-x-0 scale-100'
        }
      />
    </div>
  );
}