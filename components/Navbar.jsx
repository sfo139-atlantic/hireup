/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline';
import { aLinkGreen, aLinkGrey } from '../styles/styles';
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import Link from 'next/link';


const navigation = [
  { name: 'Explore', href: 'explore', current: false },
  { name: 'Login', href: 'login', current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const router = useRouter();

  const signOut = () => {
    logout();
    router.push('/login');
  }

  const [user] = useAuthState(auth);

  return (
    <Disclosure as="nav" className="sticky w-screen top-0 left-0 right-0 bg-white border-b border-b-grey z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-grey hover:text-white hover:bg-green focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                    <Link href='/'>
                      <a>
                        <img
                          className='block lg:hidden h-8 w-auto'
                          src="/HireUpLogo.svg"
                          alt="Workflow"
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a>
                        <img
                          className='hidden lg:block h-8 w-auto'
                          src="/HireUpLogo.svg"
                          alt="Workflow"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className='relative'>
                  <div>
                    <Menu.Button className='inline-flex text-grey hover:text-green px-4 py-1 rounded-md text-sm font-semibold font-sans'>
                      Explore
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
                          <Link href="explore">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Freelancers
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="exploreproposals">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Proposals
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {
                  user === null ?
                  <Link href='login'>
                    <a className='text-grey hover:text-green px-4 py-1 rounded-md text-sm font-semibold font-sans'>Login</a>
                  </Link>
                  :
                  <></>
                }
                {/* Profile dropdown */}
                {
                user === null ?
                <Link href="signup">
                  <a className={aLinkGreen}>Join</a>
                </Link>
                :
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green">
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="w-6 h-6 text-grey hover:text-green" />
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
                          <Link href="profile">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Your Profile
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="proposals">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Proposals
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="skills">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Edit Skills
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="messages">
                            <a
                              className={classNames(active ? 'bg-green' : '', 'hover:bg-green block px-4 py-2 text-sm text-black')}
                            >
                              Messages
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signOut}
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
                  className='text-grey hover:bg-green hover:text-black block px-3 py-2 rounded-md text-base font-medium'
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  key='Home'
                  as="a"
                  href='messages'
                  className='text-grey hover:bg-green hover:text-black block px-3 py-2 rounded-md text-base font-medium'
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
