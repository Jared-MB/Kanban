"use client";

import { useProgressTasks } from "@/store/useTasks";

export default function ProgressTasksCounter() {
	const tasks = useProgressTasks((state) => state.tasks);

	return <span className="text-lg">{tasks.length}</span>;
}
