import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Fragment, useContext, useRef, useState } from 'react'
import { AppContext } from '@/lib/context'
import Router from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

interface IJob {
  title: string
  location: string
  experience: string
  type: string
  detail: string
}

export default function NewJob() {
  const ctx = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const loading = useRef<LoadingBarRef>(null)
  const [jobs, setJobs] = useState<IJob>({
    title: '',
    location: '',
    experience: '',
    type: '',
    detail: '',
  })
  console.log(jobs)

  const formHandler = (label: string, val: string) => {
    const update = { ...jobs, [label]: val }
    setJobs(update)
  }
  const submitHandler = async () => {
    loading.current?.continuousStart()
    const result = await axios.post('/api/jobs', { ...jobs, userId: ctx.user?.id })
    console.log(result)
    loading.current?.complete()
  }
  if (!ctx.loading) {
    if (ctx.user !== null && ctx.user?.role !== 'employer') {
      Router.back()
      return
    }
    return (
      <div className="container h-full">
        <LoadingBar ref={loading} />
        <Navbar />
        <div className="max-w-[1200px] pt-24 mx-auto">
          <div className="text-sm font-semibold text-gray-400">
            <Link href={'/jobs-company'} className="flex items-center space-x-3">
              <BiArrowBack /> <span>Back to Homepage</span>
            </Link>
          </div>
          <div className="mx-auto my-4 text-gray-700  max-w-3xl ">
            <div className="font-bold text-3xl text-center">Post New Job</div>
            <table className=" w-full">
              <tbody>
                <tr>
                  <td className="p-4 text-end font-bold">
                    <div>Job Title</div>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="title"
                      className="w-full bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none hover:outline-violet-400 focus:outline-violet-400 "
                      onChange={(e) => formHandler('title', e.target.value)}
                      value={jobs.title}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-end font-bold">
                    <div>Work Type</div>
                  </td>
                  <td>
                    <div className="flex space-x-3">
                      <div>
                        <input
                          type="radio"
                          id="ft"
                          name="type"
                          className="hidden peer"
                          required
                          onChange={(e) => formHandler('type', e.target.value)}
                          value="fulltime"
                        />
                        <label
                          htmlFor="ft"
                          className="inline-flex items-center justify-between w-full py-2 px-6 peer-checked:outline  border-gray-200 rounded-lg cursor-pointer peer-checked:outline-violet-600 peer-checked:text-violet-600 hover:text-violet-600 hover:bg-gray-100 bg-gray-50"
                        >
                          <div className="">
                            <div className="w-full text-md font-semibold">Fulltime</div>
                          </div>
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="int"
                          name="type"
                          className="hidden peer"
                          required
                          onChange={(e) => formHandler('type', e.target.value)}
                          value="intern"
                        />
                        <label
                          htmlFor="int"
                          className="inline-flex items-center justify-between w-full py-2 px-6 peer-checked:outline  border-gray-200 rounded-lg cursor-pointer peer-checked:outline-violet-600 peer-checked:text-violet-600 hover:text-violet-600 hover:bg-gray-100 bg-gray-50"
                        >
                          <div className="">
                            <div className="w-full text-md font-semibold">Internship</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-end font-bold">
                    <div>Location</div>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="location"
                      className="w-full bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none hover:outline-violet-400 focus:outline-violet-400 "
                      onChange={(e) => formHandler('location', e.target.value)}
                      value={jobs.location}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="p-4 text-end font-bold">
                    <div>Experience</div>
                  </td>
                  <td>
                    <div className="flex space-x-3">
                      <div>
                        <input
                          type="radio"
                          id="new"
                          name="exp"
                          value="new"
                          className="hidden peer"
                          required
                          onChange={(e) => formHandler('experience', e.target.value)}
                        />
                        <label
                          htmlFor="new"
                          className="inline-flex items-center justify-between w-full py-2 px-6 peer-checked:outline  border-gray-200 rounded-lg cursor-pointer peer-checked:outline-violet-600 peer-checked:text-violet-600 hover:text-violet-600 hover:bg-gray-100 bg-gray-50"
                        >
                          <div className="">
                            <div className="w-full text-md font-semibold">New Entry</div>
                          </div>
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="intermediate"
                          name="exp"
                          value="intermediate"
                          className="hidden peer"
                          required
                          onChange={(e) => formHandler('experience', e.target.value)}
                        />
                        <label
                          htmlFor="intermediate"
                          className="inline-flex items-center justify-between w-full py-2 px-6 peer-checked:outline  border-gray-200 rounded-lg cursor-pointer peer-checked:outline-violet-600 peer-checked:text-violet-600 hover:text-violet-600 hover:bg-gray-100 bg-gray-50"
                        >
                          <div className="">
                            <div className="w-full text-md font-semibold">Intermediate</div>
                          </div>
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="senior"
                          name="exp"
                          value="senior"
                          className="hidden peer"
                          required
                          onChange={(e) => formHandler('experience', e.target.value)}
                        />
                        <label
                          htmlFor="senior"
                          className="inline-flex items-center justify-between w-full py-2 px-6 peer-checked:outline  border-gray-200 rounded-lg cursor-pointer peer-checked:outline-violet-600 peer-checked:text-violet-600 hover:text-violet-600 hover:bg-gray-100 bg-gray-50"
                        >
                          <div className="">
                            <div className="w-full text-md font-semibold">Senior</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-end font-bold items-start">
                    <div>Details</div>
                  </td>
                  <td>
                    <textarea
                      id="salary"
                      rows={6}
                      onChange={(e) => formHandler('detail', e.target.value)}
                      className="w-full bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none hover:outline-violet-400 focus:outline-violet-400 "
                      value={jobs.detail}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <button
                      onClick={submitHandler}
                      className="rounded-lg hover:bg-violet-800 bg-violet-600 text-white font-bold px-10 py-2 w-full"
                    >
                      Post Job
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end"></div>
          </div>
        </div>
      </div>
    )
  }
}
