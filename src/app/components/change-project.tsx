"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useProject } from "@/store/useProject";
import type { Project } from "@/types/project";
import { useState } from "react";

export default function ChangeProject() {
	const projects = useProject((state) => state.projects);

	const setActiveProject = useProject((state) => state.setActiveProject);

	const [open, setOpen] = useState(false);

	const handleChangeProject = (project: Project) => {
		setActiveProject(project);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
				Ver proyectos
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Mis proyectos</DialogTitle>
					<DialogDescription>
						Selecciona un proyecto para cambiar
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4">
					{projects.map((project) => (
						<div key={project._id} className="flex flex-col gap-y-2">
							<div className="flex items-center justify-between">
								<h3 className="font-medium">{project.name}</h3>
								<button
									type="button"
									onClick={() => handleChangeProject(project)}
									className="text-sm text-purple-500"
								>
									Cambiar
								</button>
							</div>
							<div className="text-xs flex flex-row gap-x-4">
								<span>Pendientes: {project.tasks.pending.length}</span>
								<span>En progreso: {project.tasks.progress.length}</span>
								<span>Completadas: {project.tasks.completed.length}</span>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
