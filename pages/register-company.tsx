import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import { AppContext } from '../lib/context'

export default function RegisterCompany() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const ctx = useContext(AppContext)
  const loading = useRef<LoadingBarRef>(null)

  const handleSubmit = async (e: any) => {
    loading.current?.continuousStart()
    e.preventDefault()
    try {
      const result = await axios.post('/api/auth/register-company', { fullname, email, password })
      ctx.updateUser(result.data.user)
      Router.push('/jobs-company')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data)
      }
    }
    loading.current?.complete()
  }

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <LoadingBar ref={loading} />
      <div className="max-w-md w-full space-y-4">
        <div className="space-y-1">
          <h2 className="mt-6  text-xl font-bold text-gray-900">Join Our Portal</h2>
          <div className="text-sm text-gray-500">Build your dream team here</div>
        </div>
        <form className=" space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullname" className="font-medium">
                Company
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="fullname"
                required
                className="bg-gray-50 rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 hover:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Company name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-50 rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 hover:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Company email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-50 rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 hover:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 13a1 1 0 112 0V7a1 1 0 11-2 0v6zm1-4a1 1 0 10-2 0v2a1 1 0 102 0v-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Login Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-violet-600 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
            </button>
            <button
              type="button"
              className=" items-center border-gray-300 relative w-full flex justify-center py-2 px-4 border text-sm font-semibold rounded-full  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              <i className="mr-3">
                <FcGoogle size={22} />
              </i>
              Sign up with Google
            </button>
            <div className="text-center text-xs ">
              Already have an account?{' '}
              <Link className="text-violet-500 font-bold" href={'/login'}>
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
