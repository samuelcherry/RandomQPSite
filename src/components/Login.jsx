import { useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login error", error.message);
      setError(error.message);
      return;
    }

    if (data?.session?.access_token) {
      const token = data.session.access_token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    }
  }

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <form onSubmit={handleLogin} className="loginContainer">
      <h2>Login</h2>

      <div className="loginFields">
        <div className="fields">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="fields">
        <button type="submit">Log In</button>
        {/* <button type="button" onClick={handleRegister}>
          Register
        </button> */}
      </div>
    </form>
  );
}
