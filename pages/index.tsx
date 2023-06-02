import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

function Welcome() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">pages/index.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
export default function Home() {
  const session = useSession()
  if (session.status == 'loading') {
    // Handle loading state if needed
    return <div>Loading...</div>
  }
  return (
    <div>
      {session.data ? (
        <>
        <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-white font-semibold text-lg">Web Name</a>
            </Link>
          </div>
          <div className="flex">
            <Link href="/jobs">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Jobs</a>
            </Link>
            <Link href="/events">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Events</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
        </>
      ) : (
        // <Welcome />
        <>
        <nav className="bg-blue-800 py-2">
      <div className="container mx-auto justify-between px-4 flex">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Link href="/"className="text-white text-xl font-semibold">Unsoed-Fair
            </Link>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              <li>
                <Link href="/jobs"className="text-white hover:text-gray-300">Jobs
                </Link>
              </li>
              <li>
                <Link href="/event"className="text-white hover:text-gray-300">Event
                </Link>
              </li>
              </ul>
        </div>
      </div>
      <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button type="button" className="ant-btn ant-btn-default ant-dropdown-trigger m-0 !border-none !bg-transparent p-0 !shadow-none !outline-none after:!content-none">
              <div className="relative flex flex-shrink-0 cursor-pointer items-end justify-center overflow-hidden rounded-full h-[34px] max-h-[34px] w-[34px] max-w-[34px] border border-neutral-100 bg-violet-900">
                  <img src="https://id-static.z-dn.net/files/da1/52dae37cdd8241b264efb8468868ba99.jpg" alt="Avatar Pengguna" />
              </div>
            </button>
          </div>
      </div>
      </div>
    </nav>
    <main className='relative bg-blue-800'>
      <div className='relative bg-tertiary-violet-50 pt-12 lg:pt-0' id="jumbotron-homepage">
        <div className="absolute top-0 left-0 z-10 -mt-2"></div>
        <div className='absolute bottom-0 right-0'></div>
        <div>
          <div className='flex justify-center'>
            <div className='w-full max-w-[1440px] px-4 md:px-[43px] flex justify-center pb-7 pt-9 lg:pt-[94px] lg:pb-[42px]'>
              <div className='w-full xl:w-[1162px]'>
                <div className='md:min-h-[80px]'>
                  <div className='relative z-[60]'>
                    <div>
                      <p className="text-[28px]  font-bold lg:text-[34px]">
                        <span className="GreetingText_greeting_text--shadow-stroke___dmLY">
                          <span className="text-white">Welcome,</span>
                          <span className="capitalize text-[#FEE156]">Tiannn</span>
                        </span>
                        <span className="GreetingText_greeting_text--shadow__oFmha">👌</span>
                      </p>
                      <p className="mt-[6px] text-base leading-[22.4px] text-white lg:text-lg lg:leading-[130%]">Ready to Uplift Your Career?</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        </>
      )}
    </div>
  )
}
