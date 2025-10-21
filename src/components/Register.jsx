export default function Register() {
  return (
    <>
      <div className="loginFields">
        <label htmlFor="username">Username</label>
        <div>
          <input type="text" required />
        </div>
      </div>
      <div className="loginFields">
        <label htmlFor="email">Email</label>
        <div>
          <input type="text" required />
        </div>
      </div>
      <div className="loginFields">
        <label htmlFor="password">Password</label>
        <div>
          <input type="text" required />
        </div>
      </div>
    </>
  );
}
