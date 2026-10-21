import React from "react";

const ThemeContext = React.createContext("light");

export default function UseContext() {
  const theme = React.useContext(ThemeContext);
  return (
    <div>
      <h1>Current Theme: {theme}</h1>
    </div>
  );
}
