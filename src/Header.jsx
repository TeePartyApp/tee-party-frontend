import { LogoutLink } from "./Authentication/LogoutLink"
import { MatchesIndex } from "./Matches/MatchesIndex";
import './Header.css';



export function Header() {
  const logo = '/Images/logo.jpeg';
  const headerDivider = '/Images/header-divider.png';

  let loggedInStatus;

  if (localStorage.jwt) {
    console.log("I am logged in");
    loggedInStatus = (
      <>
        <a href="/">Home</a> <img src={headerDivider} className="header-dividers" /> <a href="/matches">Matches</a> <img src={headerDivider} className="header-dividers" /> <a href="/edit_profile">Edit profile</a> <img src={headerDivider} className="header-dividers" /><LogoutLink />
      </>
    )
  } else {
    console.log("I am logged out");
    loggedInStatus = (
      <>
        <a href="/signup">Signup</a><img src={headerDivider} className="header-dividers" /><a href="/login">Login</a> 
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