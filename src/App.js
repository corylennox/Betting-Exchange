import React from 'react';
import Navbar from './components/Navbar';
import "./tailwind.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import SportPane from './components/SportPane';

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400">
      <Router>
        <Navbar />
        <div className='h-full w-auto justify-center flex'>
          <div className=' bg-slate-900 border-t border-slate-100 flex justify-end h-full w-full'>
            <body>sidebar</body>
          </div>
          <div className="h-full min-w-fit max-w-6xl">
            <SportPane />
          </div>
          <div className='bg-slate-50 shadow-xl drop-shadow-md h-full w-full'><body>Betslip</body></div>
        </div>
      </Router>
    </main>
  );
}