import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import Results from "./components/Results";
import Settings from "./components/Settings";

import "./App.css";

const DEFAULT_SETTINGS = {
  adminName: "Admin",
  email: "admin@example.com",
  institute: "Student Management System",
  passingMarks: 40,
  semester: "1st Semester",
};

function getSavedSettings() {
  try {
    const saved = localStorage.getItem("settings");

    if (!saved) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      passingMarks:
        Number(parsed.passingMarks) || DEFAULT_SETTINGS.passingMarks,
      semester:
        parsed.semester || DEFAULT_SETTINGS.semester,
    };
  } catch (error) {
    console.error("Failed to load settings:", error);

    return { ...DEFAULT_SETTINGS };
  }
}

function getSavedStudents() {
  try {
    const saved = localStorage.getItem("students");
    const savedSettings = getSavedSettings();

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const migratedStudents = parsed.map((student) => ({
      ...student,
      semester:
        student.semester ||
        savedSettings.semester ||
        DEFAULT_SETTINGS.semester,
      marks: Number(student.marks) || 0,
    }));

    localStorage.setItem(
      "students",
      JSON.stringify(migratedStudents)
    );

    return migratedStudents;
  } catch (error) {
    console.error("Failed to load students:", error);

    return [];
  }
}

function App() {
  const savedSettings = getSavedSettings();

  const [students, setStudents] = useState(getSavedStudents);

  const [passingMarks, setPassingMarks] = useState(
    Number(savedSettings.passingMarks) || 40
  );

  const [defaultSemester, setDefaultSemester] = useState(
    savedSettings.semester || "1st Semester"
  );

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [activeSection, setActiveSection] = useState("dashboard");

  const [editingStudent, setEditingStudent] = useState(null);

  const saveStudents = (updatedStudents) => {
    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };

  const handleAddStudent = (studentData) => {
    const marks = Number(studentData.marks);

    const newStudent = {
      id: Date.now().toString(),
      registrationNo: studentData.registrationNo.trim(),
      name: studentData.name.trim(),
      course: studentData.course,
      semester: defaultSemester,
      marks,
      status:
        marks >= Number(passingMarks)
          ? "Pass"
          : "Fail",
    };

    const updatedStudents = [
      ...students,
      newStudent,
    ];

    saveStudents(updatedStudents);

    setActiveSection("students");
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    saveStudents(updatedStudents);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setActiveSection("edit");
  };

  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) => {
      if (student.id !== updatedStudent.id) {
        return student;
      }

      const marks = Number(updatedStudent.marks);

      return {
        ...student,
        course: updatedStudent.course,
        semester:
          updatedStudent.semester ||
          student.semester ||
          defaultSemester,
        marks,
        status:
          marks >= Number(passingMarks)
            ? "Pass"
            : "Fail",
      };
    });

    saveStudents(updatedStudents);

    setEditingStudent(null);
    setActiveSection("students");
  };

  return (
    <div
      className={`app ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="main-area">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="content">
          {activeSection === "dashboard" && (
            <Dashboard
              students={students}
              defaultSemester={defaultSemester}
              passingMarks={passingMarks}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "students" && (
            <Students
              students={students}
              passingMarks={passingMarks}
              defaultSemester={defaultSemester}
              onDeleteStudent={handleDeleteStudent}
              onEditStudent={handleEditStudent}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "add" && (
            <AddStudent
              onAddStudent={handleAddStudent}
              setActiveSection={setActiveSection}
              students={students}
              defaultSemester={defaultSemester}
            />
          )}

          {activeSection === "edit" && (
            <EditStudent
              student={editingStudent}
              students={students}
              passingMarks={passingMarks}
              defaultSemester={defaultSemester}
              onUpdateStudent={handleUpdateStudent}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "results" && (
            <Results
              students={students}
              passingMarks={passingMarks}
            />
          )}

          {activeSection === "settings" && (
            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setStudents={setStudents}
              passingMarks={passingMarks}
              setPassingMarks={setPassingMarks}
              defaultSemester={defaultSemester}
              setDefaultSemester={setDefaultSemester}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;