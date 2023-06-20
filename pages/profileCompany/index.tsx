import React, { ChangeEvent, useState } from 'react';
import Navbar from '../../components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function Profile() {
  const [tab, setTab] = useState(0);

  const handleGoBack = () => {
    // Navigasi kembali ke halaman beranda
    // Ganti "/home" dengan rute yang sesuai
    window.location.href = "/home";
  };

  return (
    <div className="h-screen flex justify-start">
      <Navbar />
      <div className="flex-1 ml-5 mt-5">
        <div className="mb-12 mt-12" onClick={handleGoBack} style={{ marginLeft: '-1rem', cursor: 'pointer' }}>
          <span className="text-gray-500 text-sm flex items-center">
            <FaArrowLeft className="inline-block text-xl mr-1" />
            Back to Homepage
          </span>
        </div>
        <div className="text-xl font-bold">Saved Jobs</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          {Array(20)
            .fill(1)
            .slice(0, 9) // Mengambil maksimal 9 elemen (3 kolom)
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
    </div>
  );
}
