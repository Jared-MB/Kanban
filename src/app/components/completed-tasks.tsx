"use client";

import { Button } from "@/components/ui/button";
import { CardBody } from "@/components/ui/card";
import { CheckboxLabel } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, TaskContent, TaskHeader, TaskTitle } from "@/components/ui/task";
import { useProject, useTask } from "@/store/useProject";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import RemoveTask from "./remove-task";

export default function CompletedTasks() {

	const tasks = useProject((state) => state.activeProject?.tasks.completed) ?? [];
	const { addTask, removeTask, updateTaskStatus } = useTask();

	const [taskId, setTaskId] = useState("");
	const [openRemoveTask, setOpenRemoveTask] = useState(false);

	const handleRemove = (id: string) => {
		setTaskId(id);
		setOpenRemoveTask(true);
	};

	useEffect(() => {
		for (const task of tasks) {
			const completed = task.subtasks.every((subtask) => subtask.completed);
			if (!completed) {
				addTask(task, 'progress');
				removeTask(task._id, 'completed');
			}
		}
	}, [tasks]);

	return (
		<CardBody>
			{tasks.map((task) => (
				<Task key={task._id}>
					<TaskHeader className="justify-between">
						<TaskTitle>{task.title}</TaskTitle>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" className="w-8 h-8" variant="outline">
									<MoreVertical className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Opciones</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => handleRemove(task._id)}>
									Eliminar
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TaskHeader>
					<TaskContent>
						{task.subtasks.map((subtask) => (
							<CheckboxLabel
								key={subtask._id}
								defaultChecked={subtask.completed}
								onCheckedChange={(checked) =>
									updateTaskStatus(task._id, subtask._id, checked, 'completed')
								}
							>
								{subtask.name}
							</CheckboxLabel>
						))}
					</TaskContent>
				</Task>
			))}
			<RemoveTask
				from="completed"
				removeTask={removeTask}
				id={taskId}
				open={openRemoveTask}
				onOpenChange={setOpenRemoveTask}
			/>
		</CardBody>
	);
}
