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

/*
  New students ALWAYS start from 1st Semester.
  Settings semester is not used for new student creation.
*/
const NEW_STUDENT_SEMESTER = "1st Semester";

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

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    /*
      IMPORTANT:
      Existing students keep their saved semester.
      We DO NOT replace their semester with settings.
    */
    const migratedStudents = parsed.map((student) => {
      const marks = Number(student.marks) || 0;

      return {
        ...student,

        id:
          student.id ||
          Date.now().toString() + Math.random().toString(36),

        registrationNo:
          student.registrationNo || "",

        name:
          student.name || "",

        course:
          student.course || "",

        branch:
          student.branch || "",

        /*
          Only students that genuinely have no semester
          get 1st Semester.
        */
        semester:
          student.semester || NEW_STUDENT_SEMESTER,

        marks,

        status:
          marks >= Number(
            student.passingMarks || DEFAULT_SETTINGS.passingMarks
          )
            ? "Pass"
            : "Fail",
      };
    });

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

  const [students, setStudents] = useState(
    getSavedStudents
  );

  const [passingMarks, setPassingMarks] = useState(
    Number(savedSettings.passingMarks) || 40
  );

  const [defaultSemester, setDefaultSemester] = useState(
    savedSettings.semester || "1st Semester"
  );

  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("darkMode") === "true"
    );
  });

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [editingStudent, setEditingStudent] =
    useState(null);

  const saveStudents = (updatedStudents) => {
    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };

  /*
    ADD NEW STUDENT
  */
  const handleAddStudent = (studentData) => {
    const marks = Number(studentData.marks);

    const newStudent = {
      id: Date.now().toString(),

      registrationNo:
        studentData.registrationNo.trim(),

      name:
        studentData.name.trim(),

      course:
        studentData.course,

      branch:
        studentData.branch || "",

      /*
        IMPORTANT:
        New students ALWAYS start from 1st Semester.
      */
      semester: NEW_STUDENT_SEMESTER,

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

  /*
    DELETE STUDENT
  */
  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    saveStudents(updatedStudents);
  };

  /*
    OPEN EDIT PAGE
  */
  const handleEditStudent = (student) => {
    setEditingStudent(student);

    setActiveSection("edit");
  };

  /*
    UPDATE STUDENT
  */
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map(
      (student) => {
        if (student.id !== updatedStudent.id) {
          return student;
        }

        const marks = Number(
          updatedStudent.marks
        );

        return {
          ...student,

          /*
            Identity fields stay protected.
          */
          registrationNo:
            student.registrationNo,

          name:
            student.name,

          course:
            updatedStudent.course,

          branch:
            updatedStudent.branch !== undefined
              ? updatedStudent.branch
              : student.branch || "",

          /*
            Semester can ONLY be changed
            from Edit Student.
          */
          semester:
            updatedStudent.semester ||
            student.semester ||
            NEW_STUDENT_SEMESTER,

          marks,

          status:
            marks >= Number(passingMarks)
              ? "Pass"
              : "Fail",
        };
      }
    );

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
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "students" && (
            <Students
              students={students}
              passingMarks={passingMarks}
              onDeleteStudent={
                handleDeleteStudent
              }
              onEditStudent={
                handleEditStudent
              }
              setActiveSection={
                setActiveSection
              }
            />
          )}

          {activeSection === "add" && (
            <AddStudent
              onAddStudent={
                handleAddStudent
              }
              setActiveSection={
                setActiveSection
              }
              students={students}
              defaultSemester={
                NEW_STUDENT_SEMESTER
              }
            />
          )}

          {activeSection === "edit" && (
            <EditStudent
              student={editingStudent}
              passingMarks={passingMarks}
              defaultSemester={
                NEW_STUDENT_SEMESTER
              }
              onUpdateStudent={
                handleUpdateStudent
              }
              setActiveSection={
                setActiveSection
              }
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
              setPassingMarks={
                setPassingMarks
              }
              defaultSemester={
                defaultSemester
              }
              setDefaultSemester={
                setDefaultSemester
              }
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;