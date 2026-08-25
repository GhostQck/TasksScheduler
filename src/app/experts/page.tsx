import NavMenu from '@/components/nav/NavMenu';
import { Button } from '@/components/ui/button';
import { X, Pencil, Info, UserRoundPlus, UserRoundSearch, ShieldBan, Trash2, ArrowBigRight, ArrowBigLeft, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { DeactivateButton, DeleteButton, InfoButton } from './modal_buttons';

export default function Experts() {
  return (
    <main className='flex flex-col min-h-screen w-full justify-start items-center'>
      <header className='w-full'>
        <NavMenu />

        <h1 className='w-full p-4 text-xl font-extrabold uppercase md:text-2xl lg:text-4xl text-center'>
          NOW : Expert-1
        </h1>
      </header>

      <div className='grid gap-8 md:grid-cols-[4fr_auto_4fr] items-start w-3xl'>
        <section className='flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-1 select-none'>
            <Button className='peer' intent='create'>
              <UserRoundPlus className='-translate-y-[5%] translate-x-[5%]' strokeWidth={2} />
            </Button>

            <ChevronLeft className='opacity-50 transition-opacity peer-hover:opacity-100' size={25} strokeWidth={1} /> 
            <span className='opacity-50 transition-opacity peer-hover:opacity-100'>Add new expert</span>
          </div>

          <div className='grid grid-cols-2 items-center gap-2 w-full bg-hl p-4 rounded-lg shadow-lg'>
            <h3 className='font-bold'>Expert-1</h3>

            <div className='flex flex-row gap-2 justify-end'>
              <Button intent='square'>
                <UserRoundSearch size={20} strokeWidth={2} />
              </Button>

              <InfoButton
                expertId='1'
                expertName='Expert-1'
                addedBy='Jack'
                addedDate='18.08.2026'
              />

              <DeactivateButton
                expertId='1'
                expertName='Expert-1'
              />

              <DeleteButton
                expertId='1'
                expertName='Expert-1'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 items-center gap-2 w-full bg-hl p-4 rounded-lg shadow-lg'>
            <h3 className='font-bold'>Expert-2</h3>

            <div className='flex flex-row gap-2 justify-end'>
              <Button intent='square'>
                <UserRoundSearch size={20} strokeWidth={2} />
              </Button>

              <Button intent='square'>
                <Info size={20} strokeWidth={2} />
              </Button>

              <Button intent='square'>
                <ShieldBan size={20} strokeWidth={2} />
              </Button>

              <Button
                intent='square'
                className='bg-neg-800 text-neg-200 hover:bg-neg-600'
              >
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </div>
          </div>
        </section>

        <hr className='w-1 h-full bg-txt border-none rounded-full shadow-md' />

        <section className='hidden md:block'>
          <div className='grid grid-cols-[auto_1fr_auto_auto] gap-2 w-full'>
            <Button intent='square'>
              <ArrowBigLeft size={20} strokeWidth={2} />
            </Button>

            <Button className='font-semibold'>14.08.2026</Button>

            <Button intent='square'>
              <ArrowBigRight size={20} strokeWidth={2} />
            </Button>

            <Button intent='square'>
              <Pencil size={20} strokeWidth={2} />
            </Button>
          </div>

          <div className='flex flex-col gap-4 w-full mt-4'>
            <div className='pb-2 w-full border-[0_0_2_0]'>
              <time className='flex flex-row font-semibold'>
                <span className='w-7 select-none'>I.</span>
                00:00
                <MoveRight className='mx-1' />
                06:00
              </time>
            </div>

            <div className='group p-4 bg-txt/20 text-txt-800 border-2 border-txt-800 border-dashed rounded-lg opacity-50 select-none transition-opacity duration-400 ease-in-out hover:opacity-100'>
              <div className='flex flex-row justify-center items-center h-2 opacity-0 overflow-hidden transition-all duration-400 ease-in-out group-hover:h-[2rem] group-hover:opacity-100'>
                <ChevronRight size={25} strokeWidth={1} />
                <span className='capitalize'>Drag here</span>
                <ChevronLeft size={25} strokeWidth={1} />
              </div>
            </div>

            <div className='grid grid-cols-2 items-center gap-2 w-full bg-hl p-4 rounded-lg shadow-lg'>
              <h3 className='font-bold'>Expert-2</h3>

              <div className='flex flex-row gap-2 justify-end'>
                <Button intent='square'>
                  <UserRoundSearch size={20} strokeWidth={2} />
                </Button>

                <Button intent='square'>
                  <Info size={20} strokeWidth={2} />
                </Button>

                <Button intent='square'>
                  <X size={20} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}