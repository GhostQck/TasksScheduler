import { Button } from '@/components/ui/button';
import { InputField } from '@/components/form/input';

export default function Root() {
  return (
    <main className='flex flex-col min-h-screen w-full justify-start items-center'>
      <dialog className='flex justify-center items-center absolute z-2 h-screen w-screen text-txt bg-black/60 backdrop-blur-md'>
        <div className='w-md bg-bg p-4 rounded-xl shadow-xl select-none'>
          <h2 className='w-full mb-4 text-center text-xl font-bold'>NEW TASK</h2>

          <form
            className='
              grid grid-cols-4 gap-4 w-full

              [grid-template-areas:"a_a_b_b"_"c_c_c_d"_"e_e_e_e"_"f_f_f_f"_"g_g_h_h"]
            '
          >
            <InputField
              id='n_task_cx'
              name='n_task_cx'
              type='text'
              maxLength={30}
              labelText='CX ID'
              intent='transparent_bg'
              wrapperCN='[grid-area:a]'
              labelCN='text-slate-200'
            />

            <InputField
              id='n_task_chat'
              name='n_task_chat'
              type='text'
              maxLength={30}
              labelText='CHAT ID'
              intent='transparent_bg'
              wrapperCN='[grid-area:b]'
              labelCN='text-slate-200'
            />

            <div className='[grid-area:c] relative'>
              <input
                id='n_task_ddl'
                name='n_task_ddl'
                type="number"
                defaultValue={24}
                placeholder=' '
                maxLength={3}
                className='
                  peer block bg-bg rounded-full py-3 px-4 w-full text-sm ring-2 ring-txt/30

                  duration-200 transition-all ease-in-out

                  hover:ring-txt

                  focus:outline-none focus:ring-txt

                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                '
              />

              <label
                htmlFor='n_task_ddl'
                className='
                  pointer-events-none absolute text-sm text-slate-200 left-4 top-1/2 -translate-y-1/2 p-1 rounded-full opacity-50 uppercase

                  duration-200 transition-all

                  peer-focus:top-0 peer-focus:text-xs peer-focus:bg-bg peer-focus:opacity-100

                  peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-bg peer-[:not(:placeholder-shown)]:opacity-100
                '
              >DEADLINE</label>

              <div className='absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-3'>
                <button
                  type='button'
                  className='
                    w-[2rem] aspect-square bg-txt/30 rounded-full shadow-md cursor-pointer

                    duration-200 transition-all ease-in-out

                    hover:brightness-110
                  '
                >-</button>

                <button
                  type='button'
                  className='
                    w-[2rem] aspect-square bg-txt/30 rounded-full shadow-md cursor-pointer

                    duration-200 transition-all ease-in-out

                    hover:brightness-110
                  '
                >+</button>
              </div>
            </div>

            <div className='[grid-area:d]'>
              <select
                id='n_task_time'
                name='n_task_time'
                className='
                  w-full py-3 px-4 bg-txt/30 ring-2 ring-txt/30 rounded-full cursor-pointer text-center font-inherit

                  duration-200 transition-all ease-in-out

                  hover:brightness-110
                  
                  focus:brightness-110 focus:ring-2 focus:ring-txt

                  *:font-sans
                '
              >
                <option value='hours'>hours</option>
                <option value='days'>days</option>
              </select>
            </div>

            <div className='[grid-area:e] relative'>
              <textarea
                id='n_task_desc'
                name='n_task_desc'
                rows={4}
                maxLength={256}
                placeholder=' '
                className='
                  peer block w-full bg-bg rounded-lg p-4 text-sm ring-2 ring-txt/30 resize-none

                  duration-200 transition-all ease-in-out

                  hover:ring-txt

                  focus:outline-none focus:ring-txt
                '
              />

              <label
                htmlFor='n_task_desc'
                className='
                  pointer-events-none absolute text-sm text-slate-200 left-4 top-4 p-1 rounded-full opacity-50 uppercase

                  duration-200 transition-all

                  peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-bg peer-focus:opacity-100

                  peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-bg peer-[:not(:placeholder-shown)]:opacity-100
                '
              >{`DESCRIPTION (256 char)`}</label>
            </div>

            <hr className='[grid-area:f] my-4' />

            <div className='[grid-area:g] flex justify-start'>
              <Button
                type='submit'
                formMethod='dialog'
                intent='cancel'
              >Discard</Button>
            </div>

            <div className='[grid-area:h] flex justify-end'>
              <Button
                type='submit'
                intent='submit'
              >Create</Button>
            </div>
          </form>
        </div>
      </dialog>
      <header className='w-full'>
        <nav
          className='
            hidden md:flex sticky top-0 flex-row gap-2 py-2 px-4 w-full items-center justify-center bg-txt text-bg text-lg shadow-xl select-none font-bold uppercase

            *:py-1 *:px-4 *:bg-txt *:cursor-pointer *:rounded-md

            *:duration-200 *:transition-all *:ease-in-out

            *:hover:brightness-110 *:hover:shadow-md
          '
        >
          <a>Main</a>
          <a>All Tasks</a>
          <a>Experts</a>
          <a>Agents</a>
          <button
            className='ml-auto !rounded-full !bg-bg h-full aspect-square'
          ></button>
        </nav>

        <h1
          className='
            w-full p-4 text-xl font-extrabold uppercase

            md:text-2xl lg:text-4xl text-center
          '
        >213 pending tasks</h1>
      </header>
      <div
        className='
          grid gap-4 lg:grid-cols-2 items-start

          *:w-md *:rounded-xl *:border-2 *:border-txt *:bg-fg *:p-4 *:shadow-xl

          [&>section>h2]:w-full [&>section>h2]:text-center [&>section>h2]:text-xl [&>section>h2]:font-bold [&>section>h2]:uppercase [&>section>h2]:select-none
        '
      >
        <section>
          <h2>in progress</h2>

          <div className='w-full mt-2 text-center'>
            <div className='w-full pb-4'>
              <label
                htmlFor='expert_select'
                className='mr-2 select-none'
              >Assign to:</label>

              <select
                id='expert_select'
                name='expert_select'
                className='
                  w-40 p-2 bg-fg-800 rounded-lg cursor-pointer font-inherit

                  duration-200 transition-all ease-in-out

                  hover:bg-fg-600
                  
                  focus:bg-fg-600 focus:ring-2 focus:ring-txt/30

                  *:font-sans
                '
              >
                <option value='uuid-1'>Expert-1</option>
                <option value='uuid-2'>Expert-2</option>
                <option value='uuid-3'>Expert-3</option>
              </select>

              <label
                htmlFor='expert_select'
                className='mr-2 select-none'
              >
                <div className='inline-block ml-2 w-[.75rem] h-[.75rem] rounded-full aspect-square bg-pos'></div>
              </label>
            </div>

            <hr />

            <div className='text-left py-4'>
              <span className='block opacity-75'>
                from
                <time className='font-semibold'> 24.07 at 3 PM </time>
                to
                <time className='font-semibold'> 25.07 at 2 AM</time>
              </span>

              <div className='flex flex-row gap-2 justify-start items-center'>
                <h3 className='font-bold text-lg'>Expert-1</h3>

                <Button intent='square'>E</Button>

                <Button intent='square'>C</Button>
              </div>
            </div>

            <hr />

            <h3 className='mt-4 uppercase'>1 task in progress</h3>
          </div>
        </section>

        <section>
          <h2 className='mb-4'>pending</h2>

          <div
            className='
              flex flex-col gap-4 w-full

              *:w-full
            '
          >
            <button
              className='
                hidden md:block rounded-lg border-2 border-txt bg-hl opacity-50 uppercase cursor-pointer

                duration-300 transition-all ease-in-out

                hover:p-6 hover:opacity-75
              '
            >create new</button>

            <hr className='hidden md:block' />

            <h3 className='inline mr-2 capitalize select-none'>task search</h3>

            <div className='grid grid-cols-2 gap-2 !p-0 !bg-transparent'>
              <div className='relative'>
                <input
                  id='task_src_cx'
                  name='task_src_cx'
                  type='text'
                  placeholder=' '
                  maxLength={30}
                  className='
                    peer block bg-fg-800 rounded-full py-3 px-4 w-full shadow-lg text-sm

                    duration-200 transition-all ease-in-out

                    hover:bg-fg-600 hover:shadow-xl

                    focus:bg-fg-600 focus:outline-none focus:ring-2 focus:ring-txt/30
                  '
                />

                <label
                  htmlFor='task_src_cx'
                  className='
                    pointer-events-none absolute text-sm text-txt-200 left-4 top-1/2 -translate-y-1/2 p-1 rounded-sm opacity-50 uppercase

                    duration-200 transition-all

                    peer-focus:top-0 peer-focus:text-xs peer-focus:bg-fg-600 peer-focus:opacity-100

                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-fg-800 peer-[:not(:placeholder-shown)]:opacity-100
                  '
                >CX ID</label>
              </div>

              <div className='relative'>
                <input
                  id='task_src_chat'
                  name='task_src_chat'
                  type='text'
                  placeholder=' '
                  maxLength={30}
                  className='
                    peer block bg-fg-800 rounded-full py-3 px-4 w-full shadow-lg text-sm

                    duration-200 transition-all ease-in-out

                    hover:bg-fg-600 hover:shadow-xl

                    focus:bg-fg-600 focus:outline-none focus:ring-2 focus:ring-txt/30
                  '
                />

                <label
                  htmlFor='task_src_chat'
                  className='
                    pointer-events-none absolute text-sm text-slate-200 left-4 top-1/2 -translate-y-1/2 p-1 rounded-sm opacity-50 uppercase

                    duration-200 transition-all


                    peer-focus:top-0 peer-focus:text-xs peer-focus:bg-fg-600 peer-focus:opacity-100

                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-fg-800 peer-[:not(:placeholder-shown)]:opacity-100
                  '
                >CHAT ID</label>
              </div>
            </div>

            <hr />

            <h2>Queue</h2>

            <div className='relative bg-hl p-2 rounded-lg shadow-xl'>
              <span className='absolute top-2 right-2 py-1 px-3 bg-gr-blue rounded-xl text-[.625rem] shadow-xs/30 text-slate-200 font-bold uppercase select-none'>new</span>
              
              <strong className='block w-full lowercase'>
                3000 words -
                <span className='uppercase text-neg'> 0 hrs left</span>
              </strong>

              <time className='text-sm lowercase'>17 hrs ago</time>
              
              <div className='w-full bg-hl-800 my-1 px-2 py-1 rounded-md'>
                <ul className='[&>li>strong]:leading-loose [&>li>strong]:select-none'>
                  <li>
                    <strong>CX ID: </strong>
                    <Button intent='tight'>000000</Button>
                  </li>
                  <li>
                    <strong>CHAT ID: </strong>
                    <Button intent='tight'>123450000099999</Button>
                  </li>
                  <li>
                    <strong>SUBMITTED: </strong>
                    <Button intent='tight'>23.07.2026 - 6 PM</Button>&nbsp;by Nick
                  </li>
                  <li>
                    <strong>DEADLINE: </strong>
                    <Button intent='tight'>24.07.2026 - 11 PM</Button>
                  </li>
                  <li>
                    <strong className='block'>DESCRIPTION: </strong>
                    Some description etc etc
                  </li>
                </ul>
              </div>

              <div className='relative flex flex-row gap-2 pt-1 w-full'>
                <Button intent='square'>U</Button>

                <Button intent='square'>T</Button>

                <Button>more details ▼</Button>
                
                <Button
                  className='absolute right-[.75]'
                >cancel</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
