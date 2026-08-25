import { useState } from "react";

function Results({
  students = [],
  passingMarks = 40,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] =
    useState("All");

  const semesters = [
    ...new Set(
      students
        .map((student) => student.semester)
        .filter(Boolean)
    ),
  ];

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
        student.semester
          ?.toLowerCase()
          .includes(searchText);

      const marks = Number(student.marks);

      const status =
        marks >= Number(passingMarks)
          ? "Pass"
          : "Fail";

      const matchesFilter =
        filter === "All" ||
        status === filter;

      const matchesSemester =
        semesterFilter === "All" ||
        student.semester === semesterFilter;

      return (
        matchesSearch &&
        matchesFilter &&
        matchesSemester
      );
    }
  );

  return (
    <section className="results-page">

      <div className="page-heading">

        <h2>Results</h2>

        <p>
          View student academic results.
          Passing marks: {passingMarks}%
        </p>

      </div>

      <div className="students-toolbar">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="student-actions">

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">
              All Results
            </option>

            <option value="Pass">
              Passed
            </option>

            <option value="Fail">
              Failed
            </option>
          </select>

          {/* Semester Filter */}
          <select
            value={semesterFilter}
            onChange={(e) =>
              setSemesterFilter(e.target.value)
            }
          >
            <option value="All">
              All Semesters
            </option>

            {semesters.map((semester) => (
              <option
                key={semester}
                value={semester}
              >
                {semester}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="students-card">

        <div className="table-header">

          <h3>Student Results</h3>

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
                <th>Semester</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map(
                (student, index) => {
                  const marks =
                    Number(student.marks);

                  const status =
                    marks >= Number(passingMarks)
                      ? "Pass"
                      : "Fail";

                  return (
                    <tr key={student.id}>

                      <td>{index + 1}</td>

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
                          {student.course}
                        </span>
                      </td>

                      <td>
                        <span className="table-value-box">
                          {student.semester ||
                            "Not Available"}
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

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {filteredStudents.length === 0 && (
            <div className="no-students">
              No results found.
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Results;