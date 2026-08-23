function Navbar({ darkMode, setDarkMode }) {
  const handleThemeToggle = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  return (
    <header className="navbar">
      <div>
        <h1>Student Management System</h1>
        <p>Manage your students efficiently</p>
      </div>

      <button
        type="button"
        className="theme-btn"
        onClick={handleThemeToggle}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Navbar;