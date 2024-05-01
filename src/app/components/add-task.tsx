"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { Input, InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskValidator, {
	type Task as TaskTypeValidator,
} from "@/validators/task.validator";
import { Plus, Trash } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { usePendingTasks } from "@/store/useTasks";
import type { Subtasks, Task } from "@/types/task";
import { useEffect, useState } from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTask() {
	const [open, setOpen] = useState(false);

	const addTask = usePendingTasks((state) => state.addTask);

	const {
		register,
		handleSubmit,
		control,
		resetField,
		formState: { errors },
	} = useForm<TaskTypeValidator>({
		resolver: zodResolver(TaskValidator),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "subtasks",
	});

	const addSubtask = () => {
		append({ name: "", completed: false });
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			resetField("title");
			resetField("subtasks");
		}
		setOpen(open);
	};

	const onSubmit: SubmitHandler<TaskTypeValidator> = (
		data: TaskTypeValidator,
	) => {
		const subtasks = data.subtasks.map((subtask) => ({
			...subtask,
			_id: self.crypto.randomUUID(),
		}));

		const task: Task = {
			title: data.title,
			subtasks: subtasks as Subtasks[],
			_id: self.crypto.randomUUID(),
		};

		addTask(task);
		setOpen(false);
	};

	useEffect(() => {
		if (errors) {
			const messages = Object.values(errors).map((error) => error.message);
			if (messages.length) {
				toast.error(messages.join(", "));
			}
		}
	}, [errors]);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline">
					<Plus className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90dvh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-medium">
						Agregar tarea
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
									className="flex flex-row gap-x-2 justify-between items-end"
								>
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
							))}
						</div>
						<Divider />
						<Button>Agregar tarea</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
