import { homeWork } from "../routes/assignmentsRoute";
import assignments from "./assignments";
// function completedAssignment(assignment: assignments[]) {
//   assignment.forEach((item) => {
//     if (item.completed === true) {
//     }
//   });
// }

export function findAssignmentByName(name: string): assignments | undefined {
  return homeWork.find((assignment) => assignment.name === name);
}
export function deleteAssignment(name: string): boolean {
  const index = homeWork.findIndex((item) => item.name === name);
  if (index == -1) {
    return false;
  } else {
    homeWork.splice(index, 1);
    return true;
  }
}
