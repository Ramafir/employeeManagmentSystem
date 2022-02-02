import {Project} from "./project";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  projects: Project[];
}
