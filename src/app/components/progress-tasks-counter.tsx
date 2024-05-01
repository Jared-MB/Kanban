"use client";

import { useProject } from "@/store/useProject";

export default function ProgressTasksCounter() {
	const tasks =
		useProject((state) => state.activeProject?.tasks.progress) ?? [];

	return <span className="text-lg">{tasks.length}</span>;
}
