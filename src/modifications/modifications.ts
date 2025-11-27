import { schedule } from "../models/lessons";

export function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
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

export function cancelLesson(lessonId: number): void {
  const index = schedule.findIndex((l) => l.id === lessonId);
  if (index !== -1) schedule.splice(index, 1);
}
