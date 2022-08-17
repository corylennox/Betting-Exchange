import logo from './logo.svg';
import './App.css';
//import MyButton from "./MyButton"
import MyButton from "./MyButton"
import "./tailwind.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <main>
      <Router>
        <MyButton />
        <MyButton />
        <MyButton />
        <MyButton />
        <MyButton />
        <MyButton />
      </Router>
    </main>
  );
}

export default App;
