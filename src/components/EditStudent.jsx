import { useState } from "react";

function EditStudent({
  student,
  onUpdateStudent,
  setActiveSection,
}) {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    course: student?.course || "",
    marks: student?.marks ?? "",
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

    onUpdateStudent({
      id: student.id,
      name,
      course,
      marks,
      status: marks >= 40 ? "Pass" : "Fail",
    });

    setActiveSection("students");
  };

  if (!student) {
    return (
      <section className="add-student-page">
        <div className="page-heading">
          <h2>Student Not Found</h2>
          <p>The selected student could not be found.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => setActiveSection("students")}
        >
          ← Back to Students
        </button>
      </section>
    );
  }

  return (
    <section className="add-student-page">

      {/* Header */}
      <div className="add-page-header">
        <div>
          <div className="breadcrumb">
            Students <span>/</span> Edit Student
          </div>

          <h2>Edit Student</h2>

          <p>
            Update the student's academic and personal information.
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
            ✏️
          </div>

          <h3>Edit Student Profile</h3>

          <p>
            Update the student's information. Changes will also appear
            on the Results page.
          </p>

          <div className="info-list">

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Student ID</strong>
                <small>{student.id}</small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Course Information</strong>
                <small>Update the student's course</small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Academic Performance</strong>
                <small>Update marks from 0 to 100</small>
              </div>
            </div>

          </div>
        </div>

        {/* Edit Form */}
        <div className="add-student-card">

          <div className="add-student-header">

            <div>
              <h3>Student Information</h3>
              <p>Update the student's details below.</p>
            </div>

            <div className="form-badge">
              Edit Student
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Name + Course */}
            <div className="form-row">

              <div className="form-group">

                <label htmlFor="edit-name">
                  Student Name
                </label>

                <div className="input-wrapper">

                  <span>👤</span>

                  <input
                    id="edit-name"
                    name="name"
                    type="text"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="form-group">

                <label htmlFor="edit-course">
                  Course
                </label>

                <div className="input-wrapper">

                  <span>🎓</span>

                  <select
                    id="edit-course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select course
                    </option>

                    <option value="B.Tech">
                      B.Tech
                    </option>

                    <option value="BCA">
                      BCA
                    </option>

                    <option value="BBA">
                      BBA
                    </option>

                    <option value="MCA">
                      MCA
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* Marks */}
            <div className="form-group marks-group">

              <label htmlFor="edit-marks">
                Marks <span>(Percentage)</span>
              </label>

              <div className="marks-input-wrapper">

                <input
                  id="edit-marks"
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

            {/* Error */}
            {error && (
              <div className="form-error">
                <span>⚠</span>
                {error}
              </div>
            )}

            <div className="form-divider"></div>

            {/* Actions */}
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
                ✓ Save Changes
              </button>

            </div>

          </form>
        </div>

      </div>

    </section>
  );
}

export default EditStudent;