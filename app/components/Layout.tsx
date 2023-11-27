import {
  HomeIcon,
    MusicalNoteIcon,
    DocumentTextIcon,
    EnvelopeIcon,
QueueListIcon,


    Square2StackIcon,
    UserIcon,
  } from "@heroicons/react/24/outline";
  import { NavLink, Outlet } from "@remix-run/react";
  import clsx from "clsx";
  
  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About", href: "/about", icon: DocumentTextIcon },
    { name: "Dashboard", href: "/models", icon: QueueListIcon },

  ];
  
  export default function Layout(props) {
    
    return (
      <div
      className="flex h-[100dvh] overflow-hidden max-w-screen"
        style={{
          paddingBottom: `calc(env(safe-area-inset-bottom) + 64px))`,
        }}
      >
        {/* Static sidebar for desktop */}
        <div className="hidden flex-shrink-0 md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
</svg>

              <p className="text-dark font-bold pl-2">
                Light
                <span className="font-bold">-Matter</span>
              </p>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            clsx(
                              isActive
                                ? "bg-gray-50 text-dark"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon
                                className={clsx(
                                  isActive
                                    ? "text-dark-600"
                                    : "text-gray-400 group-hover:text-blue-600",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                {props.user?<li className=" mt-auto">
                  <NavLink
                    to="/models/profile"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{props.user?.profile?.firstName}</span>
                  </NavLink>
                </li>:null}
                
              </ul>
            </nav>
          </div>
        </div>
  
        {/* <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Playlists
          </div>
        </div> */}
  
        <Outlet />
        <nav
        className="fixed bottom-0 border-t border-gray-200 grid md:hidden grid-cols-3 bg-gray-50/80 backdrop-blur-2xl inset-x-0 items-start justify-start pb-safe"
        style={{
            height: `calc(env(safe-area-inset-bottom) + 64px))`,
          }}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  isActive ? "text-black" : "text-gray-700 ",
                  "group flex flex-col items-center text-center rounded-md p-2 text-sm leading-6 font-semibold",
                  "touch-manipulation"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={clsx(
                      isActive ? "text-black" : "text-gray-400 ",
                      "h-5 w-5 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }
  