import { addProfessor, professors } from "./models/professors";
import { classrooms } from "./models/classrooms";
import { courses } from "./models/courses";
import { addLesson, getProfessorSchedule, findAvailableClassrooms } from "./models/lessons";
import { getClassroomUtilization, getMostPopularCourseType } from "./analytics/analytics";
import { reassignClassroom, cancelLesson } from "./modifications/modifications";


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

addLesson({
  id: 1,
  courseId: 1,
  professorId: 1,
  classroomNumber: "101",
  dayOfWeek: "Monday",
  timeSlot: "8:30-10:00",
});

console.log(getProfessorSchedule(1));
console.log(findAvailableClassrooms("Monday", "8:30-10:00"));
console.log(getClassroomUtilization("101"));
console.log(getMostPopularCourseType());
