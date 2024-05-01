"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProject } from "@/store/useProject";
import type { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProject({
	showTrigger = false,
}: {
	showTrigger?: boolean;
}) {
	const [open, setOpen] = useState(false);

	const activeProject = useProject((state) => state.activeProject);
	const setActiveProject = useProject((state) => state.setActiveProject);

	const addProject = useProject((state) => state.addProject);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		const _id = self.crypto.randomUUID();
		const project: Project = {
			_id,
			name: data?.name ?? "Proyecto 1",
			tasks: {
				completed: [],
				pending: [],
				progress: [],
			},
		};
		addProject(project);
		setActiveProject(project);
		setOpen(false);
	};

	useEffect(() => {
		if (!activeProject?.name) {
			setOpen(true);
		}
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{showTrigger && (
				<DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
					Nuevo proyecto
				</DialogTrigger>
			)}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear Proyecto</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<InputContainer>
						<Label>Nombre del Proyecto</Label>
						<Input placeholder="Kristall" {...register("name")} />
					</InputContainer>
					<DialogFooter>
						<Button type="submit">Crear</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
