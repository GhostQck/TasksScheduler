'use client';

import { Button } from '@/components/ui/button';
import { UserRole } from '@/db/schema';
import { UserRoundSearch, ArrowDownFromLine, ArrowUpFromLine, ShieldBan } from 'lucide-react';
import { useState } from 'react';
import { ActivateButton, DeactivateButton, DeleteButton, InfoButton } from './modal_buttons';
import { EXPERT_BTNS } from './permissions';

type Expert = {
  id: string;
  name: string;
  status: boolean;
  addedAt: Date;
  addedByName: string | null;
};

interface ExpertListProps {
  role: UserRole | null;
  experts: Expert[];
}

export default function ExpertList({ role, experts }: ExpertListProps) {
  const activeExperts = role ? experts.filter(expert => expert.status) : [];
  const inactiveExperts = role === 'admin' || role === 'tech' ? experts.filter(expert => !expert.status) : [];

  return (
    <>
      {activeExperts.length !== 0 ? (
        <div className='flex flex-col gap-4'>
          {activeExperts.map(expert => (
            <div
              key={expert.id}
              className='grid grid-cols-2 items-center gap-2 w-full bg-hl p-4 rounded-lg shadow-lg'
            >
              <h3 className='font-bold'>{expert.name}</h3>

              <div className='flex flex-row gap-2 justify-end'>
                <Button intent='square'>
                  <UserRoundSearch size={20} strokeWidth={2} />
                </Button>

                {role && (
                  <>
                    {EXPERT_BTNS.info.includes(role) && (
                      <InfoButton
                        expertId={expert.id}
                        expertName={expert.name}
                        addedBy={expert.addedByName || 'Unknown'}
                        addedDate={expert.addedAt.toLocaleDateString('en-US')}
                      />
                    )}

                    {EXPERT_BTNS.deactivate.includes(role) && (
                      <DeactivateButton
                        expertId={expert.id}
                        expertName={expert.name}
                      />
                    )}

                    {EXPERT_BTNS.delete.includes(role) && (
                      <DeleteButton
                        expertId={expert.id}
                        expertName={expert.name}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
          No active experts
        </p>
      )}

      {inactiveExperts.length > 0 && (
        <InactiveExperts role={role} experts={inactiveExperts} />
      )}
    </>
  );
}

function InactiveExperts({ role, experts }: ExpertListProps) {
  const [showInactive, setShowInactive] = useState(false);

  if (experts.length === 0) return null;

  return (
    <div className='flex flex-col gap-4'>
      <hr className='w-full h-1 bg-txt opacity-25 border-none rounded-full shadow-md' />

      {showInactive ? (
        <Button onClick={() => setShowInactive(false)}>
          <ArrowUpFromLine className='mr-2' size={20} strokeWidth={2} />
          Hide inactive experts
        </Button>
      ) : (
        <Button onClick={() => setShowInactive(true)}>
          <ArrowDownFromLine className='mr-2' size={20} strokeWidth={2} />
          Show inactive experts
        </Button>
      )}

      {showInactive && (
        <>
          {experts.map(expert => (
            <div
              key={expert.id}
              className='grid grid-cols-2 items-center gap-2 w-full bg-hl/20 p-4 rounded-lg shadow-lg'
            >
              <h3 className='flex flex-row gap-2 font-bold'>
                <ShieldBan className='translate-y-[5%]' size={20} strokeWidth={2} />
                {expert.name}
              </h3>

              <div className='flex flex-row gap-2 justify-end'>
                <Button intent='square'>
                  <UserRoundSearch size={20} strokeWidth={2} />
                </Button>

                {role && (
                  <>
                    {EXPERT_BTNS.info.includes(role) && (
                      <InfoButton
                        expertId={expert.id}
                        expertName={expert.name}
                        addedBy={expert.addedByName || 'Unknown'}
                        addedDate={expert.addedAt.toLocaleDateString('en-US')}
                      />
                    )}

                    {EXPERT_BTNS.deactivate.includes(role) && (
                      <ActivateButton
                        expertId={expert.id}
                        expertName={expert.name}
                      />
                    )}

                    {EXPERT_BTNS.delete.includes(role) && (
                      <DeleteButton
                        expertId={expert.id}
                        expertName={expert.name}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}