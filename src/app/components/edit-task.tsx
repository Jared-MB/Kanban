"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { Input, InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { useProject, useTask } from "@/store/useProject";
import type { Task } from "@/types/task";
import TaskValidator, {
	type Task as TaskTypeValidator,
} from "@/validators/task.validator";
import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";

export default function EditTask({
	id,
	open,
	onOpenChange,
}: { id: string; open: boolean; onOpenChange: (open: boolean) => void }) {
	const task = useProject((state) =>
		state.activeProject?.tasks.pending.find((task) => task._id === id),
	);
	const { updateTask } = useTask();

	const { register, handleSubmit, control, setValue } =
		useForm<TaskTypeValidator>({
			resolver: zodResolver(TaskValidator),
		});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "subtasks",
	});

	const addSubtask = () => {
		append({ name: "", completed: false });
	};

	const onSubmit = (data: TaskTypeValidator) => {
		const subtasks = data.subtasks.map((subtask) => ({
			...subtask,
			_id: self.crypto.randomUUID(),
		}));

		const task = {
			...data,
			_id: id,
			subtasks,
		};

		updateTask(task as Task, "pending");
		onOpenChange(false);
	};

	useEffect(() => {
		if (task) {
			setValue("title", task.title);
			setValue("description", task.description || "");
			setValue("subtasks", task.subtasks);
		}
	}, [task]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90dvh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-medium">
						Editar tarea
					</DialogTitle>
				</DialogHeader>
				<Divider />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<InputContainer>
						<Label>Nombre de la tarea</Label>
						<Input
							{...register("title")}
							type="text"
							placeholder="Nombre de la tarea"
						/>
					</InputContainer>
					<InputContainer>
						<Label>Descripción de la tarea</Label>
						<Textarea
							{...register("description")}
							placeholder="Descripción de la tarea"
						/>
					</InputContainer>
					<Divider />
					<div className="flex flex-col gap-y-4">
						<div className="flex items-center justify-between">
							<Label className="text-lg">
								Sub Tareas <small>({fields.length})</small>
							</Label>
							<Button type="button" size="icon" onClick={addSubtask}>
								<Plus className="w-4 h-4" />
							</Button>
						</div>
						<div className="flex flex-col gap-y-3">
							{fields.map((field, index) => (
								<div
									key={field.id}
									className="flex flex-col gap-y-3 justify-between items-end"
								>
									<div className="flex flex-row gap-x-4 items-end w-full">
										<InputContainer>
											<Label>SubTarea {index + 1}</Label>
											<Input
												type="text"
												{...register(`subtasks.${index}.name`)}
												placeholder="Nombre de la sub tarea"
											/>
										</InputContainer>
										<Button
											size="icon"
											type="button"
											onClick={() => remove(index)}
										>
											<Trash className="w-4 h-4" />
										</Button>
									</div>
									<InputContainer>
										<Label>Descripción de la sub tarea</Label>
										<Textarea
											{...register(`subtasks.${index}.description`)}
											placeholder="Descripción de la sub tarea"
										/>
									</InputContainer>
								</div>
							))}
						</div>
						<Divider />
						<Button>Guardar tarea</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
