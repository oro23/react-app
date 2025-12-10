import React from "react";
import Button from "./Button";

export default function Panel({ theme, toggleTheme }) {
  return (
    <div>
      <h1>Welcome to the Panel</h1>
      <Button theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
