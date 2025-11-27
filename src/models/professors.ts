import type { Professor } from "../types/types";

export const professors: Professor[] = [];

export function addProfessor(professor: Professor): void {
  professors.push(professor);
}
