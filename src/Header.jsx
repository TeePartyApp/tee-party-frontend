import { LogoutLink } from "./Authentication/LogoutLink"

export function Header() {
  const logo = '/Images/logo.jpeg';

  let loggedInStatus;

  if (localStorage.jwt) {
    console.log("I am logged in")
    loggedInStatus = (
      <>
        <LogoutLink /> | <a href="/matches">Matches</a> | <a href="/edit_profile">Edit profile</a>
      </>
    )
  } else {
    console.log("I am logged out")
    loggedInStatus = (
      <>
        <a href="/signup">Signup</a> | <a href="/login">Login</a> 
      </>
    )
  }
  
  return (
    <header>
      <nav>
        <img src={logo} alt="My Image" style={{ width: '50px', height: 'auto' }} /> 
        <a href="/">Home</a> | {loggedInStatus}
      </nav>
    </header>
  )
}