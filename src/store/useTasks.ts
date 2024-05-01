import type { Task } from "@/types/task";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const usePendingTasks = create(
	persist(
		combine(
			{
				tasks: [] as Task[],
			},
			(set) => ({
				addTask: (task: Task) =>
					set((state) => ({ tasks: [...state.tasks, task] })),
				removeTask: (id: string) =>
					set((state) => ({
						tasks: state.tasks.filter((task) => task._id !== id),
					})),
				updateTask: (id: string, task: Task) => {
					set((state) => ({
						tasks: state.tasks.map((t) => (t._id === id ? task : t)),
					}));
				},
			}),
		),
		{
			name: "pending-tasks",
		},
	),
);

export const useCompletedTasks = create(
	persist(
		combine(
			{
				tasks: [] as Task[],
			},
			(set) => ({
				addTask: (task: Task) =>
					set((state) => ({ tasks: [...state.tasks, task] })),
				removeTask: (id: string) =>
					set((state) => ({
						tasks: state.tasks.filter((task) => task._id !== id),
					})),
				updateTaskStatus: (id: string, status: boolean) =>
					set((state) => ({
						tasks: state.tasks.map((task) =>
							task._id === id ? { ...task, completed: status } : task,
						),
					})),
			}),
		),
		{
			name: "completed-tasks",
		},
	),
);

export const useProgressTasks = create(
	persist(
		combine(
			{
				tasks: [] as Task[],
			},
			(set) => ({
				addTask: (task: Task) =>
					set((state) => ({ tasks: [...state.tasks, task] })),
				removeTask: (id: string) =>
					set((state) => ({
						tasks: state.tasks.filter((task) => task._id !== id),
					})),
				updateTaskStatus: (
					taskId: string,
					subTaskId: string,
					status: boolean,
				) =>
					set((state) => ({
						tasks: state.tasks.map((task) =>
							task._id === taskId
								? {
										...task,
										subtasks: task.subtasks.map((subtask) =>
											subtask._id === subTaskId
												? { ...subtask, completed: status }
												: subtask,
										),
									}
								: task,
						),
					})),
			}),
		),
		{
			name: "progress-tasks",
		},
	),
);
