import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import Router from 'next/router'
import React, { Fragment, useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // const menuRef = useRef<HTMLDivElement>(null)

  const logout = () => {
    localStorage.removeItem('unsoed-fair')
    Router.push('/login')
  }

  return (
    <nav
      // ref={menuRef}
      className="bg-white py-3 px-24 fixed w-full z-10 top-0 flex items-center justify-between  border-b border-gray-200 "
    >
      <div className="flex space-x-8">
        <Link href="/" className="text-orange-400 text-2xl font-bold stroke-violet-500 text">
          Unsoed<span className={'text-violet-600'}>Fair</span>
        </Link>
        <div className="flex items-center space-x-4 ">
          <Link href="/jobsCompany" className="text-gray-500 hover:text-violet-500">
            Jobs
          </Link>
          <Link href="/internCompany" className="text-gray-500 hover:text-violet-500">
            Internship
          </Link>
          <Link href="/sponsorship" className="text-gray-500 hover:text-violet-500">
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
  )
}
