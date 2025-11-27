// Базові типи

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type TimeSlot =
  | "8:30-10:00"
  | "10:15-11:45"
  | "12:15-13:45"
  | "14:00-15:30"
  | "15:45-17:15";

type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";


// Основні структури

type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  id: number;
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};


// Для валідації конфліктів

type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};


// Масиви даних

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];


// Функції для додавання

function addProfessor(professor: Professor): void {
  professors.push(professor);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
  // Перевірка конфлікту аудиторії
  const classroomConflict = schedule.find(
    (l) =>
      l.classroomNumber === lesson.classroomNumber &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (classroomConflict) {
    return { type: "ClassroomConflict", lessonDetails: classroomConflict };
  }

  // Перевірка конфлікту професора
  const professorConflict = schedule.find(
    (l) =>
      l.professorId === lesson.professorId &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (professorConflict) {
    return { type: "ProfessorConflict", lessonDetails: professorConflict };
  }

  return null;
}

function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (!conflict) {
    schedule.push(lesson);
    return true;
  }
  console.warn("Conflict detected:", conflict);
  return false;
}


// Функції пошуку

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  const occupied = schedule
    .filter((l) => l.timeSlot === timeSlot && l.dayOfWeek === dayOfWeek)
    .map((l) => l.classroomNumber);
  return classrooms.map((c) => c.number).filter((n) => !occupied.includes(n));
}

function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((l) => l.professorId === professorId);
}


//  Функції аналізу

function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5; // 5 днів * 5 часових слотів
  const usedSlots = schedule.filter((l) => l.classroomNumber === classroomNumber).length;
  return (usedSlots / totalSlots) * 100;
}

function getMostPopularCourseType(): CourseType {
  const typeCount: Record<CourseType, number> = {
    Lecture: 0,
    Seminar: 0,
    Lab: 0,
    Practice: 0,
  };
  schedule.forEach((l) => {
    const course = courses.find((c) => c.id === l.courseId);
    if (course) typeCount[course.type]++;
  });
  let maxType: CourseType = "Lecture";
  for (const t in typeCount) {
    if (typeCount[t as CourseType] > typeCount[maxType]) maxType = t as CourseType;
  }
  return maxType;
}


// Модифікація даних

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
  const lesson = schedule.find((l) => l.id === lessonId);
  if (!lesson) return false;

  const conflict = schedule.find(
    (l) =>
      l.classroomNumber === newClassroomNumber &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (conflict) return false;

  lesson.classroomNumber = newClassroomNumber;
  return true;
}

function cancelLesson(lessonId: number): void {
  const index = schedule.findIndex((l) => l.id === lessonId);
  if (index !== -1) schedule.splice(index, 1);
}


// Приклад використання

// Додавання даних
addProfessor({ id: 1, name: "Dr. Smith", department: "CS" });
addProfessor({ id: 2, name: "Dr. Brown", department: "Math" });

classrooms.push(
  { number: "101", capacity: 30, hasProjector: true },
  { number: "102", capacity: 25, hasProjector: false }
);

courses.push(
  { id: 1, name: "Algorithms", type: "Lecture" },
  { id: 2, name: "Calculus", type: "Seminar" }
);

// Додавання занять
addLesson({
  id: 1,
  courseId: 1,
  professorId: 1,
  classroomNumber: "101",
  dayOfWeek: "Monday",
  timeSlot: "8:30-10:00",
});

addLesson({
  id: 2,
  courseId: 2,
  professorId: 2,
  classroomNumber: "102",
  dayOfWeek: "Monday",
  timeSlot: "8:30-10:00",
});

// Вивід розкладу професора
console.log(getProfessorSchedule(1));
console.log(findAvailableClassrooms("8:30-10:00", "Monday"));
console.log(getClassroomUtilization("101"));
console.log(getMostPopularCourseType());
