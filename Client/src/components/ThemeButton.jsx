import React, { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { changeThemeAction } from "../Actions";

const themes = [
  { id: "light", text: "Light", icon: <SunIcon className="mr-2 h-6 w-6" /> },
  { id: "dark", text: "Dark", icon: <MoonIcon className="mr-2 h-6 w-6" /> },
  {
    id: "undefined",
    text: "System",
    icon: <DesktopComputerIcon className="mr-2 h-6 w-6" />,
  },
];

export default function ThemeButton() {
  //const [selectedTheme, setSelectedTheme] = useState(localStorage.theme === )
  const activeTheme = useSelector((state) => state.activeTheme);

  return (
    <div className="relative">
      <Listbox
        value={activeTheme}
        by="id"
        onChange={useDispatch(changeThemeAction(//))}
      >
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
                `cursor-pointer items-center px-2 py-1 ${
                  active ? "bg-skin-accent" : ""
                } ${selected ? "text-red-600" : ""}`
              }
            >
              <span className="inline-flex">
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
