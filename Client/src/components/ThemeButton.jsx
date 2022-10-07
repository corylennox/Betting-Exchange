import React from "react";
import { Listbox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { changeThemeAction } from "../Actions";
import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";

const themeData = [
  { name: "System", icon: <DesktopComputerIcon className="h-6 w-6" /> },
  { name: "Light", icon: <SunIcon className="h-6 w-6" /> },
  { name: "Dark", icon: <MoonIcon className="h-6 w-6" /> },
];

const themes = new Map();
themes.set('System', themeData[0]);
themes.set('Dark', themeData[1]);
themes.set('Light', themeData[2]);

export default function ThemeButton() {
  //const [selectedTheme, setSelectedTheme] = useState(localStorage.theme === )
  const activeTheme = useSelector((state) => state.activeTheme);

  return (
    <div className="relative h-full">
      <Listbox
        value={activeTheme}
        by="id"
        onChange={useDispatch(changeThemeAction(activeTheme))}>
        <Listbox.Button className="align-middle items-center h-full">
          <span>
            {themes.get(activeTheme).icon}
          </span>
        </Listbox.Button>

        {/* Menu Items */}
        <Listbox.Options className="dark:highlight-white/5 h-96 absolute top-0 right-0 z-50 mt-8 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-0">
          {[...themes.keys()].map(theme => (
            <Listbox.Option
              key={theme.text}
              value={theme.name}
              className={({ active, selected }) =>
                `cursor-pointer items-center px-2 py-1 ${active ? "bg-skin-accent" : ""
                } ${selected ? "text-red-600" : ""}`
              }
            >
              <span className="inline-flex items-center align-middle">
                test
                {theme.text}
              </span>











            </Listbox.Option>
          ))}

        </Listbox.Options>
      </Listbox>
    </div>
  );
}
