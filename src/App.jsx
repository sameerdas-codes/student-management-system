import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import Results from "./components/Results";
import Settings from "./components/Settings";
import EditStudent from "./components/EditStudent";

import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingStudent, setEditingStudent] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      try {
        return JSON.parse(savedStudents);
      } catch {
        return [];
      }
    }

    return [
      {
        id: "ST001",
        name: "Rahul Kumar",
        course: "B.Tech",
        marks: 85,
        status: "Pass",
      },
      {
        id: "ST002",
        name: "Priya Das",
        course: "B.Tech",
        marks: 91,
        status: "Pass",
      },
      {
        id: "ST003",
        name: "Aman Singh",
        course: "BCA",
        marks: 72,
        status: "Pass",
      },
      {
        id: "ST004",
        name: "Sneha Patel",
        course: "BCA",
        marks: 88,
        status: "Pass",
      },
      {
        id: "ST005",
        name: "Rohit Sharma",
        course: "BCA",
        marks: 38,
        status: "Fail",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const handleAddStudent = (studentData) => {
    const marks = Number(studentData.marks);

    setStudents((prevStudents) => {
      const newStudent = {
        id: `ST${String(prevStudents.length + 1).padStart(3, "0")}`,
        name: studentData.name.trim(),
        course: studentData.course,
        marks: marks,
        status: marks >= 40 ? "Pass" : "Fail",
      };

      return [...prevStudents, newStudent];
    });

    setActiveSection("students");
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => {
      const remainingStudents = prevStudents.filter(
        (student) => student.id !== id
      );

      return remainingStudents.map((student, index) => ({
        ...student,
        id: `ST${String(index + 1).padStart(3, "0")}`,
      }));
    });
  };

  const handleUpdateStudent = (updatedStudent) => {
    const marks = Number(updatedStudent.marks);

    const studentWithUpdatedStatus = {
      ...updatedStudent,
      marks: marks,
      status: marks >= 40 ? "Pass" : "Fail",
    };

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentWithUpdatedStatus.id
          ? studentWithUpdatedStatus
          : student
      )
    );

    setEditingStudent(null);
    setActiveSection("students");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            students={students}
            setActiveSection={setActiveSection}
          />
        );

      case "students":
        return (
          <Students
            students={students}
            onDeleteStudent={handleDeleteStudent}
            onEditStudent={(student) => {
              setEditingStudent(student);
              setActiveSection("edit");
            }}
            setActiveSection={setActiveSection}
          />
        );

      case "add":
        return (
          <AddStudent
            onAddStudent={handleAddStudent}
            setActiveSection={setActiveSection}
          />
        );

      case "edit":
        return (
          <EditStudent
            student={editingStudent}
            onUpdateStudent={handleUpdateStudent}
            setActiveSection={setActiveSection}
          />
        );

      case "results":
        return <Results students={students} />;

      case "settings":
        return (
          <Settings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );

      default:
        return (
          <Dashboard
            students={students}
            setActiveSection={setActiveSection}
          />
        );
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="main-area">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main
          className={`content ${
            activeSection === "dashboard"
              ? "dashboard-content"
              : ""
          }`}
        >
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;