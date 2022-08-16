import logo from './logo.svg';
import './App.css';
import MyButton from "./MyButton"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Router>
        <MyButton/>
      </Router>
    </main>
  );
}

export default App;
