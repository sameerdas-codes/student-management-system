import { useState } from "react";

const COURSE_SEMESTERS = {
  "B.Tech": 8,
  BCA: 6,
  BBA: 6,
  MCA: 4,
};

function getSemesterOptions(course) {
  const semesterCount =
    COURSE_SEMESTERS[course] || 0;

  return Array.from(
    { length: semesterCount },
    (_, index) => {
      const number = index + 1;

      let suffix = "th";

      if (number === 1) {
        suffix = "st";
      } else if (number === 2) {
        suffix = "nd";
      } else if (number === 3) {
        suffix = "rd";
      }

      return `${number}${suffix} Semester`;
    },
  );
}

function EditStudent({
  student,
  onUpdateStudent,
  setActiveSection,
  defaultSemester = "1st Semester",
}) {
  const [formData, setFormData] = useState({
    registrationNo:
      student?.registrationNo || "",
    name: student?.name || "",
    course: student?.course || "",
    semester:
      student?.semester || defaultSemester,
    marks: student?.marks ?? "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course") {
      const semesterOptions =
        getSemesterOptions(value);

      let newSemester = "";

      if (semesterOptions.length > 0) {
        if (
          semesterOptions.includes(
            formData.semester,
          )
        ) {
          newSemester = formData.semester;
        } else if (
          semesterOptions.includes(
            defaultSemester,
          )
        ) {
          newSemester = defaultSemester;
        } else {
          newSemester = semesterOptions[0];
        }
      }

      setFormData((prev) => ({
        ...prev,
        course: value,
        semester: newSemester,
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

    const course = formData.course;
    const semester = formData.semester;
    const marks = Number(formData.marks);

    if (
      !course ||
      !semester ||
      formData.marks === ""
    ) {
      setError(
        "Please fill all editable fields.",
      );
      return;
    }

    if (
      Number.isNaN(marks) ||
      marks < 0 ||
      marks > 100
    ) {
      setError(
        "Marks must be between 0 and 100.",
      );
      return;
    }

    onUpdateStudent({
      id: student.id,
      registrationNo:
        student.registrationNo,
      name: student.name,
      course,
      semester,
      marks,
    });
  };

  if (!student) {
    return (
      <section className="add-student-page">
        <div className="page-heading">
          <h2>Student Not Found</h2>

          <p>
            The selected student could not be
            found.
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
      </section>
    );
  }

  const semesterOptions =
    getSemesterOptions(formData.course);

  return (
    <section className="add-student-page">
      <div className="add-page-header">
        <div>
          <div className="breadcrumb">
            Students <span>/</span> Edit Student
          </div>

          <h2>Edit Student</h2>

          <p>
            Update the student's academic
            information.
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
            ✏️
          </div>

          <h3>Edit Student Profile</h3>

          <p>
            Personal identity details are
            protected. You can update the
            student's academic information.
          </p>

          <div className="info-list">
            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Registration Number
                </strong>

                <small>
                  Registration number cannot be
                  changed
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Student Name
                </strong>

                <small>
                  Student name cannot be changed
                </small>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>
                  Course & Semester
                </strong>

                <small>
                  Update the student's current
                  academic details
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
                  Update marks from 0 to 100
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
                Update the editable details
                below.
              </p>
            </div>

            <div className="form-badge">
              Edit Student
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="edit-registrationNo">
                Registration Number
              </label>

              <div className="input-wrapper">
                <span>🆔</span>

                <input
                  id="edit-registrationNo"
                  name="registrationNo"
                  type="text"
                  value={
                    formData.registrationNo
                  }
                  readOnly
                  disabled
                />
              </div>

              <small className="input-hint">
                Registration number cannot be
                changed.
              </small>
            </div>

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
                  value={formData.name}
                  readOnly
                  disabled
                />
              </div>

              <small className="input-hint">
                Student name cannot be changed.
              </small>
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

            <div className="form-group">
              <label htmlFor="edit-semester">
                Semester
              </label>

              <div className="input-wrapper">
                <span>📚</span>

                <select
                  id="edit-semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  disabled={!formData.course}
                >
                  {!formData.course && (
                    <option value="">
                      Select course first
                    </option>
                  )}

                  {semesterOptions.map(
                    (semester) => (
                      <option
                        key={semester}
                        value={semester}
                      >
                        {semester}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <small className="input-hint">
                {formData.course
                  ? `${formData.course} has ${semesterOptions.length} semesters.`
                  : "Select a course to view available semesters."}
              </small>
            </div>

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