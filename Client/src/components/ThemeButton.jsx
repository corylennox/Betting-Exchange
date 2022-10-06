import React, { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";

const themes = [
  { id: 0, name: 'light', text: "Light", icon: <SunIcon className="mr-2 h-6 w-6" /> },
  { id: 1, name: 'dark', text: "Dark", icon: <MoonIcon className="mr-2 h-6 w-6" /> },
  { id: 2, name: 'undefined', text: "System", icon: <DesktopComputerIcon className="mr-2 h-6 w-6" /> }
]

export default function ThemeButton() {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.theme === )
  const onChange = () => {
    switch (selectedTheme.name) {
      case 'light':
        localStorage.theme = 'light'
        break;
      case 'dark':
        localStorage.theme = 'dark'
        break;
      case 'undefined':
        localStorage.removeItem('theme')
        break
      default:
    }
  };

  return (
    <div className="relative">
      <Listbox value={selectedTheme} by="id" onChange={setSelectedTheme}>
        <Listbox.Button>

          <SunIcon className="h-6 w-6" />

        </Listbox.Button>

        {/* Menu Items */}
        <Listbox.Options className="dark:highlight-white/5 absolute top-1/2 right-0 z-50 mt-8 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-0">
          {themes.map((theme) => (
            <Listbox.Option
              key={theme.id}
              value={theme}
              className={({ active, selected }) =>
                `cursor-pointer items-center px-2 py-1 ${active ? 'bg-skin-accent' : ''
                } ${selected ? 'text-red-600' : ''}`}
            >
              <span
                className="inline-flex"
              >
                {theme.icon}
                {theme.text}
              </span>


            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
