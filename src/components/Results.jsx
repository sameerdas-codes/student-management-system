import { useState } from "react";

function Results({ students = [] }) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  // Students data ko Results ke format mein convert kar rahe hain
  const results = students.map((student) => ({
    ...student,
    semester:
      student.semester ||
      (student.course === "B.Tech"
        ? "6th Semester"
        : "4th Semester"),
  }));

  // Grade calculate
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
  };

  // Pass / Fail calculate
  const getStatus = (marks) => {
    return marks >= 40 ? "Pass" : "Fail";
  };

  // Search + Course Filter
  const filteredResults = results.filter((student) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText);

    const matchesCourse =
      courseFilter === "All" ||
      student.course === courseFilter;

    return matchesSearch && matchesCourse;
  });

  // Summary calculations
  const totalStudents = results.length;

  const passedStudents = results.filter(
    (student) => student.marks >= 40
  ).length;

  const failedStudents = results.filter(
    (student) => student.marks < 40
  ).length;

  const averageMarks =
    totalStudents > 0
      ? results.reduce(
          (total, student) => total + Number(student.marks),
          0
        ) / totalStudents
      : 0;

  return (
    <section className="results-page">

      {/* Page Heading */}
      <div className="page-heading">
        <h2>Results</h2>
        <p>View and manage student academic results.</p>
      </div>

      {/* Result Summary */}
      <div className="result-stats">

        {/* Total Students */}
        <div className="result-stat-card">
          <div className="result-stat-icon">👨‍🎓</div>

          <div>
            <p>Total Students</p>
            <h3>{totalStudents}</h3>
          </div>
        </div>

        {/* Passed */}
        <div className="result-stat-card">
          <div className="result-stat-icon">✓</div>

          <div>
            <p>Passed</p>
            <h3>{passedStudents}</h3>
          </div>
        </div>

        {/* Failed */}
        <div className="result-stat-card">
          <div className="result-stat-icon">✕</div>

          <div>
            <p>Failed</p>
            <h3>{failedStudents}</h3>
          </div>
        </div>

        {/* Average */}
        <div className="result-stat-card">
          <div className="result-stat-icon">📊</div>

          <div>
            <p>Average Marks</p>
            <h3>{averageMarks.toFixed(1)}%</h3>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="results-toolbar">

        {/* Search */}
        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Course Filter */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="All">All Courses</option>
          <option value="B.Tech">B.Tech</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="MCA">MCA</option>
        </select>

      </div>

      {/* Results Card */}
      <div className="results-card">

        {/* Table Header */}
        <div className="table-header">
          <h3>Student Results</h3>

          <span>
            {filteredResults.length} Results
          </span>
        </div>

        {/* Table */}
        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredResults.map((student) => {
                const marks = Number(student.marks);
                const grade = getGrade(marks);
                const status = getStatus(marks);

                return (
                  <tr key={student.id}>

                    {/* Student */}
                    <td>
                      <div className="student-cell">

                        <div className="table-avatar">
                          {student.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {student.name}
                        </strong>

                      </div>
                    </td>

                    {/* ID */}
                    <td>{student.id}</td>

                    {/* Course */}
                    <td>{student.course}</td>

                    {/* Semester */}
                    <td>{student.semester}</td>

                    {/* Marks */}
                    <td>
                      <strong>
                        {marks}%
                      </strong>
                    </td>

                    {/* Grade */}
                    <td>
                      <span className="grade-badge">
                        {grade}
                      </span>
                    </td>

                    {/* Status */}
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
              })}

            </tbody>

          </table>

          {/* No Results */}
          {filteredResults.length === 0 && (
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