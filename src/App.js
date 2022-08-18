import React from 'react';
import TeamLine from './TeamLine';
import "./tailwind.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";

export default function App() {
  return (
    <main class="text-gray-400 bg-gray-900 py-200 px-200">
      <Router>
        <TeamLine />
        <TeamLine />
      </Router>
    </main>
  );
}