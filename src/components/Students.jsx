import { useState } from "react";

function Students({
  students = [],
  passingMarks = 40,
  onDeleteStudent,
  onEditStudent,
  setActiveSection,
}) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredStudents = students.filter(
    (student) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        student.name
          ?.toLowerCase()
          .includes(searchText) ||
        student.registrationNo
          ?.toLowerCase()
          .includes(searchText) ||
        student.course
          ?.toLowerCase()
          .includes(searchText) ||
        student.branch
          ?.toLowerCase()
          .includes(searchText) ||
        student.semester
          ?.toLowerCase()
          .includes(searchText);

      const marks = Number(
        student.marks
      );

      const status =
        marks >= Number(passingMarks)
          ? "Pass"
          : "Fail";

      const matchesFilter =
        filter === "All" ||
        status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) {
      return;
    }

    onDeleteStudent(id);
  };

  return (
    <section className="students-page">

      <div className="page-heading">

        <h2>Students</h2>

        <p>
          Manage all students from one place.
        </p>

      </div>

      <div className="students-toolbar">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by name, registration number, course or semester..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="student-actions">

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">
              All Students
            </option>

            <option value="Pass">
              Passed
            </option>

            <option value="Fail">
              Failed
            </option>
          </select>

          <button
            className="add-btn"
            onClick={() =>
              setActiveSection("add")
            }
          >
            + Add Student
          </button>

        </div>

      </div>

      <div className="students-card">

        <div className="table-header">

          <h3>Student List</h3>

          <span>
            {filteredStudents.length} Students
          </span>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Registration Number</th>
                <th>Course</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.map(
                (student, index) => {
                  const marks =
                    Number(student.marks);

                  const status =
                    marks >= Number(
                      passingMarks
                    )
                      ? "Pass"
                      : "Fail";

                  return (
                    <tr
                      key={student.id}
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <div className="student-cell">

                          <div className="table-avatar">
                            {student.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="student-name-box">
                            {student.name}
                          </span>

                        </div>

                      </td>

                      <td>
                        <span className="table-value-box">
                          {student.registrationNo ||
                            "Not Available"}
                        </span>
                      </td>

                      <td>
                        <span className="table-value-box">
                          {student.course ||
                            "Not Available"}
                        </span>
                      </td>

                      <td>
                        <span className="table-value-box">
                          {student.branch ||
                            "—"}
                        </span>
                      </td>

                      <td>
                        <span className="table-value-box">
                          {student.semester ||
                            "1st Semester"}
                        </span>
                      </td>

                      <td>
                        <span className="table-value-box marks-box">
                          {marks}%
                        </span>
                      </td>

                      <td>

                        <span
                          className={`status ${
                            status === "Pass"
                              ? "status-pass"
                              : "status-fail"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              onEditStudent(
                                student
                              )
                            }
                          >
                            ✏️
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                student.id
                              )
                            }
                          >
                            🗑️
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {filteredStudents.length === 0 && (
            <div className="no-students">
              No students found.
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Students;