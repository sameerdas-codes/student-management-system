function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      id: "students",
      icon: "🎓",
      label: "Students",
    },
    {
      id: "add",
      icon: "➕",
      label: "Add Student",
    },
    {
      id: "results",
      icon: "📊",
      label: "Results",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Settings",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>
          <span className="logo-student">Student</span>
          <span className="logo-hub">Hub</span>
        </h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>StudentHub</p>
        <span>Student Management System</span>
      </div>
    </aside>
  );
}

export default Sidebar;
