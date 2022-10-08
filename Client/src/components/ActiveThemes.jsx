import { SunIcon, MoonIcon, DesktopComputerIcon } from "@heroicons/react/solid";

export const ThemeData = [
  { id: 0, name: "Device Theme", icon: <DesktopComputerIcon className="h-6 w-6" /> },
  { id: 1, name: "Light", icon: <SunIcon className={'h-6 w-6'} /> },
  { id: 2, name: "Dark", icon: <MoonIcon className={'h-6 w-6'} /> },
];

export const Themes = new Map();
Themes.set(ThemeData[0].name, ThemeData[0]);
Themes.set(ThemeData[1].name, ThemeData[1]);
Themes.set(ThemeData[2].name, ThemeData[2]);
