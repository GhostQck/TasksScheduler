export default function Root() {
  return (
    <main className='flex flex-col min-h-screen w-full justify-start items-center'>
      <header className='max-w-md p-4'>
        <h1 className='w-full text-xl md:text-2xl lg:text-4xl font-extrabold uppercase'>213 tasks in total</h1>
      </header>
      <div className='grid lg:grid-cols-2 gap-4 *:w-md *:rounded-xl *:border-2 *:border-txt *:bg-fg *:p-2 *:shadow-xl [&>section>h2]:w-full [&>section>h2]:text-center [&>section>h2]:text-xl [&>section>h2]:font-bold [&>section>h2]:uppercase [&>section>h2]:select-none'>
        <section>
          <h2>pending</h2>
          <div className='flex flex-col gap-4 w-full p-2 *:w-full *:rounded-xl *:shadow-xl [&>div]:relative [&>div]:bg-hl [&>div]:p-2'>
            <button
              className='hover:p-6 hover:opacity-[.75] border-2 border-txt bg-hl opacity-[.5] uppercase cursor-pointer duration-300 transition-all ease-in-out'
            >new</button>
            <div>
              <span className='absolute top-2 right-2 py-1 px-3 bg-gr-blue rounded-xl text-[.625rem] shadow-xs/30 text-slate-200 font-bold uppercase select-none'>new</span>
              <strong className='block w-full lowercase'>3000 words</strong>
              <time className='text-sm lowercase'>17 hours ago</time>
            </div>
            <div>
              
            </div>
            <div>
              
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
