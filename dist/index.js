"use strict";
// ENUMS
Object.defineProperty(exports, "__esModule", { value: true });
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
class UniversityManagementSystem {
    students = [];
    courses = [];
    registrations = [];
    grades = [];
    studentCounter = 1;
    // Додавання нового студента
    enrollStudent(student) {
        const newStudent = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }
    // Реєстрація на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);
        if (!student)
            throw new Error("Студент не знайдений");
        if (!course)
            throw new Error("Курс не знайдений");
        // Перевірка факультету
        if (student.faculty !== course.faculty) {
            throw new Error("Студент не належить до факультету курсу");
        }
        // Перевірка кількості студентів
        const enrolledCount = this.registrations.filter((r) => r.courseId === courseId).length;
        if (enrolledCount >= course.maxStudents) {
            throw new Error("Курс заповнений");
        }
        // Перевірка, чи вже зареєстрований
        if (this.registrations.find((r) => r.studentId === studentId && r.courseId === courseId)) {
            throw new Error("Студент вже зареєстрований на курс");
        }
        this.registrations.push({ studentId, courseId });
    }
    // Виставлення оцінки
    setGrade(studentId, courseId, grade) {
        const registration = this.registrations.find((r) => r.studentId === studentId && r.courseId === courseId);
        if (!registration)
            throw new Error("Студент не зареєстрований на курс");
        const course = this.courses.find((c) => c.id === courseId);
        if (!course)
            throw new Error("Курс не знайдений");
        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester,
        });
    }
    // Зміна статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find((s) => s.id === studentId);
        if (!student)
            throw new Error("Студент не знайдений");
        // Не можна змінити статус на Academic_Leave для Graduated/Expelled
        if ((student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) &&
            newStatus === StudentStatus.Academic_Leave) {
            throw new Error("Неможливо перевести студента на Academic_Leave");
        }
        student.status = newStatus;
    }
    // Повертає студентів по факультету
    getStudentsByFaculty(faculty) {
        return this.students.filter((s) => s.faculty === faculty);
    }
    // Повертає оцінки студента
    getStudentGrades(studentId) {
        return this.grades.filter((g) => g.studentId === studentId);
    }
    // Доступні курси по факультету та семестру
    getAvailableCourses(faculty, semester) {
        return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
    }
    // Середня оцінка студента
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0)
            return 0;
        const sum = studentGrades.reduce((acc, g) => acc + g.grade, 0);
        return sum / studentGrades.length;
    }
    // Список відмінників по факультету
    getTopStudents(faculty) {
        const students = this.getStudentsByFaculty(faculty);
        return students.filter((s) => this.calculateAverageGrade(s.id) >= GradeValue.Excellent);
    }
    // Додаємо курс
    addCourse(course) {
        const newCourse = { id: this.courses.length + 1, ...course };
        this.courses.push(newCourse);
        return newCourse;
    }
}
// Тестування
const ums = new UniversityManagementSystem();
// Створюємо курс
ums.addCourse({
    name: "Програмування на TypeScript",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30,
});
// Додаємо студента
const student = ums.enrollStudent({
    fullName: "Іван Іваненко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2025-09-01"),
    groupNumber: "CS-101",
});
// Реєструємо на курс
ums.registerForCourse(student.id, 1);
// Виставляємо оцінку
ums.setGrade(student.id, 1, GradeValue.Excellent);
// Отримуємо оцінки
console.log("Оцінки студента:", ums.getStudentGrades(student.id));
// Середня оцінка
console.log("Середня оцінка:", ums.calculateAverageGrade(student.id));
// Список відмінників по факультету
console.log("Відмінники:", ums.getTopStudents(Faculty.Computer_Science));
//# sourceMappingURL=index.js.map