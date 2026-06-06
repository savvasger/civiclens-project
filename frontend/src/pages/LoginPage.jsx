import { useState } from "react";
// import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    localStorage.setItem("token", data.token);
    console.log("Token Saved!")
    navigate("/");

    alert("Login successful!");
  } catch (err) {
    console.error(err);
  }
}

  return (
    <div>
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  </div>
);
}

export default LoginPage;