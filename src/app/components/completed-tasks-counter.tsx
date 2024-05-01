"use client";
import { useProject } from "@/store/useProject";

export default function CompletedTasksCounter() {
	const tasks = useProject((state) => state.activeProject?.tasks.completed) ?? [];

	return <span className="text-lg">{tasks.length}</span>;
}
