import Link from 'next/link'
import React from 'react'
import { BiSearchAlt, BiBriefcase, BiGroup } from 'react-icons/bi'
export default function TryNow() {
  return (
    <div>
      <div className="fixed p-8 text-white text-3xl font-bold">UnsoedFair</div>
      <div className="min-h-screen flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tl from-violet-800 via-violet-700 to-violet-800 ">
        <div className="text-4xl font-bold text-white headline-text text-center">
          Exclusive Soedirman Career Portal For <br /> <span className="text-yellow-300"> Your Better Future </span>
        </div>
        <div className="flex p-10 space-x-10 ">
          <div className="flex flex-col justify-center items-center card-shadow rounded-md outline outline-black bg-white w-[250px] h-[250px] p-3 space-y-2">
            <div className="text-xl font-bold">Talent</div>
            <div className="text-center text-xs font-medium">I want to seek job opportunities </div>
            <div className="my-3 text-violet-800">
              <BiSearchAlt size={70} />
            </div>
            <Link href={'/login'}>
              <button className="rounded-full text-white bg-violet-800 text-sm font-bold py-2 px-4">Find Jobs</button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center card-shadow rounded-md outline outline-black bg-white w-[250px] h-[250px] p-3 space-y-2">
            <div className="text-xl font-bold">Employer</div>
            <div className="text-center text-xs font-medium ">I want to hire top talent student</div>
            <div className="my-3 text-violet-800">
              <BiBriefcase size={70} />
            </div>
            <Link href={'/login-company'}>
              <button className="rounded-full text-white bg-violet-800 text-sm font-bold py-2 px-4">Start Hire</button>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center card-shadow rounded-md outline outline-black bg-white w-[250px] h-[250px] p-3 space-y-2">
            <div className="text-xl font-bold">Organisation</div>
            <div className="text-center text-xs font-medium ">I need a skillful hand to handling event</div>
            <div className="my-3 text-violet-800">
              <BiGroup size={70} />
            </div>
            <Link href={'/login-organisation'}>
              <button className="rounded-full text-white bg-violet-800 text-sm font-bold py-2 px-4">Start Recruit</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
