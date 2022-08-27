import React from 'react';
import Navbar from './components/Navbar';
import "./tailwind.css"
import SportPane from './components/SportPane';
// import {
//   BrowserRouter as Router,
//   Route,
// } from "react-router-dom";

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400">
      <Navbar />
 
        <div className='grid grid-cols-1 xl:grid-cols-4'>
          <div className=' bg-slate-900 border-t border-slate-100 flex justify-end h-full'>
            <body>sidebar</body>
          </div>
          <div className="md:col-span-1 xl:col-span-2 xl:w-auto w-full h-full border-2 border-red-600">
            <SportPane />
          </div>
          <div className='bg-slate-50 shadow-xl drop-shadow-md h-full'><body>Betslip</body></div>
        </div>



    </main>
  );
}