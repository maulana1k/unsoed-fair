import React from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";

class SponsorshipPage extends React.Component {
  render() {
    const active = true; // Ganti dengan status login yang sesuai
    const logout = () => {
      // Logika logout
    };

    return (
      <div>
        <nav className="bg-white shadow">
          <div className="px-24 py-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-2xl font-bold text-gray-900">Your Company</a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <svg
                        className="h-6 w-6 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </Menu.Button>
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/">
                              <a
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } block px-4 py-2 text-sm`}
                              >
                                Home
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/about">
                              <a
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } block px-4 py-2 text-sm`}
                              >
                                About
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/sponsorship">
                              <a
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } block px-4 py-2 text-sm`}
                              >
                                Sponsorship
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        {active ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/login">
                                <a
                                  className={`${
                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                  } block w-full text-left px-4 py-2 text-sm`}
                                >
                                  Sign in
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <header className="bg-gray-100 py-10">
          <div className="px-24">
            <h1 className="text-4xl font-bold text-gray-800">Sponsorship Packages</h1>
          </div>
        </header>

        <main>
          <section className="bg-gray-100 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-24">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800">Gold Package</h3>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula convallis
                  sapien non ultrices.
                </p>
                <div className="mt-4">
                  <Link href="/contact">
                    <a className="text-white bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-400">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800">Silver Package</h3>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula convallis
                  sapien non ultrices.
                </p>
                <div className="mt-4">
                  <Link href="/contact">
                    <a className="text-white bg-gray-500 py-2 px-4 rounded-md hover:bg-gray-400">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800">Bronze Package</h3>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula convallis
                  sapien non ultrices.
                </p>
                <div className="mt-4">
                  <Link href="/contact">
                    <a className="text-white bg-indigo-500 py-2 px-4 rounded-md hover:bg-indigo-400">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800">
          <div className="px-24 py-12">
            <p className="text-center text-gray-400">
              &copy; 2023 Your Company. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default SponsorshipPage;
