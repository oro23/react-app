export default function Button({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}
