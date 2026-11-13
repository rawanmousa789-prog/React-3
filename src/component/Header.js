import { Link , NavLink } from "react-router";
import "./Header.css"
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import '../theme.css'
import {useContext } from "react";
import Data from "../context/Data";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/Config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export default function Header() {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const {theme,changeTheme} = useContext(Data);
  return (
    
    <div>
      <header className="header">
    <h1><Link to="/">Web Dev Roadmap</Link></h1>
    <button className="theme"
    onClick={() => 
      changeTheme(theme === "light" ? "dark" : "light") }
    > {theme === "light" ? <FaMoon/>:<IoSunnyOutline/>  }
      </button>

    <ul className="flex">
      {!user && <li className="main-list">
        <NavLink className="main-link" to="/SginIn">
          Sgin In
        </NavLink>
      </li>}

      {!user && <li className="main-list">
        <NavLink className="main-link" to="/SginUp">
          Sgin Up
        </NavLink>
      </li>}
      {user && <li className="main-list">
        <NavLink className="main-link" to="/Basic">
          Basics
        </NavLink>
      </li>}
      {user && <li className="main-list">
        <NavLink className="main-link" to="/Framework">
          Frameworks
        </NavLink>
      </li>}
      {user && <li className="main-list">
        <NavLink className="main-link" to="/Tips">
          Tips
        </NavLink>
      </li>}
      
      {user && <li onClick={() => {
        signOut(auth).then(() => {
  console.log("success sgin out")
  navigate("/SginIn")
}).catch((error) => {
console.log("fuild sgin out")
});
      }
      } className="main-list">
        <button className="main-link signOut" to="/SginIn">
          SginOut
        </button>
      </li>}
    </ul>
  </header>
    </div>
  )
}
