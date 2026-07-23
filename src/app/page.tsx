export default function Root() {
  return (
    <main className='flex flex-col min-h-screen w-full justify-start items-center'>
      <header className='w-full'>
        <nav
          className='
            hidden md:flex sticky top-0 flex-row gap-2 py-2 px-4 w-full items-center justify-center bg-txt text-bg text-lg select-none font-bold uppercase

            *:py-1 *:px-4 *:bg-txt *:cursor-pointer *:rounded-md

            *:duration-200 *:transition-all *:ease-in-out

            *:hover:brightness-[1.1] *:hover:shadow-md
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
          grid gap-4 lg:grid-cols-2

          *:w-md *:rounded-xl *:border-2 *:border-txt *:bg-fg *:p-2 *:shadow-xl

          [&>section>h2]:w-full [&>section>h2]:text-center [&>section>h2]:text-xl [&>section>h2]:font-bold [&>section>h2]:uppercase [&>section>h2]:select-none
        '
      >
        <section>
          <h2>in progress</h2>
          <div className='w-full mt-2 text-center'>
            <label
              htmlFor='expert_select'
              className='mr-2 select-none'
            >Assign to:</label>
            <div className='inline'>
              <select
                id='expert_select'
                className='
                  w-40 p-2 bg-fg-dark rounded-lg cursor-pointer font-inherit

                  duration-200 transition-all ease-in-out

                  hover:brightness-[1.1]
                  
                  focus:brightness-[1.1] focus:ring-2 focus:ring-txt/30

                  *:font-sans
                '
              >
                <option value='uuid-1'>Expert-1</option>
                <option value='uuid-2'>Expert-2</option>
                <option value='uuid-3'>Expert-3</option>
              </select>
            </div>
          </div>
        </section>
        <section>
          <h2>pending</h2>
          <div
            className='
              flex flex-col gap-4 w-full p-2

              *:w-full
            '
          >
            <button
              className='
                hidden md:block rounded-lg border-2 border-txt bg-hl opacity-[.5] uppercase cursor-pointer

                duration-300 transition-all ease-in-out

                hover:p-6 hover:opacity-[.75]
              '
            >create new</button>
            <hr className='hidden md:block' />
            <div className='w-full'>
              <h3 className='inline mr-2 capitalize select-none'>task search</h3>
              <button
                className='
                  inline bg-fg rounded-md px-1 ring-1 ring-txt cursor-pointer uppercase

                  duration-300 transition-all ease-in-out

                  hover:brightness-[1.1]
                '
              >hide ▲</button>
            </div>
            <div className='grid grid-cols-2 gap-2 !p-0 !bg-transparent'>
              <input
                name='task_src_cx'
                type='text'
                placeholder='CX ID'
                className='
                  bg-fg-dark rounded-full py-2 px-4 shadow-lg text-sm

                  duration-200 transition-all ease-in-out

                  hover:brightness-[1.1] hover:shadow-xl

                  focus:outline-none focus:ring-2 focus:ring-txt/30
                '
              />
              <input
                name='task_src_chat'
                type='text'
                placeholder='CHAT ID'
                className='
                  bg-fg-dark rounded-full py-3 px-4 shadow-lg text-sm

                  duration-200 transition-all ease-in-out

                  hover:brightness-[1.1] hover:shadow-xl

                  focus:outline-none focus:ring-2 focus:ring-txt/30
                '
              />
            </div>
            <hr />
            <h2>Queue:</h2>
            <div className='relative bg-hl p-2 rounded-lg shadow-xl'>
              <span className='absolute top-2 right-2 py-1 px-3 bg-gr-blue rounded-xl text-[.625rem] shadow-xs/30 text-slate-200 font-bold uppercase select-none'>new</span>
              <strong className='block w-full lowercase'>
                3000 words -
                <span className='uppercase text-red-300'> 0 hrs left</span>
              </strong>
              <time className='text-sm lowercase'>17 hrs ago</time>
              <div className='w-full bg-hl my-1 px-2 py-1 brightness-[.9] rounded-md'>
                <ul className='[&>li>strong]:leading-loose [&>li>strong]:select-none'>
                  <li>
                    <strong>CX ID: </strong>
                    <button
                      className='
                        px-1 rounded-sm shadow-sm bg-hl-dark cursor-pointer

                        duration-200 transition-all ease-in-out

                        hover:brightness-[1.1]
                      '
                    >000000</button>
                  </li>
                  <li>
                    <strong>CHAT ID: </strong>
                    <button
                      className='
                        px-1 rounded-sm shadow-sm bg-hl-dark cursor-pointer

                        duration-200 transition-all ease-in-out

                        hover:brightness-[1.1]
                      '
                    >123450000099999</button>
                  </li>
                  <li>
                    <strong>SUBMITTED: </strong>
                    <button
                      className='
                        px-1 rounded-sm shadow-sm bg-hl-dark cursor-pointer

                        duration-200 transition-all ease-in-out

                        hover:brightness-[1.1]
                      '
                    >23.07.2026 - 6 PM</button>
                    &nbsp;by Nick
                  </li>
                  <li>
                    <strong>DEADLINE: </strong>
                    <button
                      className='
                        px-1 rounded-sm shadow-sm bg-hl-dark cursor-pointer

                        duration-200 transition-all ease-in-out

                        hover:brightness-[1.1]
                      '
                    >24.07.2026 - 11 PM</button>
                  </li>
                </ul>
              </div>
              <div
                className='
                  relative flex flex-row gap-2 pt-1 w-full

                  [&>button]:py-1 [&>button]:px-3 [&>button]:bg-hl-dark [&>button]:rounded-md [&>button]:shadow-md [&>button]:capitalize [&>button]:cursor-pointer

                  [&>button]:duration-200 [&>button]:transition-all [&>button]:ease-in-out

                  [&>button]:hover:brightness-[1.1] [&>button]:hover:shadow-lg
                '
              >
                <button>U</button>
                <button>T</button>
                <button>more details ▼</button>
                <button
                  className='absolute right-[.75]'
                >cancel</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
