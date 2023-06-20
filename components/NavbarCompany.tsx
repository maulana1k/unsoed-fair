import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import Router from 'next/router'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../lib/context'
import { ICompany } from '../types/model'

export default function SponsorCompany() {
  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState<ICompany>()
  const ctx = useContext(AppContext)
  useEffect(() => {
    // (async () => {
    //     const res = await
    // })()
  }, [ctx.loading])

  const logout = () => {
    localStorage.removeItem('unsoed-fair')
    Router.push('/try-now')
  }

  return (
    <div>
      <nav className="bg-white py-3 px-24 fixed w-full z-10 top-0 flex items-center justify-between  border-b border-gray-200 ">
        <div className="flex space-x-8">
          <Link href="/">
            <div className="text-violet-600 text-2xl font-bold stroke-violet-500 text">UnsoedFair</div>
          </Link>
          <div className="flex items-center space-x-4 ">
            <Link href="/jobs-company" className="text-gray-500 hover:text-violet-500" legacyBehavior>
              Jobs
            </Link>
          </div>
        </div>
        <div className="relative">
          <Menu>
            <Menu.Button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              <img
                className="h-10 w-10 rounded-full object-cover"
                alt="Avatar"
                // src={ctx.user.}
              />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link href={'/profile'} legacyBehavior>
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
      <div>{/* Your sponsor company page content goes here */}</div>
    </div>
  )
}
