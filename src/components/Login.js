import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, logout } from "../redux/loginSlice";
import Cookies from "js-cookie";

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

  const handleLogout = () => {
    Cookies.remove("auth_token");
    dispatch(logout());
  };

  // Save token to cookies whenever login is successful
  useEffect(() => {
    if (data?.accessToken) {
      // Store token in cookie, expires in 7 days
      Cookies.set("auth_token", data?.accessToken, {
        expires: 7,
        secure: true,
      });
      //   console.log("called", data?.accessToken);
    }
  }, [data]);

  const token = Cookies.get("auth_token");
  console.log("Token", token);

  return (
    <div>
      <h2>Login Page</h2>
      <label>Username: </label>
      <input
        type="text"
        value={username}
        className="form-control"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="btn btn-success btn-sm"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="btn btn-info btn-sm gap-1"
      >
        {loading ? "Logging in..." : "Logout"}
      </button>

      <br />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {isLoggedIn && data && (
        <div>
          <h3>Logged in successfully!</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <code className="whitespace-pre">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
