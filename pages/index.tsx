import Image from 'next/image'
import Link from 'next/link'
import { IUser, useUser } from '../lib/useUser'
import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { Menu } from '@headlessui/react'
import { AppContext } from '../lib/context'

export function Home() {
  const [user, loading] = useUser()
  if (!loading) {
    if (!user) {
      Router.push('login')
      return
    }
    return <Jobs />
  }
}
function Jobs() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ctx = useContext(AppContext)
  console.log(ctx.user)

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
    return Router.push('/login')
  }
  return (
    <div className=" h-full bg-violet-700">
      <nav
        className={`${
          scrolled ? 'bg-white shadow-md' : 'bg-violet-700'
        } py-4 px-24 fixed w-full z-10 top-0 flex items-center justify-between`}
      >
        <div className="flex space-x-8">
          <Link href="/" className={`text-white text-2xl font-bold ${scrolled ? 'text-yellow-500' : ''}`}>
            Unsoed
            <span className={scrolled ? 'text-violet-600' : ''}>Fair</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/jobs" className="text-gray-300 hover:text-white">
              Jobs
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white">
              Events
            </Link>
          </div>
        </div>
        <div className="relative">
          <Menu>
            <Menu.Button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1685117281~exp=1685117881~hmac=d6f13693c4cba098e4dc2d5239e6a23143a81a995da9401e3883a958876c5316"
                  alt="Avatar"
                />
              </button>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link href={'/profile'}>
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
          <span className="text-yellow-400 "> {ctx.user?.fullname}</span>
        </div>
      </div>
      <div className="bg-white rounded-t-[0px] mt-8 p-6 min-h-full">
        <div className="max-w-[1200px] mx-auto space-y-6 ">
          <div className="flex space-x-6">
            <Link href="/" className="text-lg text-gray-800 font-bold border-b-2 border-gray-800 py-2">
              For You
            </Link>
            <Link href="/" className="text-lg text-gray-500 font-medium  py-2 cursor-pointer">
              Explore
            </Link>
            <Link href="/" className="text-lg text-gray-500 font-medium  py-2 cursor-pointer">
              Saved
            </Link>
          </div>
          <div className="w-full flex space-x-2">
            <input
              className="w-full border border-gray-300 rounded-lg py-1 px-4 outline-none focus:border-violet-500"
              type="search"
              placeholder="Search job by title or company"
            />
            <div className="flex items-center border border-gray-300 rounded-lg">
              <select className="p-2 bg-transparent border-none outline-none">
                <option value="">Job Type</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <select className="p-2 bg-transparent border-none outline-none">
                <option value="">City</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <select className="p-2 bg-transparent border-none outline-none">
                <option value="">Experience Level</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 bg-gray-100s ">
            {Array(20)
              .fill(1)
              .map((v, i) => (
                <Link href={'/job-detail/' + v + i} key={v + i}>
                  <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          'http://mgt.unida.gontor.ac.id/wp-content/uploads/2021/09/1575050504675-logo-tokopedia-300x225.jpg'
                        }
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full object-contain"
                      />
                      <div className="ml-3">
                        <h2 className="text-md font-bold">Software Engineer</h2>
                        <p className="text-gray-600 text-sm">PT. Tokopedia</p>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-gray-600 text-sm">Jakarta</div>
                      <div className="text-gray-600 text-sm">Beginner</div>
                    </div>
                    <div className="rounded-full bg-blue-400 text-white text-xs py-1 px-2 mr-2 inline-block">
                      Fulltime
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
export default function Welcome() {
  return (
    <div id="__next" className='h-full bg-violet-700'>
      <main>
        <nav id="navbar-main" className='fixed top-0 z-[100] flex h-[76px] w-full bg-transparent px-4 transition-all duration-300 lg:px-8 bg-violet-700'>
          <div className='mx-auto flex w-full max-w-screen-laptop-lg items-center justify-between'>
            <div className='flex'>
              <a href="/">
                <img src="#" alt="" />
                <img src="#" alt="" />
              </a>
              <ul className='hidden items-center justify-center lg:ml-[27px] lg:flex'>
                <li className='mb-3 items-center lg:mr-8 lg:mb-0'>
                  <a href="#" className='mb-3 items-center justify-center text-sm font-semibold leading-none text-white'>Jobs</a>
                </li>
                <li className='mb-3 items-center lg:mr-8 lg:mb-0'>
                  <a href="#" className='mb-3 items-center justify-center text-sm font-semibold leading-none text-white'>Companies</a>
                </li>
                <li className='mb-3 items-center lg:mr-8 lg:mb-0'>
                  <a href="#" className='mb-3 items-center justify-center text-sm font-semibold leading-none text-white'>Career Fair</a>
                </li>
                <li className='mb-3 items-center lg:mr-8 lg:mb-0'>
                  <a href="#" className='mb-3 items-center justify-center text-sm font-semibold leading-none text-white'>International Japan Trip</a>
                </li>
              </ul>
            </div>
            <ul className='navbar-menu-mobile flext items-center gap-1.5 kg:gap-0'>
              <div className='header-menu-mobile mb-1 flex w-full items-center justify-between lg:mb-0'>
                <a href="#" className='h-max'></a>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify cursor-pointer text-xl text-[#BABABA] lg:hidden iconify iconify--ci" width="1em"  height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"></path>
                </svg>
              </div>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">Jobs</a>
              </li>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">Companies</a>
              </li>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">Career Fair</a>
              </li>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">International Japan Trip</a>
              </li>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">For Employers</a>
              </li>
              <li className='mb-0 w-full items-center text-center lg:mr-8 lg:hidden'>
                <a href="#" className="flex w-full items-center justify-center py-[10px] text-sm font-medium leading-[18px] text-neutral-80 lg:p-0">Login</a>
              </li>
              <li className='hidden lg:list-item'>
                <a href="/register" className=" flex h-[38px] w-max items-center justify-center rounded-[84px] border border-solid border-tertiary-violet-60 bg-white px-[26px] text-xs font-bold leading-none text-[#6913D8] lg:border-white ">Sign Up</a>
              </li>
              <hr className="mt-2 mb-[18px] w-full border-t border-solid border-t-[#D0D1D3] lg:hidden"/>
              <div className='mb-1 flex w-full justify-center gap-4 lg:hidden'>
                <a href="#" className='flex h-[36px] w-full max-w-[250px] items-center justify-center rounded-[84px] border border-solid border-[#6913D8] bg-white text-xs font-bold leading-none text-[#6913D8]'>Login</a>
                <a href="#" className=" flex h-[36px] w-full max-w-[250px] items-center justify-center rounded-[84px] bg-[#6913D8] text-xs font-bold leading-none text-white ">Sign up</a>
              </div>
            </ul>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify cursor-pointer text-2xl text-white lg:hidden iconify--eva custom-cursor-on-hover" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <g id="iconifyreact396">
                <g id="iconifyreact397">
                  <g id="iconifyreact398" fill="currentColor">
                    <rect width="18" height="2" x="3" y="11" rx=".95" ry=".95"></rect>
                    <rect width="18" height="2" x="3" y="16" rx=".95" ry=".95"></rect>
                    <rect width="18" height="2" x="3" y="6" rx=".95" ry=".95"></rect>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </nav>
        <header className="section relative z-[5] flex w-full items-center overflow-hidden overflow-x-hidden bg-header bg-cover md:bg-none md:bg-auto  Header_header__Zqwz_ h-[505px] sm:h-[470px] lg:h-[766px] bg-violet-700">
          <div className="container px-4 lg:px-[60px] 2xl:px-[30px]">
            <div className='z-10'>
              <div className="flex flex-col items-center gap-[60px] lg:flex-row">
                <div className='order-2 lg:order-1 lg:w-3/5'>
                  <h1 className="z-10 w-full text-[28px] font-bold leading-[1.3] text-white lg:text-[50px] lg:leading-[1.35]" >
                  Let 450+ Top Indonesian Companies Approach You
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>
      </main>
    </div>
  )
}
