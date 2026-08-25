function Dashboard({
  students = [],
  setActiveSection,
}) {
  /*
    Recent Students Logic:

    - Newly added students get updatedAt in App.jsx
    - Edited students get a new updatedAt in App.jsx
    - Latest activity appears first
    - Only latest 4 students are shown
  */
  const recentStudents = [...students]
    .sort(
      (a, b) =>
        (Number(b.updatedAt) || 0) -
        (Number(a.updatedAt) || 0)
    )
    .slice(0, 4);

  const totalStudents =
    students.length;

  const passedStudents =
    students.filter(
      (student) =>
        student.status === "Pass"
    ).length;

  const failedStudents =
    students.filter(
      (student) =>
        student.status === "Fail"
    ).length;

  const averageMarks =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (total, student) =>
              total +
              Number(student.marks || 0),
            0
          ) / totalStudents
        )
      : 0;

  const excellent =
    students.filter(
      (student) =>
        Number(student.marks) >= 80
    ).length;

  const good =
    students.filter(
      (student) =>
        Number(student.marks) >= 60 &&
        Number(student.marks) < 80
    ).length;

  const average =
    students.filter(
      (student) =>
        Number(student.marks) >= 40 &&
        Number(student.marks) < 60
    ).length;

  const needsImprovement =
    students.filter(
      (student) =>
        Number(student.marks) < 40
    ).length;

  const getPercentage = (count) =>
    totalStudents > 0
      ? Math.round(
          (count / totalStudents) * 100
        )
      : 0;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: "👨‍🎓",
    },
    {
      title: "Passed Students",
      value: passedStudents,
      icon: "✅",
    },
    {
      title: "Failed Students",
      value: failedStudents,
      icon: "❌",
    },
    {
      title: "Average Marks",
      value: `${averageMarks}%`,
      icon: "📊",
    },
  ];

  return (
    <section className="dashboard">

      <div className="page-heading">

        <h2>Dashboard</h2>

        <p>
          Welcome back! Here's your student overview.
        </p>

      </div>

      <div className="stats-grid">

        {stats.map((stat) => (
          <div
            className="stat-card"
            key={stat.title}
          >

            <div className="stat-icon">
              {stat.icon}
            </div>

            <div>

              <p>
                {stat.title}
              </p>

              <h3>
                {stat.value}
              </h3>

            </div>

          </div>
        ))}

      </div>

      <div className="dashboard-grid">

        <div className="recent-card">

          <div className="card-header">

            <h3>
              Recent Students
            </h3>

            <button
              className="view-all-btn"
              onClick={() =>
                setActiveSection(
                  "students"
                )
              }
            >
              View All
            </button>

          </div>

          <div className="student-list">

            {recentStudents.length > 0 ? (
              recentStudents.map(
                (student, index) => (
                  <div
                    className="student-row"
                    key={student.id}
                    onClick={() =>
                      setActiveSection(
                        "students"
                      )
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >

                    <div className="student-number">
                      {index + 1}
                    </div>

                    <div className="student-avatar">
                      {student.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="student-info">

                      <h4>
                        {student.name}
                      </h4>

                      <p>
                        {student.registrationNo ||
                          "No Registration Number"}
                      </p>

                    </div>

                    <span className="student-course">
                      {student.course}
                    </span>

                    <strong className="recent-student-semester">
                      {student.semester ||
                        "1st Semester"}
                    </strong>

                  </div>
                )
              )
            ) : (
              <div className="no-students">
                <p>
                  No students available.
                </p>
              </div>
            )}

          </div>

        </div>

        <div className="performance-card">

          <div className="card-header">

            <h3>
              Performance
            </h3>

          </div>

          <div className="performance-item">

            <div>
              <span>
                Excellent
              </span>

              <strong>
                {getPercentage(
                  excellent
                )}
                %
              </strong>
            </div>

            <div className="progress">

              <div
                className="progress-fill excellent"
                style={{
                  width: `${getPercentage(
                    excellent
                  )}%`,
                }}
              />

            </div>

          </div>

          <div className="performance-item">

            <div>
              <span>
                Good
              </span>

              <strong>
                {getPercentage(
                  good
                )}
                %
              </strong>
            </div>

            <div className="progress">

              <div
                className="progress-fill good"
                style={{
                  width: `${getPercentage(
                    good
                  )}%`,
                }}
              />

            </div>

          </div>

          <div className="performance-item">

            <div>
              <span>
                Average
              </span>

              <strong>
                {getPercentage(
                  average
                )}
                %
              </strong>
            </div>

            <div className="progress">

              <div
                className="progress-fill average"
                style={{
                  width: `${getPercentage(
                    average
                  )}%`,
                }}
              />

            </div>

          </div>

          <div className="performance-item">

            <div>
              <span>
                Needs Improvement
              </span>

              <strong>
                {getPercentage(
                  needsImprovement
                )}
                %
              </strong>
            </div>

            <div className="progress">

              <div
                className="progress-fill improvement"
                style={{
                  width: `${getPercentage(
                    needsImprovement
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;