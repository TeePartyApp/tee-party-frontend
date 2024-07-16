import { LogoutLink } from "./Authentication/LogoutLink"
import './Header.css';


export function Header() {
  const logo = '/Images/logo.jpeg';

  let loggedInStatus;

  if (localStorage.jwt) {
    console.log("I am logged in")
    loggedInStatus = (
      <>
        <a href="/">Home</a> | <LogoutLink /> | <a href="/matches">Matches</a> | <a href="/edit_profile">Edit profile</a>
      </>
    )
  } else {
    console.log("I am logged out")
    loggedInStatus = (
      <>
        <a href="/">Home</a> | <a href="/signup">Signup</a> | <a href="/login">Login</a> 
      </>
    )
  }
  
  return (
    <header>
      <nav>
        <div className="header-container">
          <img src={logo} alt="My Image" className="logo" />  
          <span className="nav-links">{loggedInStatus}</span>
        </div>
      </nav>
    </header>
  )
}