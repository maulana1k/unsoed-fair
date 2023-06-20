import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { AppContext } from '@/lib/context'
import Router from 'next/router'

export default function NewJob() {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = useContext(AppContext)

  if (!ctx.loading) {
    if (ctx.user !== null && ctx.user?.role !== 'employer') {
      Router.back()
      return
    }
    return (
      <div className="container h-full">
        <Navbar />
        <div className="max-w-[1200px] pt-24 mx-auto">
          <div className="text-sm font-semibold text-gray-400">
            <Link href={'/'}>Back to Homepage</Link>
          </div>
        </div>
      </div>
    )
  }
}
