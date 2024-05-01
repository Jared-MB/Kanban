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
import { useCompletedTasks } from "@/store/useTasks";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import RemoveTask from "./remove-task";

export default function CompletedTasks() {
	const tasks = useCompletedTasks((state) => state.tasks);
	const removeTask = useCompletedTasks((state) => state.removeTask);

	const [taskId, setTaskId] = useState("");
	const [openRemoveTask, setOpenRemoveTask] = useState(false);

	const handleRemove = (id: string) => {
		setTaskId(id);
		setOpenRemoveTask(true);
	};

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
								{/* <DropdownMenuItem onClick={() => handleEdit(task._id)}>
										Editar
									</DropdownMenuItem> */}
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
								// onCheckedChange={(checked) =>
								// 	updateTaskStatus(task._id, subtask._id, checked)
								// }
							>
								{subtask.name}
							</CheckboxLabel>
						))}
					</TaskContent>
				</Task>
			))}
			<RemoveTask
				removeTask={removeTask}
				id={taskId}
				open={openRemoveTask}
				onOpenChange={setOpenRemoveTask}
			/>
		</CardBody>
	);
}
