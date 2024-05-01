"use client";

import { useProject } from "@/store/useProject";
import AddProject from "./add-project";

export default function ProjectName() {
	const activeProject = useProject((state) => state.activeProject);

	if (!activeProject?.name) {
		return <AddProject />;
	}
	return <h2 className="text-2xl text-purple-500">{activeProject.name}</h2>;
}
