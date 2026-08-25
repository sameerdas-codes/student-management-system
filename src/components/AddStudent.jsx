import { useState } from "react";

const COURSE_BRANCHES = {
  "B.Tech": [
    "Computer Science & Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ],
};

function AddStudent({
  onAddStudent,
  setActiveSection,
  students = [],
  defaultSemester = "1st Semester",
}) {
  const [formData, setFormData] = useState({
    registrationNo: "",
    name: "",
    course: "",
    branch: "",
    marks: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course") {
      setFormData((prev) => ({
        ...prev,
        course: value,
        branch: "",
      }));

      setError("");
      return;
    }

    if (name === "branch") {
      setFormData((prev) => ({
        ...prev,
        branch: value,
      }));

      setError("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationNo =
      formData.registrationNo.trim();

    const name =
      formData.name.trim();

    const course =
      formData.course;

    const branch =
      formData.branch;

    const marks =
      Number(formData.marks);

    if (
      !registrationNo ||
      !name ||
      !course ||
      formData.marks === ""
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const hasBranches =
      (COURSE_BRANCHES[course] || []).length > 0;

    if (hasBranches && !branch) {
      setError("Please select a branch.");
      return;
    }

    const registrationExists =
      students.some(
        (student) =>
          student.registrationNo?.toLowerCase() ===
          registrationNo.toLowerCase()
      );

    if (registrationExists) {
      setError(
        "This registration number already exists. Please enter a different one."
      );
      return;
    }

    if (
      Number.isNaN(marks) ||
      marks < 0 ||
      marks > 100
    ) {
      setError(
        "Marks must be between 0 and 100."
      );
      return;
    }

    onAddStudent({
      registrationNo,
      name,
      course,
      branch,
      semester:
        defaultSemester || "1st Semester",
      marks,
    });
  };

  const branchOptions =
    COURSE_BRANCHES[formData.course] || [];

  return (
    <section className="add-student-page">

      <div className="add-page-header">
        <div>
          <div className="breadcrumb">
            Students <span>/</span> Add Student
          </div>

          <h2>Add Student</h2>

          <p>
            Create a new student profile and add
            their academic details.
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() =>
            setActiveSection("students")
          }
        >
          ← Back to Students
        </button>
      </div>

      <div className="add-student-layout">

        <div className="student-info-card">

          <div className="info-icon">
            👨‍🎓
          </div>

          <h3>Student Profile</h3>

          <p>
            Add accurate student information to keep
            your student records organized.
          </p>

          <div className="info-list">

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Registration Number
                </strong>

                <small>
                  Enter the student's unique
                  registration number
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Student Details
                </strong>

                <small>
                  Basic student information
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Course & Branch
                </strong>

                <small>
                  Select course and branch
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Starting Semester
                </strong>

                <small>
                  New students start from 1st Semester
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Academic Performance
                </strong>

                <small>
                  Enter marks from 0 to 100
                </small>
              </div>
            </div>

          </div>
        </div>

        <div className="add-student-card">

          <div className="add-student-header">

            <div>
              <h3>
                Student Information
              </h3>

              <p>
                Enter the student's details below.
              </p>
            </div>

            <div className="form-badge">
              New Student
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="registrationNo">
                Registration Number
              </label>

              <div className="input-wrapper">

                <span>🆔</span>

                <input
                  id="registrationNo"
                  name="registrationNo"
                  type="text"
                  placeholder="Enter registration number"
                  value={
                    formData.registrationNo
                  }
                  onChange={handleChange}
                  autoComplete="off"
                />

              </div>

              <small className="input-hint">
                This number is manually assigned
                to the student.
              </small>

            </div>

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
                    autoComplete="off"
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

            <div className="form-group">

              <label htmlFor="branch">
                Branch
              </label>

              <div className="input-wrapper">

                <span>🏫</span>

                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  disabled={
                    !formData.course ||
                    branchOptions.length === 0
                  }
                >

                  {!formData.course && (
                    <option value="">
                      Select course first
                    </option>
                  )}

                  {formData.course &&
                    branchOptions.length === 0 && (
                      <option value="">
                        No branch available
                      </option>
                    )}

                  {branchOptions.map((branch) => (
                    <option
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </option>
                  ))}

                </select>

              </div>

              <small className="input-hint">
                {branchOptions.length > 0
                  ? "Select the student's branch."
                  : formData.course
                  ? "This course does not require a branch."
                  : "Select a course to view branches."}
              </small>

            </div>

            <div className="form-group">

              <label>
                Starting Semester
              </label>

              <div className="input-wrapper">

                <span>📚</span>

                <input
                  type="text"
                  value="1st Semester"
                  readOnly
                  disabled
                />

              </div>

              <small className="input-hint">
                New students automatically start from
                1st Semester. You can change the semester
                later from Edit Student.
              </small>

            </div>

            <div className="form-group marks-group">

              <label htmlFor="marks">
                Marks <span>(Percentage)</span>
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
                onClick={() =>
                  setActiveSection("students")
                }
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