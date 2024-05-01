"use client";

import { Button } from "@/components/ui/button";
import { CardBody } from "@/components/ui/card";
import { CheckboxLabel } from "@/components/ui/checkbox";
import { Task, TaskContent, TaskHeader, TaskTitle } from "@/components/ui/task";
import { useProject, useTask } from "@/store/useProject";
import type { Task as TaskType } from "@/types/task";
import { Pause } from "lucide-react";
import { useEffect } from "react";

export default function ProgressTasks() {
	const { addTask: regressTask } = useTask();
	const { addTask } = useTask();

	const tasks =
		useProject((state) => state.activeProject?.tasks.progress) ?? [];
	const { updateTaskStatus, removeTask } = useTask();

	const handleRegress = (task: TaskType) => {
		const uncompletedSubtasks = task.subtasks.map((subtask) => ({
			...subtask,
			completed: false,
		}));

		const updatedTask = { ...task, subtasks: uncompletedSubtasks };
		regressTask(updatedTask, "pending");
		removeTask(task._id, "progress");
	};

	useEffect(() => {
		for (const task of tasks) {
			const completed = task.subtasks.every((subtask) => subtask.completed);
			if (completed) {
				addTask(task, "completed");
				removeTask(task._id, "progress");
			}
		}
	}, [tasks]);

	return (
		<CardBody>
			{tasks.map((task) => (
				<Task key={task._id}>
					<TaskHeader className="justify-between">
						<TaskTitle>{task.title}</TaskTitle>
						<Button
							size="icon"
							className="w-8 h-8"
							variant="outline"
							onClick={() => handleRegress(task)}
							title='Mover a "Pendientes"'
						>
							<Pause className="w-4 h-4" />
						</Button>
					</TaskHeader>
					<TaskContent>
						<p className="text-zinc-500 text-sm">{task.description ?? ""}</p>

						{task.subtasks.map((subtask) => (
							<div key={subtask._id} className="flex flex-col mb-1 gap-y-1">
								<CheckboxLabel
									defaultChecked={subtask.completed}
									onCheckedChange={(checked) =>
										updateTaskStatus(task._id, subtask._id, checked, "progress")
									}
								>
									{subtask.name}
								</CheckboxLabel>
								<p className="text-zinc-500 text-xs ml-6">
									{subtask.description ?? ""}
								</p>
							</div>
						))}
					</TaskContent>
				</Task>
			))}
		</CardBody>
	);
}
