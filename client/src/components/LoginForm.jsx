import { useState } from "react";
import FormRow from "./FormRow";
import "../css/Login.css";
import { Form } from "react-router-dom";

const LoginForm = ({ selectOption }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Perform your login logic here (e.g., send a request to the server for authentication)
  //     alert(`Logged in with Email: ${email}, Password: ${password}`);
  //   };
  let choice = true;

  if(selectOption == "phone") choice = false;

  return (
    <form>
      <div>
        {choice ? }
        <FormRow/>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
