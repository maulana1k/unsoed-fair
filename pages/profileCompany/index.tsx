import React, { ChangeEvent, useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Profile() {
  const [tab, setTab] = useState(0);

  const handleGoBack = () => {
    // Navigasi kembali ke halaman beranda
    // Ganti "/home" dengan rute yang sesuai
    window.location.href = "/home";
  };

  return (
    <div className="h-screen" style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Navbar />
      <div style={{ flex: 1, marginLeft: '5rem', marginTop: '5rem' }}>
        <div className="mb-12 mt-12" onClick={handleGoBack} style={{ marginLeft: '-1rem' }}>
          <span className="text-gray-500 text-sm">← Back to Homepage</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img
            className="h-28 w-28 rounded-full object-cover"
            src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png"
            alt="Avatar"
          />
          <div className="text-gray-800 text-xl font-bold">PT. Tokopedia</div>
        </div>
        <div className="mt-8">
          <div className="flex space-x-12">
            {['About', 'Saved Jobs'].map((t, i) => (
              <div
                key={t}
                onClick={() => setTab(i)}
                className={`text-md ${
                  tab === i ? 'text-gray-800 font-bold border-b-2 border-gray-800' : 'text-gray-500'
                } py-2 cursor-pointer`}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="flex">
            {tab === 0 && (
              <div className="relative">
                <div className="flex flex-col space-y-1">
                <textarea
                  id="about"
                  className="w-auto h-auto bg-gray-100 text-gray-600 border border-gray-100 rounded-lg px-3 py-1 outline-none focus:border-violet-500 hover:border-violet-500 resize-none mt-6 px-6 py-6"
                  rows={10}
                  cols={160}
                  readOnly
                  value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />


                </div>
              </div>
            )}

            {tab === 1 && (
              <div className="w-[700px] rounded-xl p-8 mt-4">
                <div className="text-xl font-bold">Saved Jobs</div>

                <div className="grid grid-cols-3 gap-8 mt-4">
                  {Array(20)
                    .fill(1)
                    .map((v, i) => (
                      <Link href={'/jobs/' + v + i} key={v + i}>
                        <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
                          <div className="flex items-center mb-4">
                            <img
                              src="http://mgt.unida.gontor.ac.id/wp-content/uploads/2021/09/1575050504675-logo-tokopedia-300x225.jpg"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
