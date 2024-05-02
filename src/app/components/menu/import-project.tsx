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
import { menuButton } from "@/components/ui/dropdown-menu";
import { Input, InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProject } from "@/store/useProject";
import { ProjectValidator } from "@/validators/project.validator";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ImportProject = forwardRef((_, _ref) => {
	const [open, setOpen] = useState(false);

	const addProject = useProject((state) => state.addProject);
	const projects = useProject((state) => state.projects);
	const setActiveProject = useProject((state) => state.setActiveProject);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		const file = data.file[0];
		const reader = new FileReader();

		reader.onload = () => {
			const project = JSON.parse(reader.result as string);
			const safeParse = ProjectValidator.safeParse(project);
			if (!safeParse.success) {
				toast.error(
					"El archivo no es válido, no mantiene la estructura de un proyecto",
				);
				return;
			}

			const projectExists = projects.find((p) => p._id === safeParse.data._id);
			if (projectExists) {
				toast.error("El proyecto ya existe");
				return;
			}

			const hasSameName = projects.find((p) => p.name === safeParse.data.name);
			if (hasSameName) {
				safeParse.data.name = `${safeParse.data.name} (1)`;
			}

			addProject(safeParse.data);
			setActiveProject(safeParse.data);
			toast.success("Proyecto importado");
			setOpen(false);
		};
		reader.readAsText(file);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={menuButton}>Importar proyecto</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Importar proyecto</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<InputContainer>
						<Label>
							Archivo <small>(.json)</small>
						</Label>
						<Input
							type="file"
							{...register("file")}
							accept="application/json"
						/>
					</InputContainer>
					<DialogFooter>
						<Button type="submit">Importar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
});

export default ImportProject;
