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
      return { ...DEFAULT_SETTINGS };
    }

    const parsedSettings = JSON.parse(savedSettings);

    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
      passingMarks: Number(
        parsedSettings.passingMarks ??
          DEFAULT_SETTINGS.passingMarks,
      ),
    };
  } catch (error) {
    console.error("Failed to load settings:", error);

    return { ...DEFAULT_SETTINGS };
  }
}

function Settings({
  darkMode,
  setDarkMode,
  setStudents,
  passingMarks,
  setPassingMarks,
  defaultSemester,
  setDefaultSemester,
}) {
  const [settings, setSettings] = useState(() => {
    const savedSettings = getSavedSettings();

    return {
      ...savedSettings,
      passingMarks:
        savedSettings.passingMarks ?? passingMarks ?? 40,
      semester:
        savedSettings.semester ??
        defaultSemester ??
        "6th Semester",
    };
  });

  // Change setting
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save Settings
  const handleSave = () => {
    const updatedSettings = {
      adminName: settings.adminName.trim(),
      email: settings.email.trim(),
      institute: settings.institute.trim(),
      passingMarks: Number(settings.passingMarks),
      semester: settings.semester,
    };

    // Admin name validation
    if (!updatedSettings.adminName) {
      alert("Please enter admin name.");
      return;
    }

    // Email validation
    if (!updatedSettings.email) {
      alert("Please enter email.");
      return;
    }

    if (!updatedSettings.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Institute validation
    if (!updatedSettings.institute) {
      alert("Please enter institute name.");
      return;
    }

    // Passing marks validation
    if (
      Number.isNaN(updatedSettings.passingMarks) ||
      updatedSettings.passingMarks < 0 ||
      updatedSettings.passingMarks > 100
    ) {
      alert("Passing marks must be between 0 and 100.");
      return;
    }

    // Semester validation
    if (!updatedSettings.semester) {
      alert("Please select a default semester.");
      return;
    }

    // Save complete settings
    localStorage.setItem(
      "settings",
      JSON.stringify(updatedSettings),
    );

    // Update local settings state
    setSettings(updatedSettings);

    // Update App.jsx shared passing marks
    if (setPassingMarks) {
      setPassingMarks(updatedSettings.passingMarks);
    }

    // Update App.jsx shared default semester
    if (setDefaultSemester) {
      setDefaultSemester(updatedSettings.semester);
    }

    alert("Settings saved successfully!");
  };

  // Reset Settings
  const handleResetSettings = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all settings?",
    );

    if (!confirmReset) {
      return;
    }

    const resetSettings = {
      ...DEFAULT_SETTINGS,
    };

    // Save reset settings
    localStorage.setItem(
      "settings",
      JSON.stringify(resetSettings),
    );

    // Update local state
    setSettings(resetSettings);

    // Reset shared passing marks
    if (setPassingMarks) {
      setPassingMarks(DEFAULT_SETTINGS.passingMarks);
    }

    // Reset shared default semester
    if (setDefaultSemester) {
      setDefaultSemester(DEFAULT_SETTINGS.semester);
    }

    // Reset dark mode
    setDarkMode(false);
    localStorage.setItem("darkMode", "false");

    alert("Settings reset successfully!");
  };

  // Clear All Students
  const handleClearStudents = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete ALL students? This action cannot be undone.",
    );

    if (!confirmClear) {
      return;
    }

    // Clear React state
    setStudents([]);

    // Clear localStorage
    localStorage.removeItem("students");

    alert("All students have been removed successfully!");
  };

  // Dark Mode
  const handleDarkModeChange = (e) => {
    const value = e.target.checked;

    setDarkMode(value);
    localStorage.setItem("darkMode", String(value));
  };

  return (
    <section className="settings-page">
      {/* Page Heading */}
      <div className="page-heading">
        <h2>Settings</h2>
        <p>Manage your system preferences.</p>
      </div>

      {/* Admin Profile */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Admin Profile</h3>
            <p>Update your basic information.</p>
          </div>
        </div>

        <div className="settings-form">
          {/* Admin Name */}
          <div className="form-group">
            <label htmlFor="adminName">
              Admin Name
            </label>

            <input
              id="adminName"
              type="text"
              value={settings.adminName}
              placeholder="Enter admin name"
              onChange={(e) =>
                handleChange(
                  "adminName",
                  e.target.value,
                )
              }
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="adminEmail">
              Email
            </label>

            <input
              id="adminEmail"
              type="email"
              value={settings.email}
              placeholder="Enter email"
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value,
                )
              }
            />
          </div>

          {/* Institute */}
          <div className="form-group">
            <label htmlFor="institute">
              Institute Name
            </label>

            <input
              id="institute"
              type="text"
              value={settings.institute}
              placeholder="Enter institute name"
              onChange={(e) =>
                handleChange(
                  "institute",
                  e.target.value,
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Academic Settings */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Academic Settings</h3>
            <p>
              Configure student result preferences.
            </p>
          </div>
        </div>

        <div className="settings-form">
          {/* Passing Marks */}
          <div className="form-group">
            <label htmlFor="passingMarks">
              Passing Marks (%)
            </label>

            <input
              id="passingMarks"
              type="number"
              min="0"
              max="100"
              value={settings.passingMarks}
              onChange={(e) =>
                handleChange(
                  "passingMarks",
                  e.target.value,
                )
              }
            />

            <small className="input-hint">
              Students with marks equal to or above
              this value will be marked as Pass.
            </small>
          </div>

          {/* Default Semester */}
          <div className="form-group">
            <label htmlFor="defaultSemester">
              Default Semester
            </label>

            <select
              id="defaultSemester"
              value={settings.semester}
              onChange={(e) =>
                handleChange(
                  "semester",
                  e.target.value,
                )
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

            <small className="input-hint">
              New students will use this semester
              automatically.
            </small>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Appearance</h3>
            <p>
              Customize the application appearance.
            </p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <strong>Dark Mode</strong>
            <p>
              Use dark theme for the dashboard.
            </p>
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

      {/* Data Management */}
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
          {/* Reset Settings */}
          <button
            type="button"
            className="reset-btn"
            onClick={handleResetSettings}
          >
            Reset Settings
          </button>

          {/* Clear Students */}
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearStudents}
          >
            Clear All Students
          </button>
        </div>
      </div>

      {/* Save Settings */}
      <div className="settings-footer">
        <button
          type="button"
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