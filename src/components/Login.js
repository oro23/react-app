import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../redux/loginSlice";

export default function Login() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const { loading, error, data, isLoggedIn } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(getLogin({ username, password }));
  };

  return (
    <div>
      <h2>Login Page</h2>
      <label>Username: </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <br />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {isLoggedIn && data && (
        <div>
          <h3>Logged in successfully!</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
