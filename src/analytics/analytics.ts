import type { Lesson, Course, CourseType } from "../types/types";
import { schedule } from "../models/lessons";
import { courses } from "../models/courses";

export function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5; // 5 днів * 5 слотів
  const usedSlots = schedule.filter((l) => l.classroomNumber === classroomNumber).length;
  return (usedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
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
