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
    return Router.push('/login')
  }
  if (!ctx.loading) {
    if (!ctx.user) {
      Router.push('/login')
      return
    }
  return (
    <div id="__next" className='h-full bg-violet-700'>
      <main>
        
<nav className=" bg-violet-700 fixed w-full z-20 top-0 left-0 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="#" className="flex items-center">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UnsoedFair</span>
  </a>
  <div className="flex md:order-2">
  <a href="/register" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Sign up</a>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-violet-700 dark:border-gray-700">
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Jobs</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Internship</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Perusahaan</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

        {/* <nav id="navbar-main" className='fixed top-0 z-[100] flex h-[76px] w-full bg-transparent px-4 transition-all duration-300 lg:px-8 bg-violet-700'>
          <div className='mx-auto flex w-full max-w-screen-laptop-lg items-center justify-between'>
            <Link href="/" className={`text-white text-2xl font-bold`}>
              <span className={scrolled ? 'text-violet-600' : ''}>UnsoedFair</span>
            </Link>
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
            <ul className='navbar-menu-mobile flex items-center gap-1 kg:gap-0' >
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
              <li className='mb-0 w-full items-center text-center lg:mr-1'>
                <a href="/login" className="flex h-[38px] w-max items-center justify-center rounded-[84px] border border-solid border-tertiary-violet-60 bg-white px-[26px] text-xs font-bold leading-none text-[#6913D8] lg:border-white " >Login</a>
              </li>
              <li className='hidden lg:list-item'>
                <a href="/register" className=" flex h-[38px] w-max items-center justify-center rounded-[84px] border border-solid border-tertiary-violet-60 bg-white px-[26px] text-xs font-bold leading-none text-[#6913D8] lg:border-white ">Sign Up</a>
              </li>
              <hr className="mt-2 mb-[18px] w-full border-t border-solid border-t-[#D0D1D3] lg:hidden"/>
              <div className='mb-1 flex w-full justify-center gap-4 lg:hidden'>
                <a href="/login" className='flex h-[36px] w-full max-w-[250px] items-center justify-center rounded-[84px] border border-solid border-[#6913D8] bg-white text-xs font-bold leading-none text-[#6913D8]'>Login</a>
                <a href="/register" className=" flex h-[36px] w-full max-w-[250px] items-center justify-center rounded-[84px] bg-[#6913D8] text-xs font-bold leading-none text-white ">Sign up</a>
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
        </nav> */}
        <header className="relative z-[5] flex w-full items-center overflow-hidden overflow-x-hidden bg-header bg-cover md:bg-none md:bg-auto h-[505px] sm:h-[470px] lg:h-[766px] bg-violet-700 min-h-screen">
          <div className="px-4 lg:px-[60px] 2xl:px-[30px]">
            <div className='z-10'>
              <div className="flex flex-col items-center gap-[60px] lg:flex-col">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Biarkan 450+ Perusahaan Mengajak Anda Bergabung</h1>
                  <p className="mb-6 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-white text-center">UnsoedFair adalah sebuah website yang bertujuan untuk membantu para mahasiswa Universitas Jenderal Soedirman baik yang aktif untuk mencari tempat magang ataupun yang sudah lulus untuk mencari tempat kerja.</p>
                  <a href="/try-now" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 content-center">Get Started</a>
              </div>
            </div>
          </div>
        </header>
        <section className="py-[60px] lg:py-[120px] bg-white relative">
            <div className='flex flex-col items-center gap-[60px] lg:flex-col'>
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-600 md:text-5xl lg:text-6xl dark:text-slate-800 text-center">Bekerja Sama Dengan <span className="text-blue-600 dark:text-blue-500">450+ Perusahaan</span> Di Seluruh Dunia</h2>
            </div>
        </section>
        <section className='relative z-[5] bg-tertiary-violet-50 py-[60px] lg:pt-[156px] lg:pb-[188px]"'>
          <div className="container section__content lg:!px-[90px] relative items-center justify-center z-10 flex flex-col">
            <svg className="absolute top-0 left-0 right-0 mx-auto hidden lg:block w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="498" viewBox="0 0 1216 498" fill="none">
              <path d="M167.345 287.32C167.236 287.272 167.134 287.205 167.046 287.129C166.957 287.052 158.227 279.095 145.016 266.09C144.666 265.748 144.658 265.263 144.99 265.018C145.324 264.766 145.879 264.837 146.226 265.186C159.409 278.156 168.115 286.087 168.196 286.16C168.559 286.493 168.601 286.978 168.278 287.242C168.041 287.446 167.665 287.461 167.345 287.32ZM133.916 254.916C133.792 254.862 133.679 254.782 133.573 254.683C126.475 247.504 119.443 240.205 112.662 232.985C112.327 232.627 112.341 232.152 112.695 231.916C113.049 231.681 113.6 231.781 113.935 232.139C120.704 239.345 127.724 246.632 134.81 253.798C135.157 254.146 135.158 254.628 134.812 254.867C134.577 255.042 134.222 255.051 133.916 254.916ZM102.154 221.478C102.015 221.417 101.888 221.33 101.78 221.215C94.9013 213.667 88.243 206.126 81.9815 198.812C81.6665 198.447 81.7147 197.972 82.085 197.759C82.4553 197.545 83.0065 197.668 83.3214 198.032C89.571 205.333 96.2198 212.856 103.079 220.388C103.404 220.749 103.383 221.221 103.025 221.447C102.778 221.61 102.445 221.606 102.154 221.478ZM72.1705 186.941C72.0177 186.874 71.8778 186.775 71.7708 186.637C65.2563 178.723 59.0974 170.905 53.4459 163.4C53.1632 163.02 53.2404 162.557 53.6346 162.37C54.0289 162.182 54.5742 162.339 54.857 162.719C60.4918 170.202 66.6341 177.998 73.1293 185.896C73.4318 186.27 73.3791 186.736 73.0015 186.946C72.7633 187.067 72.4471 187.063 72.1705 186.941ZM44.6309 151.088C44.4562 151.011 44.2998 150.889 44.186 150.726C38.2535 142.353 32.8457 134.189 28.1241 126.446C27.8836 126.047 28.0215 125.604 28.4418 125.457C28.862 125.311 29.3965 125.516 29.6443 125.919C34.3472 133.623 39.7264 141.753 45.6375 150.094C45.9104 150.477 45.8088 150.937 45.4098 151.115C45.1695 151.22 44.8784 151.197 44.6309 151.088ZM20.9396 113.61C20.7285 113.517 20.5434 113.361 20.4353 113.163C15.5422 104.179 11.5152 95.5756 8.47591 87.6029C8.31179 87.1846 8.55897 86.7894 9.01661 86.7199C9.47425 86.6505 9.97487 86.9385 10.1317 87.3536C13.1482 95.256 17.1378 103.782 21.9956 112.706C22.2164 113.111 22.0493 113.542 21.6197 113.669C21.395 113.735 21.1579 113.706 20.9396 113.61ZM4.53639 74.2841C4.2598 74.1624 4.03007 73.9259 3.95585 73.6449C1.46227 64.0618 0.538749 55.2597 1.2283 47.491C1.26749 47.0794 1.68778 46.828 2.16821 46.9341C2.65593 47.0434 3.01142 47.4556 2.9795 47.8704C2.30822 55.4892 3.211 64.1317 5.67137 73.5648C5.78141 73.9894 5.48849 74.3494 5.01476 74.3742C4.84783 74.3835 4.68924 74.3513 4.53639 74.2841ZM4.78355 35.3937C4.325 35.192 4.07612 34.7289 4.2271 34.359L4.4515 33.7882C7.52827 26.25 12.7282 19.8416 19.9222 14.732C20.2614 14.4901 20.8209 14.5708 21.1582 14.9223C21.5054 15.2707 21.4989 15.7493 21.1598 15.9912C14.1676 20.9639 9.09926 27.1971 6.111 34.5184L5.89442 35.0701C5.74812 35.4496 5.25197 35.5923 4.79343 35.3906C4.79082 35.3969 4.79083 35.3969 4.78355 35.3937ZM957.207 454.228C956.749 454.026 956.5 453.563 956.653 453.187C956.807 452.81 957.301 452.674 957.762 452.869C967.562 457.129 977.149 461.114 986.264 464.719C986.747 464.902 987.003 465.368 986.874 465.748C986.742 466.134 986.258 466.289 985.792 466.106C976.655 462.492 967.04 458.494 957.207 454.228C957.214 454.231 957.214 454.231 957.207 454.228ZM942.123 447.537L942.115 447.534C933.097 443.46 923.656 439.057 914.038 434.434C913.584 434.219 913.358 433.743 913.523 433.38C913.699 433.013 914.207 432.861 914.655 433.111C924.254 437.718 933.681 442.115 942.684 446.182C943.14 446.39 943.386 446.859 943.226 447.233C943.075 447.602 942.581 447.739 942.123 447.537ZM899.215 427.227C899.201 427.22 899.186 427.214 899.172 427.208C890.259 422.812 880.949 418.128 871.504 413.272C871.056 413.045 870.846 412.569 871.036 412.209C871.226 411.849 871.736 411.735 872.186 411.978C881.627 416.824 890.92 421.508 899.818 425.897C900.269 426.118 900.488 426.591 900.313 426.957C900.138 427.302 899.652 427.419 899.215 427.227ZM1001.13 471.984C1000.7 471.795 1000.45 471.367 1000.56 470.994C1000.67 470.608 1001.15 470.436 1001.62 470.606C1011.7 474.34 1021.48 477.697 1030.69 480.584C1031.17 480.719 1031.48 481.179 1031.4 481.577C1031.31 481.976 1030.85 482.18 1030.37 482.029C1021.12 479.132 1011.31 475.769 1001.19 472.019C1001.17 472 1001.15 471.99 1001.13 471.984ZM856.894 405.692C856.872 405.683 856.85 405.673 856.821 405.66C848.014 401.048 838.814 396.157 829.476 391.122C829.033 390.882 828.834 390.403 829.036 390.056C829.23 389.705 829.74 389.613 830.193 389.85C839.524 394.882 848.716 399.769 857.516 404.379C857.961 404.612 858.17 405.088 857.973 405.445C857.796 405.774 857.323 405.881 856.894 405.692ZM1045.96 486.608C1045.56 486.435 1045.31 486.051 1045.37 485.694C1045.44 485.289 1045.88 485.07 1046.36 485.204C1056.74 488.058 1066.7 490.356 1075.95 492.043C1076.43 492.127 1076.81 492.536 1076.8 492.957C1076.78 493.372 1076.37 493.636 1075.89 493.552C1066.58 491.862 1056.56 489.545 1046.12 486.678C1046.06 486.646 1046.01 486.63 1045.96 486.608ZM815.044 383.274C815.015 383.262 814.986 383.249 814.959 383.23C806.22 378.451 797.107 373.411 787.863 368.252C787.422 368.005 787.233 367.523 787.442 367.179C787.644 366.831 788.168 366.746 788.608 366.993C797.843 372.155 806.951 377.186 815.683 381.961C816.126 382.201 816.316 382.683 816.121 383.034C815.927 383.362 815.466 383.46 815.044 383.274ZM773.56 360.213C773.524 360.197 773.495 360.184 773.461 360.162C764.856 355.307 755.812 350.161 746.566 344.859C746.128 344.606 745.946 344.127 746.162 343.786C746.371 343.441 746.9 343.366 747.331 343.615C756.57 348.915 765.621 354.064 774.211 358.912C774.652 359.158 774.834 359.637 774.625 359.982C774.44 360.307 773.975 360.395 773.56 360.213ZM1091.56 495.84C1091.22 495.693 1090.98 495.39 1090.95 495.064C1090.94 494.643 1091.31 494.347 1091.79 494.402C1102.34 495.622 1112.21 495.961 1121.1 495.414C1121.58 495.389 1122.05 495.702 1122.17 496.13C1122.28 496.558 1122 496.921 1121.52 496.946C1112.51 497.502 1102.54 497.16 1091.87 495.924C1091.76 495.914 1091.65 495.882 1091.56 495.84ZM732.365 336.676C732.328 336.66 732.292 336.644 732.251 336.618C723.373 331.486 714.455 326.305 705.506 321.073C705.068 320.82 704.896 320.338 705.112 319.997C705.329 319.656 705.862 319.59 706.285 319.836C715.234 325.068 724.153 330.249 733.023 335.378C733.461 335.631 733.636 336.107 733.424 336.458C733.238 336.767 732.779 336.859 732.365 336.676ZM691.388 312.792C691.352 312.776 691.308 312.757 691.267 312.731C682.415 307.534 673.531 302.293 664.632 297.023C664.197 296.764 664.024 296.282 664.248 295.944C664.464 295.603 665.003 295.546 665.426 295.793C674.325 301.063 683.202 306.301 692.054 311.497C692.489 311.757 692.664 312.232 692.448 312.574C692.251 312.886 691.796 312.971 691.388 312.792ZM650.562 288.666C650.518 288.646 650.482 288.63 650.441 288.605C641.581 283.344 632.7 278.052 623.814 272.75C623.386 272.494 623.214 272.012 623.438 271.674C623.661 271.336 624.185 271.273 624.623 271.526C633.509 276.828 642.383 282.117 651.242 287.378C651.67 287.634 651.843 288.116 651.626 288.457C651.418 288.756 650.97 288.845 650.562 288.666ZM609.741 264.338C609.697 264.319 609.654 264.3 609.613 264.274C600.763 258.988 591.911 253.686 583.065 248.394C582.637 248.138 582.464 247.656 582.688 247.318C582.912 246.98 583.436 246.917 583.873 247.17C592.72 252.462 601.572 257.764 610.421 263.05C610.849 263.306 611.021 263.788 610.798 264.126C610.597 264.429 610.141 264.514 609.741 264.338ZM1136.16 494.944C1135.92 494.841 1135.72 494.656 1135.62 494.429C1135.44 494.011 1135.65 493.599 1136.1 493.511C1143.6 492.007 1150.49 489.683 1156.56 486.592C1158.11 485.806 1159.66 484.966 1161.16 484.094C1161.53 483.881 1162.09 484.003 1162.4 484.374C1162.71 484.744 1162.67 485.213 1162.29 485.427C1160.77 486.311 1159.19 487.161 1157.62 487.959C1151.42 491.108 1144.4 493.48 1136.75 495.012C1136.56 495.053 1136.35 495.027 1136.16 494.944ZM32.6155 9.29638C32.4335 9.21631 32.2698 9.09163 32.1658 8.92554C31.8956 8.5358 32.0118 8.08288 32.4154 7.91443C34.5723 7.00536 36.8747 6.16033 39.2588 5.38886C45.4005 3.40462 52.2932 2.10453 59.7518 1.5424C60.2209 1.50807 60.7012 1.82472 60.8211 2.24612C60.9483 2.67071 60.6674 3.04362 60.1983 3.07795C52.8795 3.63391 46.1199 4.90235 40.1042 6.85168C37.7596 7.61045 35.4967 8.44278 33.3819 9.33276C33.1396 9.42172 32.8629 9.40528 32.6155 9.29638ZM569.033 239.985C568.989 239.966 568.946 239.947 568.905 239.921C560.058 234.629 551.218 229.34 542.398 224.067C541.97 223.811 541.797 223.329 542.021 222.991C542.245 222.653 542.769 222.59 543.206 222.843C552.027 228.116 560.866 233.405 569.713 238.697C570.141 238.953 570.314 239.435 570.09 239.773C569.889 240.076 569.441 240.165 569.033 239.985ZM528.398 215.687C528.354 215.668 528.31 215.649 528.269 215.623C519.391 210.324 510.536 205.051 501.705 199.804C501.277 199.548 501.105 199.065 501.321 198.724C501.538 198.383 502.071 198.317 502.499 198.573C511.33 203.821 520.185 209.094 529.07 214.396C529.498 214.652 529.671 215.134 529.447 215.472C529.258 215.787 528.805 215.866 528.398 215.687ZM487.64 191.455C487.597 191.436 487.56 191.42 487.519 191.395C478.606 186.118 469.728 180.88 460.884 175.687C460.449 175.428 460.273 174.952 460.49 174.611C460.706 174.27 461.235 174.194 461.67 174.453C470.508 179.643 479.392 184.885 488.313 190.164C488.748 190.423 488.921 190.905 488.697 191.243C488.503 191.549 488.048 191.635 487.64 191.455ZM446.766 167.406C446.729 167.389 446.686 167.37 446.652 167.348C437.688 162.11 428.77 156.929 419.909 151.819C419.472 151.566 419.297 151.09 419.508 150.739C419.725 150.398 420.237 150.323 420.684 150.572C429.55 155.692 438.468 160.873 447.432 166.111C447.869 166.364 448.042 166.846 447.825 167.187C447.629 167.499 447.173 167.585 446.766 167.406ZM75.3139 2.7932C75.0009 2.65548 74.7598 2.38391 74.7204 2.08072C74.6618 1.65623 75.0005 1.33128 75.4804 1.3544C84.5855 1.76501 94.6532 3.03558 105.395 5.13686C105.873 5.22701 106.253 5.64243 106.229 6.0604C106.207 6.47199 105.791 6.73298 105.305 6.63963C94.6686 4.55447 84.7013 3.29048 75.6966 2.8864C75.5645 2.87341 75.4304 2.84445 75.3139 2.7932ZM405.706 143.643C405.669 143.627 405.633 143.611 405.599 143.588C396.379 138.305 387.333 133.165 378.703 128.307C378.263 128.061 378.081 127.582 378.283 127.235C378.492 126.89 379.019 126.799 379.447 127.055C388.083 131.916 397.137 137.058 406.357 142.342C406.794 142.594 406.977 143.073 406.76 143.414C406.579 143.733 406.121 143.825 405.706 143.643ZM1172.91 477.661C1172.79 477.61 1172.69 477.543 1172.59 477.453C1172.23 477.115 1172.21 476.633 1172.53 476.375C1179.04 471.232 1184.91 465.198 1190 458.429C1190.24 458.107 1190.77 458.064 1191.19 458.339C1191.61 458.614 1191.75 459.096 1191.5 459.424C1186.36 466.276 1180.41 472.393 1173.82 477.596C1173.6 477.784 1173.23 477.802 1172.91 477.661ZM1197.23 448.773C1197.11 448.75 1196.99 448.712 1196.88 448.648C1196.45 448.404 1196.28 447.932 1196.51 447.588C1200.99 440.805 1204.63 433.287 1207.3 425.247C1207.43 424.861 1207.91 424.68 1208.38 424.85C1208.86 425.013 1209.13 425.464 1209 425.846C1206.29 433.982 1202.62 441.596 1198.07 448.471C1197.91 448.723 1197.57 448.831 1197.23 448.773ZM364.4 120.291C364.371 120.278 364.335 120.262 364.308 120.243C354.998 115.055 345.877 110.034 337.208 105.316C336.765 105.076 336.573 104.6 336.77 104.243C336.972 103.896 337.47 103.791 337.932 104.047C346.609 108.768 355.737 113.793 365.054 118.984C365.494 119.23 365.684 119.712 365.475 120.056C365.276 120.375 364.815 120.473 364.4 120.291ZM120.932 10.1306C120.546 9.96082 120.285 9.59023 120.335 9.23612C120.389 8.83095 120.829 8.59562 121.311 8.71766C130.542 11.0494 140.46 13.9694 150.81 17.4102C151.297 17.5642 151.592 18.0177 151.492 18.4101C151.392 18.8024 150.927 18.9963 150.457 18.8423C140.166 15.4271 130.287 12.5167 121.112 10.1947C121.051 10.1754 120.99 10.1562 120.932 10.1306ZM322.751 97.5095C322.721 97.4967 322.7 97.4871 322.673 97.468C313.302 92.4492 304.097 87.5935 295.304 83.0321C294.858 82.7984 294.649 82.3226 294.836 81.9687C295.024 81.6148 295.541 81.5263 295.984 81.7441C304.785 86.3087 314.004 91.1708 323.382 96.1927C323.825 96.4328 324.025 96.9117 323.83 97.2624C323.643 97.594 323.173 97.6953 322.751 97.5095ZM280.665 75.5222C280.643 75.5126 280.629 75.5062 280.607 75.4966C271.119 70.6819 261.788 66.0493 252.888 61.7494C252.437 61.5285 252.208 61.059 252.383 60.6924C252.559 60.3257 253.079 60.2085 253.512 60.4293C262.432 64.7453 271.772 69.3747 281.275 74.1958C281.723 74.4231 281.94 74.9021 281.753 75.256C281.578 75.6003 281.102 75.7143 280.665 75.5222ZM165.875 24.2124C165.445 24.0234 165.191 23.5954 165.3 23.2223C165.415 22.8364 165.892 22.6553 166.361 22.8315C175.492 26.1651 185.187 29.9494 195.162 34.0756C195.638 34.2551 195.889 34.7342 195.745 35.1073C195.606 35.49 195.117 35.6359 194.654 35.4469C184.71 31.3271 175.045 27.5555 165.943 24.2348C165.926 24.2348 165.897 24.222 165.875 24.2124ZM238.009 54.6603C238.001 54.6571 237.994 54.6539 237.987 54.6507C228.286 50.1037 218.859 45.8347 209.825 41.9046C209.825 41.9046 209.825 41.9046 209.818 41.9014C209.359 41.6997 209.11 41.2366 209.264 40.8603C209.417 40.4841 209.911 40.3477 210.372 40.543C219.425 44.4891 228.877 48.7613 238.592 53.3147C239.046 53.5292 239.282 54.0018 239.116 54.3653C238.951 54.7288 238.46 54.8589 238.009 54.6603ZM1211.02 412.824C1210.61 412.645 1210.36 412.246 1210.44 411.882C1212.12 403.939 1213.16 395.524 1213.56 386.874C1213.58 386.459 1213.99 386.198 1214.47 386.288C1214.96 386.381 1215.33 386.787 1215.31 387.208C1214.91 395.925 1213.86 404.411 1212.17 412.418C1212.08 412.816 1211.63 413.023 1211.15 412.872C1211.11 412.863 1211.07 412.843 1211.02 412.824ZM1213.52 371.947C1213.1 371.828 1212.77 371.467 1212.78 371.093C1212.94 362.836 1212.42 354.203 1211.22 345.436C1211.16 345.012 1211.5 344.69 1211.99 344.7C1212.47 344.717 1212.91 345.069 1212.97 345.493C1214.18 354.331 1214.72 363.03 1214.54 371.358C1214.54 371.776 1214.13 372.05 1213.65 371.979C1213.61 371.969 1213.56 371.956 1213.52 371.947ZM1209.21 333.997C1208.91 333.868 1208.68 333.622 1208.62 333.332C1206.77 324.822 1204.4 316.069 1201.58 307.311C1201.44 306.89 1201.71 306.511 1202.17 306.46C1202.64 306.41 1203.12 306.72 1203.26 307.142C1206.11 315.947 1208.49 324.751 1210.34 333.309C1210.44 333.734 1210.12 334.084 1209.65 334.093C1209.49 334.093 1209.34 334.057 1209.21 333.997ZM1197.31 294.065C1197.06 293.956 1196.85 293.758 1196.75 293.506C1193.59 285.08 1189.94 276.478 1185.92 267.923C1185.73 267.508 1185.93 267.093 1186.37 266.992C1186.81 266.893 1187.33 267.143 1187.52 267.558C1191.56 276.145 1195.22 284.795 1198.4 293.26C1198.55 293.681 1198.32 294.073 1197.86 294.143C1197.68 294.177 1197.48 294.142 1197.31 294.065ZM1179.77 254.926C1179.55 254.83 1179.37 254.666 1179.26 254.459C1175 246.251 1170.3 237.903 1165.29 229.633C1165.05 229.234 1165.2 228.794 1165.62 228.648C1166.04 228.502 1166.57 228.707 1166.81 229.106C1171.84 237.404 1176.56 245.794 1180.83 254.031C1181.04 254.439 1180.86 254.864 1180.43 254.981C1180.22 255.048 1179.98 255.018 1179.77 254.926ZM1157.58 217.01C1157.39 216.927 1157.22 216.792 1157.11 216.623C1151.96 208.704 1146.38 200.67 1140.56 192.734C1140.28 192.348 1140.37 191.892 1140.76 191.71C1141.15 191.529 1141.7 191.687 1141.98 192.076C1147.84 200.038 1153.42 208.101 1158.61 216.054C1158.87 216.447 1158.74 216.894 1158.33 217.053C1158.1 217.138 1157.82 217.116 1157.58 217.01ZM1131.53 180.578C1131.37 180.508 1131.22 180.396 1131.11 180.258C1125.2 172.661 1118.9 164.97 1112.4 157.406C1112.08 157.042 1112.13 156.567 1112.5 156.35C1112.87 156.137 1113.42 156.259 1113.73 156.624C1120.26 164.219 1126.57 171.932 1132.51 179.556C1132.8 179.933 1132.73 180.398 1132.34 180.595C1132.1 180.707 1131.79 180.693 1131.53 180.578Z" fill="white"></path>
              <path d="M957.207 454.228C956.749 454.026 956.5 453.563 956.653 453.187C956.807 452.81 957.301 452.674 957.762 452.869C967.562 457.129 977.149 461.114 986.264 464.719C986.747 464.902 987.003 465.368 986.874 465.748C986.743 466.134 986.258 466.289 985.792 466.106C976.655 462.492 967.04 458.494 957.207 454.228ZM957.207 454.228C957.215 454.231 957.215 454.231 957.207 454.228ZM167.345 287.32C167.236 287.272 167.134 287.205 167.046 287.129C166.957 287.052 158.227 279.095 145.016 266.09C144.666 265.748 144.658 265.263 144.99 265.018C145.324 264.766 145.879 264.837 146.226 265.186C159.409 278.156 168.115 286.087 168.196 286.16C168.559 286.493 168.601 286.978 168.278 287.242C168.041 287.446 167.665 287.461 167.345 287.32ZM133.916 254.916C133.792 254.862 133.679 254.782 133.573 254.683C126.475 247.504 119.443 240.205 112.662 232.985C112.327 232.627 112.341 232.152 112.695 231.916C113.049 231.681 113.6 231.781 113.935 232.139C120.704 239.345 127.724 246.632 134.81 253.798C135.157 254.146 135.158 254.628 134.812 254.867C134.577 255.042 134.222 255.051 133.916 254.916ZM102.154 221.478C102.015 221.417 101.888 221.33 101.78 221.215C94.9013 213.667 88.243 206.126 81.9815 198.812C81.6665 198.447 81.7147 197.972 82.085 197.759C82.4553 197.546 83.0065 197.668 83.3214 198.032C89.571 205.333 96.2198 212.856 103.079 220.388C103.404 220.749 103.383 221.221 103.025 221.447C102.778 221.61 102.445 221.606 102.154 221.478ZM72.1705 186.941C72.0176 186.874 71.8778 186.775 71.7708 186.637C65.2563 178.723 59.0974 170.905 53.4459 163.4C53.1632 163.02 53.2404 162.557 53.6346 162.37C54.0289 162.182 54.5742 162.339 54.857 162.719C60.4918 170.202 66.6341 177.998 73.1293 185.896C73.4318 186.27 73.3791 186.736 73.0015 186.946C72.7632 187.067 72.4471 187.063 72.1705 186.941ZM44.6309 151.088C44.4562 151.011 44.2998 150.889 44.186 150.726C38.2535 142.353 32.8457 134.189 28.1241 126.446C27.8835 126.047 28.0215 125.604 28.4418 125.457C28.862 125.311 29.3965 125.516 29.6443 125.919C34.3472 133.623 39.7264 141.753 45.6375 150.094C45.9104 150.477 45.8088 150.937 45.4098 151.115C45.1695 151.22 44.8784 151.197 44.6309 151.088ZM20.9396 113.61C20.7285 113.517 20.5434 113.361 20.4353 113.163C15.5422 104.179 11.5152 95.5756 8.47591 87.6029C8.31179 87.1846 8.55897 86.7894 9.01661 86.7199C9.47424 86.6505 9.97487 86.9385 10.1317 87.3536C13.1482 95.256 17.1378 103.782 21.9956 112.706C22.2164 113.111 22.0493 113.542 21.6197 113.669C21.395 113.735 21.1579 113.706 20.9396 113.61ZM4.53639 74.2841C4.25981 74.1624 4.03007 73.9259 3.95585 73.6449C1.46227 64.0618 0.538751 55.2597 1.2283 47.491C1.26749 47.0794 1.68778 46.828 2.16821 46.9341C2.65593 47.0434 3.01141 47.4556 2.9795 47.8704C2.30822 55.4892 3.21101 64.1317 5.67137 73.5648C5.78141 73.9894 5.48849 74.3494 5.01476 74.3742C4.84783 74.3835 4.68924 74.3513 4.53639 74.2841ZM4.78355 35.3937C4.325 35.192 4.07612 34.7289 4.2271 34.359L4.4515 33.7882C7.52827 26.25 12.7282 19.8416 19.9222 14.732C20.2614 14.4901 20.8209 14.5708 21.1582 14.9223C21.5054 15.2707 21.4989 15.7493 21.1598 15.9912C14.1676 20.9639 9.09927 27.197 6.111 34.5184L5.89442 35.0701C5.74812 35.4496 5.25197 35.5923 4.79343 35.3906C4.79082 35.3969 4.79083 35.3969 4.78355 35.3937ZM942.123 447.537L942.115 447.534C933.097 443.46 923.656 439.057 914.038 434.434C913.584 434.219 913.358 433.743 913.523 433.38C913.699 433.013 914.207 432.861 914.655 433.111C924.254 437.718 933.681 442.115 942.684 446.182C943.14 446.39 943.386 446.859 943.226 447.233C943.075 447.602 942.581 447.739 942.123 447.537ZM899.215 427.227C899.201 427.22 899.186 427.214 899.172 427.208C890.259 422.812 880.949 418.128 871.504 413.272C871.056 413.045 870.846 412.569 871.036 412.209C871.226 411.849 871.736 411.735 872.186 411.978C881.627 416.824 890.92 421.508 899.818 425.897C900.269 426.118 900.488 426.591 900.313 426.957C900.138 427.302 899.652 427.419 899.215 427.227ZM1001.13 471.984C1000.7 471.795 1000.45 471.367 1000.56 470.994C1000.67 470.608 1001.15 470.436 1001.62 470.606C1011.7 474.34 1021.48 477.697 1030.69 480.584C1031.17 480.719 1031.48 481.179 1031.4 481.577C1031.31 481.976 1030.85 482.18 1030.37 482.029C1021.12 479.132 1011.31 475.769 1001.19 472.019C1001.17 472 1001.15 471.99 1001.13 471.984ZM856.894 405.692C856.872 405.683 856.85 405.673 856.821 405.66C848.014 401.048 838.814 396.157 829.476 391.122C829.033 390.882 828.834 390.403 829.036 390.056C829.23 389.705 829.74 389.613 830.193 389.85C839.524 394.882 848.716 399.769 857.516 404.379C857.961 404.612 858.17 405.088 857.973 405.445C857.796 405.773 857.323 405.881 856.894 405.692ZM1045.96 486.608C1045.56 486.435 1045.31 486.051 1045.37 485.694C1045.44 485.289 1045.88 485.07 1046.36 485.204C1056.74 488.058 1066.7 490.356 1075.95 492.043C1076.43 492.127 1076.81 492.536 1076.8 492.957C1076.78 493.372 1076.37 493.636 1075.89 493.552C1066.58 491.862 1056.56 489.545 1046.12 486.678C1046.06 486.646 1046.01 486.63 1045.96 486.608ZM815.044 383.274C815.015 383.262 814.986 383.249 814.959 383.23C806.22 378.451 797.107 373.411 787.863 368.252C787.422 368.005 787.233 367.523 787.442 367.179C787.644 366.831 788.168 366.746 788.608 366.993C797.843 372.155 806.951 377.186 815.683 381.961C816.126 382.201 816.316 382.683 816.121 383.034C815.927 383.362 815.466 383.46 815.044 383.274ZM773.56 360.213C773.524 360.197 773.495 360.184 773.461 360.162C764.856 355.307 755.812 350.161 746.566 344.859C746.128 344.606 745.946 344.127 746.162 343.786C746.371 343.441 746.9 343.366 747.331 343.615C756.57 348.915 765.621 354.064 774.211 358.912C774.652 359.158 774.834 359.637 774.625 359.982C774.44 360.307 773.975 360.395 773.56 360.213ZM1091.56 495.84C1091.22 495.693 1090.98 495.39 1090.95 495.064C1090.94 494.643 1091.31 494.347 1091.79 494.402C1102.34 495.622 1112.21 495.961 1121.1 495.414C1121.58 495.389 1122.05 495.702 1122.17 496.13C1122.28 496.558 1122 496.921 1121.52 496.946C1112.51 497.502 1102.54 497.16 1091.87 495.924C1091.76 495.914 1091.65 495.882 1091.56 495.84ZM732.365 336.676C732.328 336.66 732.292 336.644 732.251 336.618C723.373 331.486 714.455 326.305 705.506 321.073C705.068 320.82 704.896 320.338 705.112 319.997C705.329 319.656 705.862 319.59 706.285 319.836C715.234 325.068 724.153 330.249 733.023 335.378C733.461 335.631 733.636 336.107 733.424 336.458C733.238 336.767 732.779 336.859 732.365 336.676ZM691.388 312.792C691.352 312.776 691.308 312.757 691.267 312.731C682.415 307.534 673.531 302.293 664.632 297.023C664.197 296.764 664.024 296.282 664.248 295.944C664.464 295.603 665.003 295.546 665.426 295.793C674.325 301.063 683.202 306.301 692.054 311.497C692.489 311.757 692.664 312.232 692.448 312.574C692.251 312.886 691.796 312.971 691.388 312.792ZM650.562 288.666C650.519 288.646 650.482 288.63 650.441 288.605C641.581 283.344 632.7 278.052 623.814 272.75C623.386 272.494 623.214 272.012 623.438 271.674C623.661 271.336 624.185 271.273 624.623 271.526C633.509 276.828 642.383 282.117 651.242 287.378C651.67 287.634 651.843 288.116 651.626 288.457C651.418 288.756 650.97 288.845 650.562 288.666ZM609.741 264.338C609.697 264.319 609.654 264.3 609.613 264.274C600.763 258.988 591.911 253.686 583.065 248.394C582.637 248.138 582.464 247.656 582.688 247.318C582.912 246.98 583.435 246.917 583.873 247.17C592.72 252.462 601.572 257.764 610.421 263.05C610.849 263.306 611.021 263.788 610.798 264.126C610.597 264.429 610.141 264.514 609.741 264.338ZM1136.16 494.944C1135.92 494.841 1135.72 494.656 1135.62 494.429C1135.44 494.011 1135.65 493.599 1136.1 493.511C1143.6 492.007 1150.49 489.683 1156.56 486.592C1158.11 485.806 1159.66 484.966 1161.16 484.094C1161.53 483.881 1162.09 484.003 1162.4 484.374C1162.71 484.744 1162.67 485.213 1162.29 485.427C1160.77 486.311 1159.19 487.161 1157.62 487.959C1151.42 491.108 1144.4 493.48 1136.75 495.012C1136.56 495.053 1136.35 495.027 1136.16 494.944ZM32.6155 9.29638C32.4335 9.21631 32.2698 9.09164 32.1658 8.92554C31.8956 8.53581 32.0118 8.08288 32.4154 7.91443C34.5723 7.00537 36.8747 6.16033 39.2588 5.38886C45.4004 3.40462 52.2932 2.10452 59.7518 1.5424C60.2209 1.50807 60.7012 1.82472 60.8211 2.24612C60.9483 2.67072 60.6674 3.04362 60.1983 3.07795C52.8795 3.63392 46.1199 4.90235 40.1042 6.85168C37.7596 7.61046 35.4967 8.44278 33.3819 9.33276C33.1396 9.42171 32.8629 9.40528 32.6155 9.29638ZM569.033 239.985C568.989 239.966 568.946 239.947 568.905 239.921C560.058 234.629 551.218 229.34 542.398 224.067C541.97 223.811 541.798 223.329 542.021 222.991C542.245 222.653 542.769 222.59 543.206 222.843C552.027 228.116 560.866 233.405 569.713 238.697C570.141 238.953 570.314 239.435 570.09 239.773C569.889 240.076 569.441 240.165 569.033 239.985ZM528.398 215.687C528.354 215.668 528.31 215.649 528.269 215.623C519.39 210.324 510.536 205.051 501.705 199.804C501.277 199.548 501.105 199.065 501.321 198.724C501.538 198.383 502.071 198.317 502.499 198.573C511.33 203.821 520.185 209.094 529.07 214.396C529.498 214.652 529.671 215.134 529.447 215.472C529.258 215.787 528.805 215.866 528.398 215.687ZM487.64 191.455C487.597 191.436 487.56 191.42 487.519 191.395C478.606 186.118 469.728 180.88 460.884 175.687C460.449 175.428 460.273 174.952 460.49 174.611C460.706 174.27 461.235 174.194 461.67 174.453C470.508 179.643 479.392 184.885 488.313 190.164C488.748 190.423 488.921 190.905 488.697 191.243C488.503 191.549 488.048 191.635 487.64 191.455ZM446.766 167.406C446.729 167.389 446.686 167.37 446.652 167.348C437.689 162.11 428.77 156.929 419.909 151.819C419.472 151.566 419.297 151.09 419.508 150.739C419.725 150.398 420.237 150.323 420.684 150.572C429.55 155.692 438.468 160.873 447.432 166.111C447.869 166.364 448.042 166.846 447.825 167.187C447.629 167.499 447.173 167.585 446.766 167.406ZM75.3139 2.7932C75.0009 2.65548 74.7598 2.38392 74.7204 2.08072C74.6618 1.65623 75.0005 1.33127 75.4804 1.3544C84.5855 1.76501 94.6532 3.03558 105.395 5.13686C105.873 5.22699 106.253 5.64243 106.229 6.0604C106.207 6.47199 105.791 6.73296 105.305 6.63963C94.6686 4.55447 84.7013 3.29047 75.6966 2.8864C75.5645 2.87342 75.4304 2.84445 75.3139 2.7932ZM405.706 143.643C405.669 143.627 405.633 143.611 405.599 143.588C396.379 138.305 387.333 133.165 378.703 128.307C378.263 128.061 378.081 127.582 378.283 127.235C378.492 126.89 379.019 126.799 379.447 127.055C388.083 131.916 397.137 137.058 406.357 142.342C406.794 142.594 406.977 143.073 406.76 143.414C406.579 143.733 406.121 143.825 405.706 143.643ZM1172.91 477.661C1172.79 477.61 1172.69 477.543 1172.59 477.453C1172.23 477.115 1172.21 476.633 1172.53 476.375C1179.04 471.232 1184.91 465.198 1190 458.429C1190.24 458.107 1190.77 458.064 1191.19 458.339C1191.61 458.614 1191.75 459.096 1191.5 459.424C1186.36 466.276 1180.41 472.393 1173.82 477.596C1173.6 477.784 1173.23 477.802 1172.91 477.661ZM1197.23 448.773C1197.11 448.75 1196.99 448.712 1196.88 448.648C1196.45 448.404 1196.28 447.932 1196.51 447.588C1200.99 440.805 1204.63 433.287 1207.3 425.247C1207.43 424.861 1207.91 424.68 1208.38 424.85C1208.86 425.013 1209.13 425.464 1209 425.846C1206.29 433.982 1202.62 441.596 1198.07 448.471C1197.91 448.723 1197.57 448.831 1197.23 448.773ZM364.4 120.291C364.371 120.278 364.335 120.262 364.308 120.243C354.998 115.055 345.877 110.034 337.208 105.316C336.765 105.076 336.573 104.6 336.77 104.243C336.972 103.896 337.47 103.791 337.932 104.047C346.609 108.768 355.737 113.793 365.054 118.984C365.494 119.23 365.684 119.712 365.475 120.056C365.276 120.375 364.815 120.473 364.4 120.291ZM120.932 10.1306C120.546 9.96082 120.285 9.59023 120.335 9.23612C120.389 8.83096 120.829 8.59561 121.311 8.71766C130.542 11.0494 140.46 13.9694 150.81 17.4102C151.297 17.5642 151.592 18.0178 151.492 18.4101C151.392 18.8024 150.927 18.9963 150.457 18.8423C140.166 15.4271 130.287 12.5167 121.112 10.1947C121.051 10.1754 120.99 10.1562 120.932 10.1306ZM322.751 97.5095C322.721 97.4967 322.7 97.4871 322.673 97.468C313.302 92.4492 304.097 87.5935 295.304 83.0321C294.858 82.7984 294.649 82.3226 294.836 81.9687C295.024 81.6149 295.541 81.5264 295.984 81.7441C304.785 86.3087 314.004 91.1708 323.382 96.1927C323.825 96.4328 324.025 96.9118 323.83 97.2624C323.643 97.594 323.173 97.6953 322.751 97.5095ZM280.665 75.5222C280.643 75.5126 280.629 75.5062 280.607 75.4966C271.119 70.6819 261.788 66.0493 252.888 61.7494C252.437 61.5284 252.208 61.059 252.383 60.6924C252.559 60.3257 253.079 60.2085 253.512 60.4293C262.432 64.7453 271.772 69.3747 281.275 74.1958C281.723 74.4231 281.94 74.9021 281.753 75.256C281.578 75.6003 281.102 75.7143 280.665 75.5222ZM165.875 24.2124C165.445 24.0234 165.191 23.5954 165.3 23.2223C165.415 22.8364 165.892 22.6553 166.361 22.8315C175.492 26.1651 185.187 29.9494 195.162 34.0756C195.638 34.2551 195.889 34.7342 195.745 35.1073C195.606 35.49 195.117 35.6359 194.654 35.4469C184.71 31.3271 175.045 27.5555 165.943 24.2348C165.926 24.2348 165.897 24.222 165.875 24.2124ZM238.009 54.6603C238.001 54.6571 237.994 54.6539 237.987 54.6507C228.286 50.1037 218.859 45.8347 209.825 41.9046C209.825 41.9046 209.825 41.9046 209.818 41.9014C209.359 41.6997 209.11 41.2366 209.264 40.8603C209.417 40.484 209.911 40.3476 210.372 40.543C219.425 44.4891 228.877 48.7613 238.592 53.3147C239.046 53.5292 239.282 54.0018 239.116 54.3653C238.951 54.7288 238.46 54.8589 238.009 54.6603ZM1211.02 412.824C1210.61 412.645 1210.36 412.246 1210.44 411.882C1212.12 403.939 1213.16 395.524 1213.56 386.874C1213.58 386.459 1213.99 386.198 1214.47 386.288C1214.96 386.381 1215.33 386.787 1215.31 387.208C1214.91 395.925 1213.86 404.411 1212.17 412.418C1212.08 412.816 1211.63 413.023 1211.15 412.872C1211.11 412.863 1211.07 412.843 1211.02 412.824ZM1213.52 371.947C1213.1 371.828 1212.77 371.467 1212.78 371.093C1212.94 362.836 1212.42 354.203 1211.22 345.436C1211.16 345.012 1211.5 344.69 1211.99 344.7C1212.47 344.717 1212.91 345.069 1212.97 345.493C1214.18 354.331 1214.72 363.03 1214.54 371.358C1214.54 371.776 1214.13 372.05 1213.65 371.979C1213.61 371.969 1213.56 371.956 1213.52 371.947ZM1209.21 333.997C1208.91 333.868 1208.68 333.622 1208.62 333.332C1206.77 324.822 1204.4 316.069 1201.58 307.311C1201.44 306.89 1201.71 306.511 1202.17 306.46C1202.64 306.41 1203.12 306.72 1203.26 307.142C1206.11 315.947 1208.49 324.751 1210.34 333.309C1210.44 333.734 1210.12 334.084 1209.65 334.093C1209.49 334.093 1209.34 334.057 1209.21 333.997ZM1197.31 294.065C1197.06 293.956 1196.85 293.758 1196.75 293.506C1193.59 285.08 1189.94 276.478 1185.92 267.923C1185.73 267.508 1185.93 267.093 1186.37 266.992C1186.81 266.893 1187.33 267.143 1187.52 267.558C1191.56 276.145 1195.22 284.795 1198.4 293.26C1198.55 293.681 1198.32 294.073 1197.86 294.143C1197.68 294.177 1197.48 294.142 1197.31 294.065ZM1179.77 254.926C1179.55 254.83 1179.37 254.666 1179.26 254.459C1175 246.251 1170.3 237.903 1165.29 229.633C1165.05 229.234 1165.2 228.794 1165.62 228.648C1166.04 228.502 1166.57 228.707 1166.81 229.106C1171.84 237.404 1176.56 245.794 1180.83 254.031C1181.04 254.439 1180.86 254.864 1180.43 254.981C1180.22 255.048 1179.98 255.018 1179.77 254.926ZM1157.58 217.01C1157.39 216.927 1157.22 216.792 1157.11 216.623C1151.96 208.704 1146.38 200.67 1140.56 192.734C1140.28 192.348 1140.37 191.892 1140.76 191.71C1141.15 191.529 1141.7 191.686 1141.98 192.076C1147.84 200.038 1153.42 208.101 1158.61 216.054C1158.87 216.447 1158.74 216.894 1158.33 217.053C1158.1 217.138 1157.82 217.116 1157.58 217.01ZM1131.53 180.578C1131.37 180.508 1131.22 180.396 1131.11 180.258C1125.2 172.661 1118.9 164.97 1112.4 157.406C1112.08 157.042 1112.13 156.567 1112.5 156.35C1112.87 156.137 1113.42 156.259 1113.73 156.624C1120.26 164.219 1126.57 171.932 1132.51 179.556C1132.8 179.933 1132.73 180.398 1132.34 180.595C1132.1 180.707 1131.79 180.693 1131.53 180.578Z" stroke="white" stroke-miterlimit="10"></path>
            </svg>
          </div>
          <div className='text-white text-center text-[28px] font-bold leading-[130%] lg:text-[34px] animate-scrolled--fadeIn animated'>
            <span className='text-yellow'>Bagaimana Kami Mempermudah Anda Mencari Kerja</span>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-[42.5px] mt-6 lg:mt-10 animate-scrolled--fadeIn animated">
            <div className='rounded-xl p-5 lg:px-[21px] lg:pb-[43px] lg:pt-9 relative border max-w-[336px] mx-auto border-neutral-100 bg-white inline-block w-full text-center'>
              <div className='absolute bg-[#6913D81A] rounded-full p-[3px]'>1</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="orange" d="M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4zM7 8h3v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z"/></svg>
              <p className='text-xs lg:text-base font-bold text-slate-500 !leading-[1.3] mt-3 lg:mt-6'>Masukkan CV anda</p>
              <p className='text-xs lg:text-sm text-neutral-80 !leading-[1.3] mt-1 lg:mt-2'>Hanya dengan beberapa menit, CV anda bisa selalu di-update.</p>
            </div>
            <div className='rounded-xl p-5 lg:px-[21px] lg:pb-[43px] lg:pt-9 relative border max-w-[336px] mx-auto border-neutral-100 bg-white inline-block w-full text-center'>
              <div className='absolute bg-[#6913D81A] rounded-full p-[3px]'>2</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="orange" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
              <p className='text-xs lg:text-base font-bold text-slate-500 !leading-[1.3] mt-3 lg:mt-6'>Menganalisis CV anda</p>
              <p className='text-xs lg:text-sm text-neutral-80 !leading-[1.3] mt-1 lg:mt-2'>Dengan teknologi kami dapat menganalisis pekerjaan yang sekiranya tepat berdasarkan CV anda.</p>
            </div>
            <div className='rounded-xl p-5 lg:px-[21px] lg:pb-[43px] lg:pt-9 relative border max-w-[336px] mx-auto border-neutral-100 bg-white inline-block w-full text-center'>
              <div className='absolute bg-[#6913D81A] rounded-full p-[3px]'>3</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="orange" d="M19 6.5h-3v-1a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.05h3v1.05a1 1 0 0 0 2 0v-1.05h6v1.05a1 1 0 0 0 2 0v-1.05h3Zm0-7H4v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"/></svg>
              <p className='text-xs lg:text-base font-bold text-slate-500 !leading-[1.3] mt-3 lg:mt-6'>Duduk Manis dan Tunggu Tawaran</p>
              <p className='text-xs lg:text-sm text-neutral-80 !leading-[1.3] mt-1 lg:mt-2'>Ribuan perekrut sudah siap untuk menerima anda dengan penawaran yang menarik untuk setiap para rekruter.</p>
            </div>
          </div>
        </section>
        <footer className='bg-[#27125C] content-center'>
            <div className='lg:w-[353px]'>
            <a href="#" className="flex items-center">
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">UnsoedFair</span>
            </a>
            <span className='mt-4 block text-xs leading-[1.3] text-white md:text-[13px]'>Daftar dan dapatkan penawaran dari berbagai perusahaan</span>
            <div className='mt-[16px] ml-[-2px] flex gap-3 lg:gap-2'>
              <a href="https://www.instagram.com/maulanna.i">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="M12 9.52A2.48 2.48 0 1 0 14.48 12A2.48 2.48 0 0 0 12 9.52Zm9.93-2.45a6.53 6.53 0 0 0-.42-2.26a4 4 0 0 0-2.32-2.32a6.53 6.53 0 0 0-2.26-.42C15.64 2 15.26 2 12 2s-3.64 0-4.93.07a6.53 6.53 0 0 0-2.26.42a4 4 0 0 0-2.32 2.32a6.53 6.53 0 0 0-.42 2.26C2 8.36 2 8.74 2 12s0 3.64.07 4.93a6.86 6.86 0 0 0 .42 2.27a3.94 3.94 0 0 0 .91 1.4a3.89 3.89 0 0 0 1.41.91a6.53 6.53 0 0 0 2.26.42C8.36 22 8.74 22 12 22s3.64 0 4.93-.07a6.53 6.53 0 0 0 2.26-.42a3.89 3.89 0 0 0 1.41-.91a3.94 3.94 0 0 0 .91-1.4a6.6 6.6 0 0 0 .42-2.27C22 15.64 22 15.26 22 12s0-3.64-.07-4.93Zm-2.54 8a5.73 5.73 0 0 1-.39 1.8A3.86 3.86 0 0 1 16.87 19a5.73 5.73 0 0 1-1.81.35H8.94A5.73 5.73 0 0 1 7.13 19a3.51 3.51 0 0 1-1.31-.86A3.51 3.51 0 0 1 5 16.87a5.49 5.49 0 0 1-.34-1.81V8.94A5.49 5.49 0 0 1 5 7.13a3.51 3.51 0 0 1 .86-1.31A3.59 3.59 0 0 1 7.13 5a5.73 5.73 0 0 1 1.81-.35h6.12a5.73 5.73 0 0 1 1.81.35a3.51 3.51 0 0 1 1.31.86A3.51 3.51 0 0 1 19 7.13a5.73 5.73 0 0 1 .35 1.81V12c0 2.06.07 2.27.04 3.06Zm-1.6-7.44a2.38 2.38 0 0 0-1.41-1.41A4 4 0 0 0 15 6H9a4 4 0 0 0-1.38.26a2.38 2.38 0 0 0-1.41 1.36A4.27 4.27 0 0 0 6 9v6a4.27 4.27 0 0 0 .26 1.38a2.38 2.38 0 0 0 1.41 1.41a4.27 4.27 0 0 0 1.33.26h6a4 4 0 0 0 1.38-.26a2.38 2.38 0 0 0 1.41-1.41a4 4 0 0 0 .26-1.38V9a3.78 3.78 0 0 0-.26-1.38ZM12 15.82A3.81 3.81 0 0 1 8.19 12A3.82 3.82 0 1 1 12 15.82Zm4-6.89a.9.9 0 0 1 0-1.79a.9.9 0 0 1 0 1.79Z"/></svg>
              </a>
              <a href="https://www.instagram.com/adhwamh">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
              </a>
            </div>
            </div>
        </footer>
      </main>
    </div>
  )
}
}
