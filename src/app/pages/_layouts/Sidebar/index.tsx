import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, LogoutIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/assets/cintia_logo.png';

import { Templates, User, Users } from '../../../shared/components/icons';
import { Container } from './style';

const navigation = [
  { name: 'ALUNOS', href: 'alunos', icon: Users, current: true },
  { name: 'PLANOS', href: 'planos', icon: Templates, current: false },
  { name: 'AULAS', href: 'aulas', icon: Templates, current: false },
  { name: 'REPOSIÇÕES', href: 'remarcacoes', icon: Templates, current: false },
  { name: 'FALTAS', href: 'faltas', icon: Templates, current: false },
  { name: 'RELATORIO', href: 'relatorio', icon: Templates, current: false },
];

function classNames(...classes: any[]):any {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children?: React.ReactNode; // 👈️ type children
};

export default function Example({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-slate-50">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="mx-auto h-60 w-60"
                      src={`${Logo}`}
                      alt="Workflow"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-4 space-y-1">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }: any) => {
                            return classNames(
                              isActive
                                ? 'bg-primary text-gray-700'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center px-4 py-4 text-sm font-medium  '
                            );
                          }}
                        >
                          <item.icon
                          />
                          <p className="lg:ml-2 ml-2">{item.name}</p>

                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 border-r-2" >
            <div className="  w-50 h mx-auto flex items-center h-30 flex-shrink-0 px-4 ">
              <img className="h-full w-full" src={`${Logo}`} alt="Workflow" />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-0 py-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }: any) => {
                      return classNames(
                        isActive
                          ? 'bg-grandient-custom text-gray-700'
                          : 'text-gray-300 hover:bg-secundaryOpacity3 hover:text-primary',
                        'group flex items-center px-4 py-3 text-sm font-medium '
                      );
                    }}
                  >
                    <item.icon
                    />
                    <p className="lg:ml-2 ml-2">{item.name}</p>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="lg:pl-64 flex flex-col">
          <div className="sticky top-0  flex-shrink-0 flex h-16 bg-custom-g shadow z-[9999]">
            <button
              type="button"
              className="px-4 border-r  border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className=" flex-1 px-4 flex  justify-between">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center lg:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <div>
                      <Menu.Button className="text-white50 inline-flex justify-center w-full rounded-lg items-center  shadow-sm px-4 py-2  text-sm font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                        <User /> <p className="ml-4"> Cintia Freitas</p>
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to="/"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-700'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                              )}
                            >
                              <LogoutIcon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Sair
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="py-4">
                  <div className="min-h-[79vh] px-4 py-6 xl:px-8 bg-white10 shadow-3xl-personalized rounded-3xl">
                    {children}
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
}
