function Dashboard({ students, setActiveSection }) {
  // Latest 5 students
  const recentStudents = [...students].reverse().slice(0, 4);

  // Dynamic statistics
  const totalStudents = students.length;

  const passedStudents = students.filter(
    (student) => student.status === "Pass",
  ).length;

  const failedStudents = students.filter(
    (student) => student.status === "Fail",
  ).length;

  const averageMarks =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (total, student) => total + Number(student.marks),
            0,
          ) / totalStudents,
        )
      : 0;

  // Performance distribution
  const excellent = students.filter(
    (student) => Number(student.marks) >= 80,
  ).length;

  const good = students.filter(
    (student) => Number(student.marks) >= 60 && Number(student.marks) < 80,
  ).length;

  const average = students.filter(
    (student) => Number(student.marks) >= 40 && Number(student.marks) < 60,
  ).length;

  const needsImprovement = students.filter(
    (student) => Number(student.marks) < 40,
  ).length;

  const getPercentage = (count) =>
    totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;

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
      {/* Page Heading */}
      <div className="page-heading">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's your student overview.</p>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-icon">{stat.icon}</div>

            <div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Bottom */}
      <div className="dashboard-grid">
        {/* Recent Students */}
        <div className="recent-card">
          <div className="card-header">
            <h3>Recent Students</h3>

            <button
              className="view-all-btn"
              onClick={() => setActiveSection("students")}
            >
              View All
            </button>
          </div>

          <div className="student-list">
            {recentStudents.length > 0 ? (
              recentStudents.map((student) => (
                <div
                  className="student-row"
                  key={student.id}
                  onClick={() => setActiveSection("students")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="student-avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="student-info">
                    <h4>{student.name}</h4>
                    <p>{student.course}</p>
                  </div>

                  <strong>{student.marks}%</strong>
                </div>
              ))
            ) : (
              <p>No students available.</p>
            )}
          </div>
        </div>

        {/* Performance */}
        <div className="performance-card">
          <div className="card-header">
            <h3>Performance</h3>
          </div>

          <div className="performance-item">
            <div>
              <span>Excellent</span>
              <strong>{getPercentage(excellent)}%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill excellent"
                style={{ width: `${getPercentage(excellent)}%` }}
              ></div>
            </div>
          </div>

          <div className="performance-item">
            <div>
              <span>Good</span>
              <strong>{getPercentage(good)}%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill good"
                style={{ width: `${getPercentage(good)}%` }}
              ></div>
            </div>
          </div>

          <div className="performance-item">
            <div>
              <span>Average</span>
              <strong>{getPercentage(average)}%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill average"
                style={{ width: `${getPercentage(average)}%` }}
              ></div>
            </div>
          </div>

          <div className="performance-item">
            <div>
              <span>Needs Improvement</span>
              <strong>{getPercentage(needsImprovement)}%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill improvement"
                style={{ width: `${getPercentage(needsImprovement)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
