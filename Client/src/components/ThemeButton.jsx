import React from "react";
import { Listbox } from "@headlessui/react";
import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";

function myFunc() {
  return (
      <Listbox.Options className="dark:highlight-white/5 absolute top-1/2 right-0 z-50 mt-8 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-0">
        {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
        
        
        <Menu.Item>
          {({ active }) => (
            <span
              className={`flex cursor-pointer items-center px-2 py-1 ${
                active ? "bg-skin-accent" : ""
              }`}
              onClick={(localStorage.theme = "light")}
            >
              <SunIcon className="mr-2 h-6 w-6" />
              Light
            </span>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <span
              className={`flex cursor-pointer items-center px-2 py-1 ${
                active ? "bg-skin-accent" : ""
              }`}
              onClick={(localStorage.theme = "dark")}
            >
              <MoonIcon className="mr-2 h-6 w-6" />
              Dark
            </span>
          )}
        </Menu.Item>

        <Menu.Item as={React.Fragment}>
          {({ active }) => (
            <span
              className={`flex cursor-pointer items-center px-2 py-1 ${
                active ? "bg-skin-accent" : ""
              }`}
              onClick={localStorage.removeItem("theme")}
            >
              <DesktopComputerIcon className="mr-2 h-6 w-6" />
              System
            </span>
          )}
        </Menu.Item>
    </Listbox.Options>
  );
}

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: <DesktopComputerIcon className="mr-2 h-6 w-6" /> },
]

export default function ThemeButton() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>
        <span className="dark:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              className="fill-sky-400/20 stroke-sky-500"
            ></path>
            <path
              d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
              className="stroke-sky-500"
            ></path>
          </svg>
        </span>
        <span className="hidden dark:inline">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
              className="fill-sky-400/20"
            ></path>
            <path
              d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
              className="fill-sky-500"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
              className="fill-sky-500"
            ></path>
          </svg>
        </span>
      </Menu.Button>

      {/* Menu Items */}
      {myFunc()}
    </Menu>
  );
}
