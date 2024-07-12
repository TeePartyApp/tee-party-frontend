import { Signup } from "./Authentication/Signup"

export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <a href="/signup">Signup</a> | <a href="#">Messages</a>
      </nav>
    </header>
  )
}