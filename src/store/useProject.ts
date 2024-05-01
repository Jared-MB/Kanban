import type { Project } from "@/types/project";
import { Task } from "@/types/task";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useProject = create(
	persist(
		combine(
			{
				projects: [] as Project[],
				activeProject: null as Project | null,
			},
			(set) => ({
				setActiveProject: (project: Project) => set({ activeProject: project }),
				addProject: (project: Project) => set((state) => ({ ...state, projects: [...state.projects, project] })),
				addTask: (task: Task, status: "pending" | "progress" | "completed") => {
					set((state) => {
						const project = state.projects.find(
							(project) => project._id === state.activeProject?._id,
						);
						if (!project) return state;
						project.tasks[status].push(task);
						const activeProject = { ...state.activeProject, tasks: project.tasks } as Project;
						return { activeProject, projects: state.projects };
					});
				},
				removeTask: (taskId: string, status: 'pending' | 'progress' | 'completed') => {
					set((state) => {
						const project = state.projects.find(
							(project) => project._id === state.activeProject?._id,
						);
						if (!project) return state;
						project.tasks[status] = project.tasks[status].filter((task) => task._id !== taskId);
						const activeProject = { ...state.activeProject, tasks: project.tasks } as Project;
						return { activeProject, projects: state.projects };
					});
				}, 
				updateTask: (task: Task, status: "pending" | "progress" | "completed") => {
					set((state) => {
						const project = state.projects.find(
							(project) => project._id === state.activeProject?._id,
						);
						if (!project) return state;
						project.tasks[status] = project.tasks[status].map((t) => (t._id === task._id ? task : t));
						const activeProject = { ...state.activeProject, tasks: project.tasks } as Project;
						return { activeProject, projects: state.projects };
					});
				},
				updateTaskStatus: (taskId: string, subtaskId: string, status: boolean, statusType: "progress" | "completed") => {
					set((state) => {
						const project = state.projects.find(
							(project) => project._id === state.activeProject?._id,
						);
						if (!project) return state;
						project.tasks[statusType] = project.tasks[statusType].map((task) => {
							if (task._id === taskId) {
								task.subtasks = task.subtasks.map((subtask) => {
									if (subtask._id === subtaskId) {
										subtask.completed = status;
									}
									return subtask;
								});
							}
							return task;
						});
						const activeProject = { ...state.activeProject, tasks: project.tasks } as Project;
						return { activeProject, projects: state.projects };
					});
				}
			}),
		),
		{
			name: "projects",
		},
	),
);

export const useTask = () => {
	const { addTask, removeTask, updateTask, updateTaskStatus } = useProject(state => ({
		addTask: state.addTask,
		removeTask: state.removeTask,
		updateTask: state.updateTask,
		updateTaskStatus: state.updateTaskStatus,
	}))

	return {
		addTask,
		removeTask,
		updateTask,
		updateTaskStatus,
	}
}