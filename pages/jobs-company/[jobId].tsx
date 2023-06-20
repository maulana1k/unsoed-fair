import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IJob } from '../../types/model'
import { useRouter } from 'next/router'
import axios from 'axios'
import NavbarCompany from '../../components/NavbarCompany'

export default function JobDetail() {
  const router = useRouter()
  const { jobId } = router.query
  const [job, setJob] = useState<IJob>()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const result = await axios.get(`/api/job/${jobId}`)
        setJob(result.data)
      } catch (error) {
        console.error('Error fetching job', error)
      }
    }

    if (jobId) {
      fetchJob()
    }
  }, [jobId])

  return (
    <div className="h-full">
      <NavbarCompany />
      <div className="max-w-[1200px] pt-24 mx-auto">
        <div className="text-sm font-semibold text-gray-400">
          <Link href={'/'} className="flex items-center space-x-3">
            <BiArrowBack /> <span>Back to Homepage</span>
          </Link>
        </div>
        {job && (
          <div className="mt-6">
            <div className="my-6">
              <img
                src={job.user.company.logo}
                alt="Company Logo"
                className="w-24 h-24 rounded-full object-contain shadow-md"
              />
              <div className="text-xl mt-4 font-medium text-gray-700 hover:text-violet-800">
                {job.user.company.companyName}
              </div>
              <div className="text-2xl font-bold ">{job.title}</div>
            </div>
            <div className="grid grid-cols-5 gap-10">
              <div className="space-y-4 col-span-3 ">
                <div>
                  <div className="text-md font-medium mb-2">Job Description</div>
                  <div className="bg-gray-50 text-sm border border-gray-200 rounded-lg p-4 whitespace-pre-line ">
                    {job.detail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(!isOpen)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <div className="w-full  bg-violet-600 py-4 px-6 text-xl font-bold text-white">
                    <div>
                      Apply for <span className="text-yellow-300">Tokopedia</span>
                    </div>
                    <div className="text-sm font-medium ">Software Engineer</div>
                  </div>
                  <div className="p-6">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Personal Information
                    </Dialog.Title>
                    <form action="" className="space-y-4 mt-4">
                      <div className="rounded-md shadow-sm space-y-3">
                        <div>
                          <label htmlFor="fullname" className="font-medium text-sm">
                            Fullname
                          </label>
                          <input
                            id="fullname"
                            name="fullname"
                            type="fullname"
                            autoComplete="fullname"
                            required
                            className="bg-gray-50 rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 hover:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Email"
                            value={'fullname'}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="font-medium text-sm">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="bg-gray-50 rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 hover:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Email"
                            value={'email'}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="font-medium text-sm">
                            CV
                          </label>
                          <div
                            id="email"
                            className="bg-gray-50 rounded-lg relative block w-full px-3 py-2 border border-gray-300 sm:text-sm"
                          >
                            CV Kevin Ketimun Laut
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className=" justify-end flex">
                        <button
                          type="button"
                          className=" justify-center rounded-full border border-transparent  px-4 py-2 text-sm font-medium text-gray-500 "
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className=" justify-center rounded-full border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white "
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
