import axios from "axios";
import { useState } from "react";
import './Login.css';

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1 className="header">Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form className="form" onSubmit={handleSubmit}>
        <div className="text">
          Name: <input className="input" name="name" type="text" />
        </div>
        <div className="text">
          Email: <input className="input" name="email" type="email" />
        </div>
        <div className="text">
          Password: <input className="input" name="password" type="password" />
        </div>
        <div className="text">
          Password confirmation: <input className="input" name="password_confirmation" type="password" />
        </div>
        <button className="button" type="submit">Signup</button>
      </form>
    </div>
  );
}