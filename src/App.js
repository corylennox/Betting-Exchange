import React from 'react';
import Navbar from './Navbar';
import Proposition from './Proposition';
import "./tailwind.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";

export default function App() {
  return (
    <main class="absolute inset-0 text-gray-400 bg-gray-900">
      <Router>
        <Navbar />
        <Proposition />
      </Router>
    </main>
  );
}