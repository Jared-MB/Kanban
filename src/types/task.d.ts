export interface Task {
	_id: string;
	title: string;
	description?: string;
	subtasks: Subtasks[];
}

export interface Subtasks {
	_id: string;
	name: string;
	description?: string;
	completed: boolean;
}
