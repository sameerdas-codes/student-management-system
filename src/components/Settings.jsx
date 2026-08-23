import { useState } from "react";

const DEFAULT_SETTINGS = {
  adminName: "Admin",
  email: "admin@example.com",
  institute: "Student Management System",
  passingMarks: 40,
  semester: "6th Semester",
};

function getSavedSettings() {
  try {
    const savedSettings = localStorage.getItem("settings");

    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    const parsedSettings = JSON.parse(savedSettings);

    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
    };
  } catch (error) {
    console.error("Failed to load settings:", error);
    return DEFAULT_SETTINGS;
  }
}

function Settings({ darkMode, setDarkMode }) {
  const [settings, setSettings] = useState(getSavedSettings);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updatedSettings = {
      adminName: settings.adminName.trim(),
      email: settings.email.trim(),
      institute: settings.institute.trim(),
      passingMarks: Number(settings.passingMarks),
      semester: settings.semester,
    };

    if (!updatedSettings.adminName) {
      alert("Please enter admin name.");
      return;
    }

    if (!updatedSettings.email) {
      alert("Please enter email.");
      return;
    }

    if (!updatedSettings.institute) {
      alert("Please enter institute name.");
      return;
    }

    if (!updatedSettings.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (
      Number.isNaN(updatedSettings.passingMarks) ||
      updatedSettings.passingMarks < 0 ||
      updatedSettings.passingMarks > 100
    ) {
      alert("Passing marks must be between 0 and 100.");
      return;
    }

    localStorage.setItem(
      "settings",
      JSON.stringify(updatedSettings)
    );

    setSettings(updatedSettings);

    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (!confirmReset) {
      return;
    }

    localStorage.setItem(
      "settings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSettings(DEFAULT_SETTINGS);

    setDarkMode(false);
    localStorage.setItem("darkMode", "false");

    alert("Settings reset successfully!");
  };

  const handleClearStudents = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all students?"
    );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem("students");

    alert("All students have been removed.");
  };

  const handleDarkModeChange = (e) => {
    const value = e.target.checked;

    setDarkMode(value);
    localStorage.setItem("darkMode", String(value));
  };

  return (
    <section className="settings-page">
      <div className="page-heading">
        <h2>Settings</h2>
        <p>Manage your system preferences.</p>
      </div>

      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Admin Profile</h3>
            <p>Update your basic information.</p>
          </div>
        </div>

        <div className="settings-form">
          <div className="form-group">
            <label>Admin Name</label>

            <input
              type="text"
              value={settings.adminName}
              placeholder="Enter admin name"
              onChange={(e) =>
                handleChange("adminName", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={settings.email}
              placeholder="Enter email"
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Institute Name</label>

            <input
              type="text"
              value={settings.institute}
              placeholder="Enter institute name"
              onChange={(e) =>
                handleChange("institute", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Academic Settings</h3>
            <p>Configure student result preferences.</p>
          </div>
        </div>

        <div className="settings-form">
          <div className="form-group">
            <label>Passing Marks (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              value={settings.passingMarks}
              onChange={(e) =>
                handleChange(
                  "passingMarks",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Default Semester</label>

            <select
              value={settings.semester}
              onChange={(e) =>
                handleChange("semester", e.target.value)
              }
            >
              <option value="1st Semester">
                1st Semester
              </option>

              <option value="2nd Semester">
                2nd Semester
              </option>

              <option value="3rd Semester">
                3rd Semester
              </option>

              <option value="4th Semester">
                4th Semester
              </option>

              <option value="5th Semester">
                5th Semester
              </option>

              <option value="6th Semester">
                6th Semester
              </option>

              <option value="7th Semester">
                7th Semester
              </option>

              <option value="8th Semester">
                8th Semester
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Appearance</h3>
            <p>Customize the application appearance.</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <strong>Dark Mode</strong>
            <p>Use dark theme for the dashboard.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />

            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-card danger-card">
        <div className="settings-card-header">
          <div>
            <h3>Data Management</h3>

            <p>
              Manage your locally stored student data.
            </p>
          </div>
        </div>

        <div className="data-actions">
          <button
            className="reset-btn"
            onClick={handleResetSettings}
          >
            Reset Settings
          </button>

          <button
            className="clear-btn"
            onClick={handleClearStudents}
          >
            Clear All Students
          </button>
        </div>
      </div>

      <div className="settings-footer">
        <button
          className="save-settings-btn"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </section>
  );
}

export default Settings;