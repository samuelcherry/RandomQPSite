export default function Login({ setAuthToken }) {
  function handleLogin() {
    const fakeToken = "123abc";
    localStorage.setItem("authToken", fakeToken);
    setAuthToken(fakeToken);
  }
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
