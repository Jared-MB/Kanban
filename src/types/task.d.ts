export interface Task {
	_id: string;
	title: string;
	subtasks: Subtasks[];
}

export interface Subtasks {
	_id: string;
	name: string;
	completed: boolean;
}
