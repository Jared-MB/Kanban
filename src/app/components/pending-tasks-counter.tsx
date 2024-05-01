"use client";

import { useProject } from "@/store/useProject";

export default function PendingTasksCounter() {
	const tasks = useProject((state) => state.activeProject?.tasks.pending) ?? [];

	return <span className="text-lg">{tasks.length}</span>;
}
