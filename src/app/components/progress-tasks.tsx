"use client";

import { CardBody } from "@/components/ui/card";
import { CheckboxLabel } from "@/components/ui/checkbox";
import { Task, TaskContent, TaskHeader, TaskTitle } from "@/components/ui/task";
import { useCompletedTasks, useProgressTasks } from "@/store/useTasks";
import { useEffect } from "react";

export default function ProgressTasks() {
	const addTask = useCompletedTasks((state) => state.addTask);

	const tasks = useProgressTasks((state) => state.tasks);
	const updateTaskStatus = useProgressTasks((state) => state.updateTaskStatus);
	const removeTask = useProgressTasks((state) => state.removeTask);

	useEffect(() => {
		for (const task of tasks) {
			const completed = task.subtasks.every((subtask) => subtask.completed);
			if (completed) {
				addTask(task);
				removeTask(task._id);
			}
		}
	}, [tasks]);

	return (
		<CardBody>
			{tasks.map((task) => (
				<Task key={task._id}>
					<TaskHeader>
						<TaskTitle>{task.title}</TaskTitle>
					</TaskHeader>
					<TaskContent>
						{task.subtasks.map((subtask) => (
							<CheckboxLabel
								key={subtask._id}
								defaultChecked={subtask.completed}
								onCheckedChange={(checked) =>
									updateTaskStatus(task._id, subtask._id, checked)
								}
							>
								{subtask.name}
							</CheckboxLabel>
						))}
					</TaskContent>
				</Task>
			))}
		</CardBody>
	);
}
