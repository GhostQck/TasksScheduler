export default function Root() {
  return (
    <main className='flex flex-col min-h-screen w-full justify-start items-center'>
      <header className='max-w-md p-4'>
        <h1
          className='
            w-full text-xl font-extrabold uppercase
            md:text-2xl lg:text-4xl
          '
        >213 tasks in total</h1>
      </header>
      <div
        className='
          grid gap-4 
          lg:grid-cols-2
          *:w-md *:rounded-xl *:border-2 *:border-txt *:bg-fg *:p-2 *:shadow-xl
          [&>section>h2]:w-full [&>section>h2]:text-center [&>section>h2]:text-xl [&>section>h2]:font-bold [&>section>h2]:uppercase [&>section>h2]:select-none
        '
      >
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
                rounded-lg border-2 border-txt bg-hl opacity-[.5] uppercase cursor-pointer
                duration-300 transition-all ease-in-out
                hover:p-6 hover:opacity-[.75]
              '
            >create new</button>
            <hr />
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
            <div className='relative bg-hl p-2 rounded-lg shadow-xl'>
              <span className='absolute top-2 right-2 py-1 px-3 bg-gr-blue rounded-xl text-[.625rem] shadow-xs/30 text-slate-200 font-bold uppercase select-none'>new</span>
              <strong className='block w-full lowercase'>
                3000 words -
                <span className='uppercase text-red-300'> 0 hrs left</span>
              </strong>
              <time className='text-sm lowercase'>17 hrs ago</time>
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
                  className='absolute right-1'
                >cancel</button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2>in progress</h2>
        </section>
      </div>
    </main>
  );
}
