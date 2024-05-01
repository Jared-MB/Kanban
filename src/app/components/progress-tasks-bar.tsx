"use client";

import {
	Progress,
	ProgressBar,
	ProgressLabel,
	ProgressSection,
	ProgressValue,
} from "@/components/ui/progress";
import { useProgressTasks } from "@/store/useTasks";

export default function ProgressTasksBar() {
	const tasks = useProgressTasks((state) => state.tasks);

	const totalTasks = tasks.reduce((acc, task) => {
		return acc + task.subtasks.length;
	}, 0);

	let completedTasks = 0;
	for (const task of tasks) {
		for (const subtask of task.subtasks) {
			if (subtask.completed) {
				completedTasks++;
			}
		}
	}

	const percentage = (completedTasks / totalTasks) * 100;

	return (
		<Progress>
			<ProgressSection>
				<ProgressLabel>Progreso</ProgressLabel>
				<ProgressValue
					value={Number.isNaN(percentage) ? 0 : Math.round(percentage)}
				/>
			</ProgressSection>
			<ProgressBar
				value={Number.isNaN(percentage) ? 0 : Math.round(percentage)}
			/>
		</Progress>
	);
}
