import { useState } from "react";

function Students({
  students,
  onDeleteStudent,
  onEditStudent,
  setActiveSection,
})  {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || student.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    onDeleteStudent(id);
  };

  return (
    <section className="students-page">

      {/* Page Heading */}
      <div className="page-heading">
        <h2>Students</h2>
        <p>Manage all students from one place.</p>
      </div>

      {/* Toolbar */}
      <div className="students-toolbar">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="student-actions">

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Students</option>
            <option value="Pass">Passed</option>
            <option value="Fail">Failed</option>
          </select>

          {/* Add Student → Add Student Page */}
          <button
            className="add-btn"
            onClick={() => setActiveSection("add")}
          >
            + Add Student
          </button>

        </div>
      </div>

      {/* Student Card */}
      <div className="students-card">

        <div className="table-header">
          <h3>Student List</h3>
          <span>{filteredStudents.length} Students</span>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Course</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (
                <tr key={student.id}>

                  {/* Student Name */}
                  <td>
                    <div className="student-cell">

                      <div className="table-avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="student-name-box">
                        {student.name}
                      </span>

                    </div>
                  </td>

                  {/* ID */}
                  <td>
                    <span className="table-value-box">
                      {student.id}
                    </span>
                  </td>

                  {/* Course */}
                  <td>
                    <span className="table-value-box">
                      {student.course}
                    </span>
                  </td>

                  {/* Marks */}
                  <td>
                    <span className="table-value-box marks-box">
                      {student.marks}%
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`status ${
                        student.status === "Pass"
                          ? "status-pass"
                          : "status-fail"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          onEditStudent(student)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(student.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

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