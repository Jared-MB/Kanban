"use client";

import { menuButton } from "@/components/ui/dropdown-menu";
import { useProject } from "@/store/useProject";
import { forwardRef } from "react";

const ExportProject = forwardRef((_, _ref) => {
	const activeProject = useProject((state) => state.activeProject);

	const handleClick = () => {
		if (!activeProject) return;
		const data = JSON.stringify(activeProject, null, 2);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${activeProject.name}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<button type="button" className={menuButton} onClick={handleClick}>
			Exportar proyecto
		</button>
	);
});

export default ExportProject;
