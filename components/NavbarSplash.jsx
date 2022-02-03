/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline';
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 right-0 bg-transparent z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                  <a
                    href='/'
                    >
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src="/HireUpLogo.svg"
                      alt="Workflow"
                    />
                  </a>
                  <a
                    href='/'
                    >
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src="/HireUpLogo.svg"
                      alt="Workflow"
                    />
                  </a>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a key='Explore' href='explore' className='text-white hover:text-green px-4 py-1 rounded-md text-sm font-semibold font-sans'>Explore</a>
                {
                  user === null ?
                  <a key='Login' href='login' className='text-white hover:text-green px-4 py-1 rounded-md text-sm font-semibold font-sans'>Login</a>
                  :
                  <></>
                }
                {/* Profile dropdown */}
                {
                user === null ?
                <a key="Join" href="signup" className='px-4 py-1 rounded-xl text-sm font-semibold text-green border border-green hover:text-white hover:bg-green'>Join</a>
                :
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green">
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="w-6 h-6 text-white hover:text-green" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="profile"
                            className={classNames(active ? 'bg-green' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="messages"
                            className={classNames(active ? 'bg-green' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Messages
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(active ? 'bg-green' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
                <Disclosure.Button
                  key='Home'
                  as="a"
                  href='/'
                  className='text-white hover:bg-green hover:text-black block px-3 py-2 rounded-md text-base font-medium'
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  key='Messages'
                  as="a"
                  href='messages'
                  className='text-white hover:bg-green hover:text-black block px-3 py-2 rounded-md text-base font-medium'
                >
                  Messages
                </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;