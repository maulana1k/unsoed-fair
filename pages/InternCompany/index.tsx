import React from 'react';
import NavbarCompany from '../../components/NavbarCompany';

function Internship() {
  return (
    <div className="container h-full bg-violet-700">
      <NavbarCompany />

      <div className="bg-white rounded-t-[0px] mt-8 p-6 min-h-full">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <h2 className="text-2xl font-bold mb-6 mt-12">Internship Opportunities</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Internship Opportunity 1 */}
            <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
              <div className="flex items-center mb-4">
                <img
                  src="https://www.example.com/company-logo1.jpg"
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-contain"
                />
                <div className="ml-3">
                  <h2 className="text-md font-bold">Software Developer Intern</h2>
                  <p className="text-gray-600 text-sm">Company A</p>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="text-gray-600 text-sm">Location: Jakarta</div>
                <div className="text-gray-600 text-sm">Duration: 3 months</div>
              </div>
              <div className="w-full flex space-x-1">
                <button className="flex items-center justify-center bg-orange-500 text-white text-xs py-1 px-4 rounded-lg">
                  Edit
                </button>
                <button className="flex items-center justify-center bg-red-500 text-white text-xs py-1 px-4 rounded-lg">
                  Delete
                </button>
              </div>
            </div>

            {/* Internship Opportunity 2 */}
            <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
              <div className="flex items-center mb-4">
                <img
                  src="https://www.example.com/company-logo2.jpg"
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-contain"
                />
                <div className="ml-3">
                  <h2 className="text-md font-bold">Marketing Intern</h2>
                  <p className="text-gray-600 text-sm">Company B</p>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="text-gray-600 text-sm">Location: Bandung</div>
                <div className="text-gray-600 text-sm">Duration: 2 months</div>
              </div>
              <div className="w-full flex space-x-1">
                <button className="flex items-center justify-center bg-orange-500 text-white text-xs py-1 px-4 rounded-lg">
                  Edit
                </button>
                <button className="flex items-center justify-center bg-red-500 text-white text-xs py-1 px-4 rounded-lg">
                  Delete
                </button>
              </div>
            </div>

            {/* Internship Opportunity 3 */}
            <div className="rounded-lg shadow-md bg-white p-4 outline outline-1 outline-gray-200 hover:outline-violet-500">
              <div className="flex items-center mb-4">
                <img
                  src="https://www.example.com/company-logo3.jpg"
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-contain"
                />
                <div className="ml-3">
                  <h2 className="text-md font-bold">Graphic Design Intern</h2>
                  <p className="text-gray-600 text-sm">Company C</p>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="text-gray-600 text-sm">Location: Surabaya</div>
                <div className="text-gray-600 text-sm">Duration: 4 months</div>
              </div>
              <div className="w-full flex space-x-1">
                <button className="flex items-center justify-center bg-orange-500 text-white text-xs py-1 px-4 rounded-lg">
                  Edit
                </button>
                <button className="flex items-center justify-center bg-red-500 text-white text-xs py-1 px-4 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Internship;
