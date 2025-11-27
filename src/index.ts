// ENUMS

enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum GradeValue {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}


// INTERFACES

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade: GradeValue;
  date: Date;
  semester: Semester;
}


class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private registrations: { studentId: number; courseId: number }[] = [];
  private grades: Grade[] = [];
  private studentCounter = 1;


  // Додавання нового студента
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { id: this.studentCounter++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }


  // Реєстрація на курс
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);
    if (!student) throw new Error("Студент не знайдений");
    if (!course) throw new Error("Курс не знайдений");

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
  setGrade(studentId: number, courseId: number, grade: GradeValue): void {
    const registration = this.registrations.find((r) => r.studentId === studentId && r.courseId === courseId);
    if (!registration) throw new Error("Студент не зареєстрований на курс");

    const course = this.courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Курс не знайдений");

    this.grades.push({
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester,
    });
  }


  // Зміна статусу студента
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error("Студент не знайдений");

    // Не можна змінити статус на Academic_Leave для Graduated/Expelled
    if ((student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) &&
        newStatus === StudentStatus.Academic_Leave) {
      throw new Error("Неможливо перевести студента на Academic_Leave");
    }

    student.status = newStatus;
  }

  // Повертає студентів по факультету
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }


  // Повертає оцінки студента
  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }


  // Доступні курси по факультету та семестру
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
  }


  // Середня оцінка студента
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;
    const sum = studentGrades.reduce((acc, g) => acc + g.grade, 0);
    return sum / studentGrades.length;
  }


  // Список відмінників по факультету
  getTopStudents(faculty: Faculty): Student[] {
    const students = this.getStudentsByFaculty(faculty);
    return students.filter((s) => this.calculateAverageGrade(s.id) >= GradeValue.Excellent);
  }


  // Додаємо курс
  addCourse(course: Omit<Course, "id">): Course {
    const newCourse: Course = { id: this.courses.length + 1, ...course };
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
