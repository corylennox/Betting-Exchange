import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";

export const ThemeData = [
  { id: 0, name: "Device Theme", getIcon: (isNavbarIcon) => {return isNavbarIcon ?
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? <MoonIcon className="h-6 w-6" />
      : <SunIcon className="h-6 w-6" />
    : <DesktopComputerIcon className="h-6 w-6" /> }},
  { id: 1, name: "Light", getIcon: (isNavbarIcon) => { return <SunIcon className={`h-6 w-6 ${isNavbarIcon ? "fill-blue-400" : ''}`} /> }},
  { id: 2, name: "Dark", getIcon: (isNavbarIcon) => { return <MoonIcon className={`h-6 w-6 ${isNavbarIcon ? "fill-blue-400" : ''}`} /> }},
];

export const Themes = new Map();
Themes.set(ThemeData[0].name, ThemeData[0]);
Themes.set(ThemeData[1].name, ThemeData[1]);
Themes.set(ThemeData[2].name, ThemeData[2]);
