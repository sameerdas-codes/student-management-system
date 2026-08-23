import { useState } from "react";

function AddStudent({ onAddStudent, setActiveSection }) {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    marks: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const course = formData.course;
    const marks = Number(formData.marks);

    if (!name || !course || formData.marks === "") {
      setError("Please fill all fields.");
      return;
    }

    if (marks < 0 || marks > 100) {
      setError("Marks must be between 0 and 100.");
      return;
    }

    onAddStudent({
      name,
      course,
      marks,
    });
  };

  return (
    <section className="add-student-page">

      <div className="add-page-header">
        <div>
          <div className="breadcrumb">
            Students <span>/</span> Add Student
          </div>

          <h2>Add Student</h2>
          <p>
            Create a new student profile and add their academic details.
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => setActiveSection("students")}
        >
          ← Back to Students
        </button>
      </div>

      <div className="add-student-layout">

        {/* Left Info Card */}
        <div className="student-info-card">

          <div className="info-icon">
            👨‍🎓
          </div>

          <h3>Student Profile</h3>

          <p>
            Add accurate student information to keep your student records
            organized.
          </p>

          <div className="info-list">

            <div className="info-item">
              <span>✓</span>
              <div>
                <strong>Student Details</strong>
                <small>Basic student information</small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>
              <div>
                <strong>Course Information</strong>
                <small>Select the student's course</small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>
              <div>
                <strong>Academic Performance</strong>
                <small>Enter marks from 0 to 100</small>
              </div>
            </div>

          </div>
        </div>

        {/* Form */}
        <div className="add-student-card">

          <div className="add-student-header">
            <div>
              <h3>Student Information</h3>
              <p>Enter the student's details below.</p>
            </div>

            <div className="form-badge">
              New Student
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">
                  Student Name
                </label>

                <div className="input-wrapper">
                  <span>👤</span>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">
                  Course
                </label>

                <div className="input-wrapper">
                  <span>🎓</span>

                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select course
                    </option>

                    <option value="B.Tech">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="form-group marks-group">
              <label htmlFor="marks">
                Marks
                <span>(Percentage)</span>
              </label>

              <div className="marks-input-wrapper">
                <input
                  id="marks"
                  name="marks"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter marks"
                  value={formData.marks}
                  onChange={handleChange}
                />

                <span>%</span>
              </div>

              <small className="input-hint">
                Enter a value between 0 and 100.
              </small>
            </div>

            {error && (
              <div className="form-error">
                <span>⚠</span>
                {error}
              </div>
            )}

            <div className="form-divider"></div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setActiveSection("students")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                <span>+</span>
                Add Student
              </button>

            </div>

          </form>
        </div>
      </div>

    </section>
  );
}

export default AddStudent;