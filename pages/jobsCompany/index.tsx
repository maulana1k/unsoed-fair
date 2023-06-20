import Image from 'next/image'
import Link from 'next/link'
import { IUser, useUser } from '@/lib/useUser'
import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { Menu } from '@headlessui/react'
import { AppContext } from '@/lib/context'


export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ctx = useContext(AppContext)
  console.log(ctx)

  const changeNav = () => {
    window.scrollY >= 90 ? setScrolled(true) : setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
    return () => {
      window.removeEventListener('scroll', changeNav)
    }
  }, [])
  const logout = () => {
    ctx.destroyUser()
    return Router.push('/login-company')
  }
  if (!ctx.loading) {
    if (!ctx.user) {
      Router.push('/login-company')
      return
    }
    return (
      <div className="container h-full bg-violet-700">
        <nav
          className={`${
            scrolled ? 'bg-white shadow-md' : 'bg-violet-700'
          } py-4 px-24 fixed w-full z-10 top-0 flex items-center justify-between`}
        >
          <div className="flex space-x-8">
            <Link href="/" className={`text-white text-2xl font-bold`}>
              <span className={scrolled ? 'text-violet-600' : ''}>UnsoedFair</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/jobs" className="text-gray-300 hover:text-white">
                Jobs
              </Link>
              <Link href="/InternCompany" className="text-gray-300 hover:text-white">
                Internship
              </Link>
              <Link href="/sponsorCompany" className="text-gray-300 hover:text-white">
                Sponsorship
              </Link>
            </div>
          </div>
          <div className="relative">
            <Menu>
              <Menu.Button>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://www.teknovidia.com/wp-content/uploads/2022/04/Logo-Shopee.jpg"
                    alt="Avatar"
                  />
                </button>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/profileCompany'}>
                        <button
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Profile
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </nav>
        <div className="max-w-[1200px] pt-24 mx-auto">
          <div className="text-4xl text-white font-semibold">
            Welcome,
            <span className="text-yellow-400 "> {ctx.user.fullname}</span>
          </div>
        </div>
        <div className="bg-white rounded-t-[0px] mt-8 p-6 min-h-full">
          <div className="max-w-[1200px] mx-auto space-y-6 ">
            <div className="flex space-x-6">
              <Link href="/" className="text-lg text-gray-800 font-bold border-b-2 border-gray-800 py-2">
                My Job Vacancy
              </Link>
              <Link href="/" className="text-lg text-gray-500 font-medium  py-2 cursor-pointer">
                Explore Job Fair
              </Link>
              <Link href="/" className="text-lg text-gray-500 font-medium  py-2 cursor-pointer">
                Full Jobs
              </Link>
            </div>
            <div className="w-full flex space-x-2">
              <input
                className="w-full border border-gray-300 rounded-lg py-1 px-4 outline-none focus:border-violet-500"
                type="search"
                placeholder="Search Job Vacancy Name"
              />
              <div className="w-full flex space-x-1">
                <button className="flex items-center justify-center bg-green-500 text-white text-xs py-1 px-4 rounded-lg">
                  New Vacancy
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6  ">
              {Array(5)
                .fill(1)
                .map((v, i) => (
                  <Link href={'/jobs/' + v + i} key={v + i}>
                    <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
                      <div className="flex items-center mb-4">
                        <img
                          src={
                            'https://www.teknovidia.com/wp-content/uploads/2022/04/Logo-Shopee.jpg'
                          }
                          alt="Company Logo"
                          className="w-10 h-10 rounded-full object-contain"
                        />
                        <div className="ml-3">
                          <h2 className="text-md font-bold">Software Engineer</h2>
                          <p className="text-gray-600 text-sm">PT. Shopee</p>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="text-gray-600 text-sm">Jakarta</div>
                        <div className="text-gray-600 text-sm">Beginner</div>
                      </div>
                      <div className="w-full flex space-x-1">
                      <button className="flex items-center justify-center bg-orange-500 text-white text-xs py-1 px-4 rounded-lg">
                        Edit
                      </button>
                      <button className="flex items-center justify-center bg-red-500 text-white text-xs py-1 px-4 rounded-lg">
                        Delete
                      </button>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  function Welcome() {
    return (
      <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
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
}
function Jobs() {
  const ctx = useContext(AppContext)
}
