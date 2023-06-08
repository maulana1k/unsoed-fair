import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import Navbar from '../../components/NavbarCompay'

export default function Profile() {
  const [tab, setTab] = useState(0)
  const [fileName, setFileName] = useState('Upload your CV in PDF')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // Perform additional logic with the selected file if needed
    } else {
      setFileName('Upload your CV in PDF')
    }
  }
  return (
    <div className="container h-full">
      <Navbar />
      <div className="max-w-[1200px] mt-24 mx-auto">
        <div className="flex flex-col  items-center space-y-1">
          <img
            className="h-28 w-28 rounded-full object-cover"
            src="https://www.teknovidia.com/wp-content/uploads/2022/04/Logo-Shopee.jpg"
            alt="Avatar"
          />
          <div className="text-gray-800 text-xl font-bold">Shopee</div>
          <div className="text-gray-500 text-sm ">E-Commerce Company Profile</div>
        </div>
        <div className="mt-8 ">
          <div className="flex space-x-12 justify-center ">
            {['Profile', 'About', 'Jobs'].map((t, i) => (
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
                  <span>Company Profile Info</span>
                  <hr />
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                      value={'example@gmail.com'}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="u" className="text-gray-700 font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      id="u"
                      className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                      value={'201 Main St'}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="contact" className="text-gray-700 font-medium">
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      className="bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 "
                      value={'08723273462'}
                    />
                  </div>
                </div>
              </div>
            )}
            {tab == 1 && (
                <div className="w-[700px] rounded-xl  p-8 mt-4 mx-auto border">
                    <div className="relative">
                    <div className="flex flex-col space-y-1">
                        <div className="text-gray-700 font-medium">About Company</div>
                        <textarea
                        id="about"
                        className="resize-none bg-gray-50 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500"
                        rows={4} // Atur jumlah baris yang diinginkan
                        cols={60}
                        value={'Company description...'} // Isi teks default sesuai kebutuhan
                        />
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
