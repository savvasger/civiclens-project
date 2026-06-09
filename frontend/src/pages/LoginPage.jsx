import { useState } from "react";
// import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
  event.preventDefault();
  if (!email || !password) {
  alert("Email and password are required");
  return;
}

   try {
    const response = await fetch(
      "/auth/login",
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

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    alert("Login successful!");

    navigate("/");
  } catch (err) {
    console.error(err);
  }
}
  return (
    <div>
    <h1>Login</h1>

    <form  onSubmit={handleSubmit}>
      
      <div >
        <label>Email</label>
        <input className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div >
        <label>Password</label>
        <input className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      

      <button  className="login-button" type="submit">
        Login
      </button>
    </form>
    <p>
  Don't have an account?{" "}
  <Link to="/register">
    Register here
  </Link>
</p>
  </div>
);
}

export default LoginPage;