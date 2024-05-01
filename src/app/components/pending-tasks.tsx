"use client";

import { Button } from "@/components/ui/button";
import { CardBody } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Task, TaskContent, TaskHeader, TaskTitle } from "@/components/ui/task";
import { useProject, useTask } from "@/store/useProject";
import type { Task as TaskType } from "@/types/task";
import { MoreVertical, Play } from "lucide-react";
import { useState } from "react";
import EditTask from "./edit-task";
import RemoveTask from "./remove-task";

export default function PendingTasks() {
	const pendingTasks = useProject(
		(state) => state.activeProject?.tasks.pending,
	);
	const { addTask, removeTask } = useTask();

	const [taskId, setTaskId] = useState("");
	const [openEditTask, setOpenEditTask] = useState(false);
	const [openRemoveTask, setOpenRemoveTask] = useState(false);

	const handleEdit = (id: string) => {
		setTaskId(id);
		setOpenEditTask(true);
	};

	const handleRemove = (id: string) => {
		setTaskId(id);
		setOpenRemoveTask(true);
	};

	const handleAdd = (task: TaskType) => {
		addTask(task, "progress");
		removeTask(task._id, "pending");
	};

	return (
		<CardBody className="h-[calc(100%-5rem)]">
			{pendingTasks?.map((task) => (
				<Task key={task._id}>
					<TaskHeader className="justify-between">
						<div className="flex items-center gap-x-4">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" className="w-8 h-8" variant="outline">
										<MoreVertical className="w-4 h-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Opciones</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => handleEdit(task._id)}>
										Editar
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleRemove(task._id)}>
										Eliminar
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<TaskTitle>{task.title}</TaskTitle>
						</div>
						<Button
							size="icon"
							className="w-8 h-8"
							variant="outline"
							onClick={() => handleAdd(task)}
							title='Mover a "En progreso"'
						>
							<Play className="w-4 h-4" />
						</Button>
					</TaskHeader>
					<TaskContent>
						<p className="text-zinc-500 text-sm">{task.description ?? ""}</p>
						<ul className="list-disc ml-7">
							{task.subtasks.map((goal) => (
								<li key={goal._id} className="mb-1">
									<Label>{goal.name}</Label>
									<p className="text-zinc-500 text-xs">
										{goal.description ?? ""}
									</p>
								</li>
							))}
						</ul>
					</TaskContent>
				</Task>
			))}
			<EditTask
				id={taskId}
				open={openEditTask}
				onOpenChange={setOpenEditTask}
			/>
			<RemoveTask
				id={taskId}
				from="pending"
				removeTask={removeTask}
				open={openRemoveTask}
				onOpenChange={setOpenRemoveTask}
			/>
		</CardBody>
	);
}
