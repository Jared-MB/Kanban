"use client";

import { usePendingTasks } from "@/store/useTasks";

export default function PendingTasksCounter() {
	const tasks = usePendingTasks((state) => state.tasks);

	return <span className="text-lg">{tasks.length}</span>;
}
