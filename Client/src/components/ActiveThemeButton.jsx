import React from "react";
import { Listbox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { changeThemeAction } from "../Actions";
import { Themes as themes, ThemeData as themeData } from "./ActiveThemes"

export default function ActiveThemeButton() {
  //const [selectedTheme, setSelectedTheme] = useState(localStorage.theme === )
  const activeTheme = useSelector((state) => state.activeTheme);
  const dispatch = useDispatch();

  return (
    <div className="relative h-full">
      <Listbox
        defaultValue={activeTheme}
        onChange={(arg) => {dispatch(changeThemeAction(arg))}}
      >
        <Listbox.Button className="h-full items-center align-middle">
          <span>{themes.get(activeTheme).getIcon(true)}</span>
        </Listbox.Button>

        {/* Menu Items */}
        <Listbox.Options className="dark:highlight-white/5 absolute top-1/2 right-0 z-50 mt-8 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-stone-900 dark:text-slate-300 dark:ring-0">
          {themeData.map((theme) => (
            <Listbox.Option
              key={theme.id}
              value={theme.name}
              className={({ active, selected }) =>
                `cursor-pointer items-center px-2 py-1 ${
                  active ? "bg-skin-accent" : ""
                } ${selected ? "text-sky-500" : ""}`
              }
            >
              <span className="inline-flex items-center align-middle">
                <span className="mr-2">{theme.getIcon(false)}</span>
                {theme.name}
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
