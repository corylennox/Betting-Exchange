import React from "react";
import NavbarTabs from "./NavbarTabs";

const navs = {
  home: {
    name: "Home",
    href: "home",
  },
  myBets: {
    name: "My Bets",
    href: "my-bets",
  },
};

const loginItems = {
  login: {
    name: "Log in",
    href: "login",
  },
  signup: {
    name: "Sign Up",
    href: "signup",
  },
};

export default function Navbar() {
  return (
    <div className="bg-slate-900 top-0 z-50 sticky w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-wrap flex-col md:flex-row items-center">
          <img className="h-5" src="logo.png" />
          <a href={navs.home.href} className="px-3 py-7">
            {navs.home.name}
          </a>
          <NavbarTabs navs={navs} />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row items-center">
          <a href={loginItems.login.href} className="px-3 py-7">
            {loginItems.login.name}
          </a>
          <a href={loginItems.signup.href} className="px-3 py-7">
            {loginItems.signup.name}
          </a>
        </div>
      </div>

      {/* <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="title-font font-medium text-white mb-4 md:mb-0">
          <a href="#about" class="ml-3 text-xl">
            Cory Lennox
          </a>
        </a>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700    flex flex-wrap items-center text-base justify-center">
          <a href="#projects" class="mr-5 hover:text-white">
            Past Work
          </a>
          <a href="#skills" class="mr-5 hover:text-white">
            Skills
          </a>
          <a href="#testimonials" class="mr-5 hover:text-white">
            Testimonials
          </a>
        </nav>
        <a
          href="#contact"
          class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Hire Me
          <ArrowRightIcon class="w-4 h-4 ml-1" />
        </a>
      </div> */}
    </div>
  );
}
