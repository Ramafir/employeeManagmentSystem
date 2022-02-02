import {Status} from "../enum/status";
import {Employee} from "./employee";

export interface Project {
  id: number;
  name: string;
  status: Status;
  description: string;
  employees: Employee[];
}
