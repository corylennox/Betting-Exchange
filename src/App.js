import React from 'react';
import Navbar from './components/Navbar';
import "./tailwind.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Basketball from './components/Basketball';

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400">
      <Router>
        <Navbar />
        <div className='h-full w-full justify-center flex'>
          <div className=' bg-slate-900 flex justify-end h-full w-full'>
            <body>sidebar</body>
            </div>
          <div className='bg-slate-200 pl-8 pt-4 pr-8 h-full min-w-fit max-w-6xl'>
            <Basketball/>
          </div>
          <div className='bg-slate-200 shadow-xl drop-shadow-md h-full w-full'><body>Betslip</body></div>
        </div>
      </Router>
    </main>
  );
}