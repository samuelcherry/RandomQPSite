import { useState } from "react";
import supabase from "../../supabaseClient";

export default function Login({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  return (
    <form onSubmit={handleLogin} className="loginContainer">
      <h2>Login</h2>
      <div className="loginFields">
        <div className="fields">
          <label htmlFor="email">Email</label>
          <input type="email" required />
        </div>
        <div className="fields">
          <label htmlFor="Password">Password</label>
          <input type="password" required />
        </div>
      </div>
      <div className="fields">
        <button type="submit">Log In</button>
        <button>Register</button>
      </div>
    </form>
  );
}
