import type { Task } from "./task";

export interface Project {
	_id: string;
	name: string;
	tasks: {
		pending: Task[];
		progress: Task[];
		completed: Task[];
	};
}
