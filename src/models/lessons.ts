import type { Lesson, ScheduleConflict } from "../types/types";
import { classrooms } from "./classrooms";
import { courses } from "./courses";

export const schedule: Lesson[] = [];

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const classroomConflict = schedule.find(
    (l) =>
      l.classroomNumber === lesson.classroomNumber &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (classroomConflict) return { type: "ClassroomConflict", lessonDetails: classroomConflict };

  const professorConflict = schedule.find(
    (l) =>
      l.professorId === lesson.professorId &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (professorConflict) return { type: "ProfessorConflict", lessonDetails: professorConflict };

  return null;
}

export function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (!conflict) {
    schedule.push(lesson);
    return true;
  }
  console.warn("Conflict detected:", conflict);
  return false;
}

export function findAvailableClassrooms(dayOfWeek: string, timeSlot: string): string[] {
  const occupied = schedule
    .filter((l) => l.dayOfWeek === dayOfWeek && l.timeSlot === timeSlot)
    .map((l) => l.classroomNumber);
  return classrooms.map((c) => c.number).filter((n) => !occupied.includes(n));
}

export function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((l) => l.professorId === professorId);
}
