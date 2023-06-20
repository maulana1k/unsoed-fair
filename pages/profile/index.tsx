import Link from 'next/link'
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { AppContext } from '../../lib/context'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import storage from '../../lib/firebase/storage'
import { BiArrowBack, BiEdit, BiShow, BiX } from 'react-icons/bi'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

interface IProfile {
  contact: string
  cv: string
  id: string
  social: string
  education: string
  userId: string
}

export default function Profile() {
  const ctx = useContext(AppContext)
  if (!ctx.loading) {
    if (ctx.user && ctx.user.role === 'user') {
      return <UserProfile />
    }
    if (ctx.user && ctx.user.role === 'employer') {
      return <CompanyProfile />
    }
  }
}

function UserProfile() {
  const ctx = useContext(AppContext)
  const [profile, setProfile] = useState<IProfile>({
    contact: '',
    cv: '',
    id: '',
    social: '',
    education: '',
    userId: '',
  })
  const [tab, setTab] = useState(0)
  const [fileName, setFileName] = useState('Upload your CV in PDF')
  const [file, setFile] = useState<Blob>()
  const loading = useRef<LoadingBarRef>(null)

  useEffect(() => {
    ;(async () => {
      if (ctx.user) {
        try {
          const result = await axios.get('/api/profile?userId=' + ctx.user?.id)
          setProfile(result.data)
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [ctx.loading])
  const formHandler = (label: string, val: string) => {
    let updated = { ...profile, [label]: val }
    setProfile(updated)
  }
  const submitHandler = async () => {
    loading.current?.continuousStart()
    let fileUrl = ''
    if (file) {
      const storageRef = ref(storage, ctx.user?.email + '/cv/' + file.name)
      const uploaded = await uploadBytes(storageRef, file, { contentType: 'application/pdf' })
      fileUrl = await getDownloadURL(uploaded.ref)
      setProfile({ ...profile, cv: fileUrl })
    }
    const result = await axios.post('/api/profile?userId=' + ctx.user?.id, { ...profile, cv: fileUrl })
    setProfile(result.data)
    loading.current?.complete()
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      setFileName(file.name)
    } else {
      setFileName('Upload your CV in PDF')
    }
  }
  if (profile) {
    return (
      <div className="h-full">
        <LoadingBar ref={loading} />
        <Navbar />
        <div className="max-w-[1200px] mt-24 mx-auto">
          <div className="flex flex-col  items-center space-y-1">
            <img
              className="h-28 w-28 rounded-full object-cover"
              src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535a30d871312cf4100aed_peep-73.png"
              alt="Avatar"
            />
            <div className="text-gray-800 text-xl font-bold">{ctx.user?.fullname}</div>
          </div>
          <div className="mt-4">
            <div className="flex space-x-12 justify-center ">
              {['Profile', 'Curriculum Vitae', 'Saved Jobs'].map((t, i) => (
                <div
                  key={t}
                  onClick={() => setTab(i)}
                  className={`text-md  ${
                    tab == i ? 'text-gray-800 font-bold border-b-2 border-gray-800' : 'text-gray-500'
                  } py-2 cursor-pointer`}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {tab == 0 && (
                <div className="w-[700px] rounded-xl  p-8 mt-4 mx-auto border">
                  <div className="text-2xl font-bold mb-4 space-y-2">
                    <span>Profile Info</span>
                    <hr />
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-gray-700 font-medium">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none"
                          value={ctx.user?.email}
                          disabled={true}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="u" className="text-gray-700 font-medium">
                          University
                        </label>
                        <input
                          type="text"
                          id="u"
                          placeholder={'Current or last education'}
                          className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                          onChange={(e) => formHandler('education', e.target.value)}
                          value={profile.education}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="social" className="text-gray-700 font-medium">
                          Social Media
                        </label>
                        <input
                          type="text"
                          id="social"
                          placeholder={'Social media url'}
                          className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                          onChange={(e) => formHandler('social', e.target.value)}
                          value={profile.social}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label htmlFor="contact" className="text-gray-700 font-medium">
                          Contact
                        </label>
                        <input
                          type="tel"
                          id="contact"
                          placeholder={'Contact number'}
                          className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                          onChange={(e) => formHandler('contact', e.target.value)}
                          value={profile.contact}
                        />
                      </div>
                      <div className="flex space-x-3 justify-end mt-4">
                        <button type={'submit'} className="px-3 py-1 bg-violet-500 text-white rounded-lg">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {tab == 1 && (
                <div className="w-[700px] rounded-xl  p-8 mt-4 mx-auto border">
                  <div className="relative">
                    <div className="flex flex-col space-y-1">
                      <div className="text-gray-700 font-medium">CV</div>
                      <input type="file" id="upload" className="hidden" onChange={handleFileChange} />
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                        {fileName}
                        <div className="flex text-gray-600 space-x-2 items-center">
                          <label htmlFor="upload" className="cursor-pointer hover:text-blue-500">
                            <BiEdit size={20} />
                          </label>
                          <Link href={profile.cv} target="_blank" className="flex items-center hover:text-blue-500">
                            <BiShow size={20} />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 justify-end mt-4">
                      <button onClick={submitHandler} className="px-3 py-1 bg-violet-500 text-white rounded-lg">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {tab == 2 && (
                <div className="w-[700px] rounded-xl  p-8 mt-4 mx-auto border">
                  <div className="text-xl font-bold">No jobs saved</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

interface ICompany {
  id: string
  companyName: string
  employerId: string
  logo: string
  about: string
}
export function CompanyProfile() {
  const [tab, setTab] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [profile, setProfile] = useState<ICompany>({
    id: '',
    companyName: '',
    employerId: '',
    logo: '',
    about: '',
  })
  const loading = useRef<LoadingBarRef>(null)
  const ctx = useContext(AppContext)
  console.log(profile)

  const formHandler = (label: string, val: string) => {
    let updated = { ...profile, [label]: val }
    setProfile(updated)
  }
  const submitHandler = async () => {
    loading.current?.continuousStart()
    const result = await axios.post('/api/profile?userId=' + ctx.user?.id, { ...profile })
    setProfile(result.data)
    setIsEdit(false)
    loading.current?.complete()
  }
  useEffect(() => {
    ;(async () => {
      if (ctx.user) {
        try {
          const result = await axios.get('/api/profile?userId=' + ctx.user?.id)
          console.log('res', result)
          setProfile(result.data)
          setIsEdit(false)
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [])

  return (
    <div className=" h-full">
      <LoadingBar ref={loading} />
      <Navbar />
      <div className="max-w-[1200px] pt-24 mx-auto px-10">
        <div className="text-sm font-semibold text-gray-400">
          <Link href={'/jobs-company'} className="flex items-center space-x-3">
            <BiArrowBack /> <span>Back to Homepage</span>
          </Link>
          <img
            src={'http://mgt.unida.gontor.ac.id/wp-content/uploads/2021/09/1575050504675-logo-tokopedia-300x225.jpg'}
            alt="Company Logo"
            className="w-32 h-32 object-contain "
          />
          {isEdit ? (
            <input
              type="text"
              id="name"
              className="bg-gray-50 max-w-lg text-xl text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
              onChange={(e) => formHandler('companyName', e.target.value)}
              value={profile?.companyName}
            />
          ) : (
            <div className="text-2xl text-gray-900">{profile?.companyName}</div>
          )}
          <div className="flex space-x-6 mt-2 items-center">
            {['About', 'Jobs'].map((t, i) => (
              <div
                key={t}
                onClick={() => setTab(i)}
                className={`text-md  ${
                  tab == i ? 'text-gray-800 font-bold border-b-2 border-gray-800' : 'text-gray-500'
                } py-2 cursor-pointer`}
              >
                {t}
              </div>
            ))}
            <div className="space-x-1 items-center flex">
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 hover:text-green-500 hover:bg-gray-50 px-2 py-1 rounded-md"
              >
                <BiEdit size={24} />
              </button>
              {isEdit && (
                <>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="text-gray-500 hover:text-red-500 hover:bg-gray-50 px-2 py-1 rounded-md"
                  >
                    <BiX size={24} />
                  </button>
                  <button
                    onClick={submitHandler}
                    className="text-gray-500 hover:text-green-500 hover:bg-gray-50 px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
          {tab == 0 &&
            (isEdit ? (
              <div>
                <textarea
                  name="about"
                  id="about"
                  cols={70}
                  onChange={(e) => formHandler('about', e.target.value)}
                  className="max-w-3xl rounded-lg mt-4 text-sm font-normal text-gray-700  bg-gray-50 border-gray-100 p-4"
                  value={profile?.about}
                ></textarea>
              </div>
            ) : (
              <div className="max-w-3xl rounded-lg mt-4 text-sm font-normal text-gray-700  bg-gray-50 border-gray-100 p-4">
                {profile?.about}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
